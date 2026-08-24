import React, { useEffect, useMemo, useRef, useState } from 'react';

function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

function useInView(ref, once = true) {
  const [inView, setInView] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && triggered.current)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          setInView(true);

          if (once) {
            triggered.current = true;
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref, once]);

  return inView;
}

// Very small bash-ish tokenizer just for color
function tokenize(text) {
  const tokens = [];
  const words = text.split(/(\s+)/);
  let isFirstWord = true;

  for (const word of words) {
    if (/^\s+$/.test(word)) {
      tokens.push({ type: 'default', value: word });
      continue;
    }

    if (word.startsWith('$')) {
      tokens.push({ type: 'variable', value: word });
      isFirstWord = false;
      continue;
    }

    if (word.startsWith('-')) {
      tokens.push({ type: 'flag', value: word });
      isFirstWord = false;
      continue;
    }

    if (/^["'].*["']$/.test(word)) {
      tokens.push({ type: 'string', value: word });
      isFirstWord = false;
      continue;
    }

    if (
      word.includes('/') ||
      word.startsWith('.') ||
      word.startsWith('~')
    ) {
      tokens.push({ type: 'path', value: word });
      isFirstWord = false;
      continue;
    }

    if (isFirstWord) {
      tokens.push({ type: 'command', value: word });
      isFirstWord = false;
      continue;
    }

    tokens.push({ type: 'default', value: word });
  }

  return tokens;
}

function Highlighted({ text }) {
  return (
    <>
      {tokenize(text).map((t, i) => (
        <span key={i} className={`term-tok term-${t.type}`}>
          {t.value}
        </span>
      ))}
    </>
  );
}


export function Terminal({
  commands = [],
  outputs = {},

  username = 'ashanti',
  hostname = 'portfolio',

  className,

  // Typing settings
  typingSpeed = 26,
  delayBetweenCommands = 700,

  // NEW: wait time before restarting the whole sequence
  loopDelay = 10000,

  initialDelay = 400,

  loop = false,
}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const inView = useInView(containerRef);

  const [lines, setLines] = useState([]);
  const [currentText, setCurrentText] = useState('');

  const [commandIdx, setCommandIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  const [outputIdx, setOutputIdx] = useState(-1);

  const [phase, setPhase] = useState('idle');

  const [cursorVisible, setCursorVisible] = useState(true);

  const currentCommand = commands[commandIdx] || '';

  const currentOutputs = useMemo(
    () => outputs[commandIdx] || [],
    [outputs, commandIdx]
  );

  const isLastCommand =
    commandIdx === commands.length - 1;


  /* -----------------------------------------
     START TERMINAL
     ----------------------------------------- */

  useEffect(() => {
    if (!inView || phase !== 'idle') return;

    const t = setTimeout(() => {
      setPhase('typing');
    }, initialDelay);

    return () => clearTimeout(t);
  }, [inView, phase, initialDelay]);


  /* -----------------------------------------
     TYPING
     ----------------------------------------- */

  useEffect(() => {
    if (phase !== 'typing') return;

    if (charIdx < currentCommand.length) {
      const t = setTimeout(() => {
        setCurrentText(
          currentCommand.slice(0, charIdx + 1)
        );

        setCharIdx((c) => c + 1);
      }, typingSpeed + Math.random() * 35);

      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setPhase('executing');
    }, 120);

    return () => clearTimeout(t);
  }, [
    phase,
    charIdx,
    currentCommand,
    typingSpeed,
  ]);


  /* -----------------------------------------
     EXECUTE COMMAND
     ----------------------------------------- */

  useEffect(() => {
    if (phase !== 'executing') return;

    setLines((prev) => [
      ...prev,
      {
        type: 'command',
        content: currentCommand,
      },
    ]);

    setCurrentText('');

    if (currentOutputs.length > 0) {
      setOutputIdx(0);
      setPhase('outputting');
    } else if (isLastCommand && !loop) {
      setPhase('done');
    } else if (isLastCommand && loop) {
      // Final command completed.
      // Wait before starting again.
      setPhase('waiting');
    } else {
      setPhase('pausing');
    }
  }, [
    phase,
    currentCommand,
    currentOutputs.length,
    isLastCommand,
    loop,
  ]);


  /* -----------------------------------------
     OUTPUT
     ----------------------------------------- */

  useEffect(() => {
    if (phase !== 'outputting') return;

    if (
      outputIdx >= 0 &&
      outputIdx < currentOutputs.length
    ) {
      const t = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          {
            type: 'output',
            content: currentOutputs[outputIdx],
          },
        ]);

        setOutputIdx((i) => i + 1);
      }, 140);

      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      if (isLastCommand && !loop) {
        setPhase('done');
      } else if (isLastCommand && loop) {
        setPhase('waiting');
      } else {
        setPhase('pausing');
      }
    }, 300);

    return () => clearTimeout(t);
  }, [
    phase,
    outputIdx,
    currentOutputs,
    isLastCommand,
    loop,
  ]);


  /* -----------------------------------------
     DELAY BETWEEN COMMANDS
     ----------------------------------------- */

  useEffect(() => {
    if (phase !== 'pausing') return;

    const t = setTimeout(() => {
      setCharIdx(0);
      setOutputIdx(-1);

      setCommandIdx((c) =>
        isLastCommand ? 0 : c + 1
      );

      setPhase('typing');
    }, delayBetweenCommands);

    return () => clearTimeout(t);
  }, [
    phase,
    delayBetweenCommands,
    isLastCommand,
  ]);


  /* -----------------------------------------
     WAIT BEFORE LOOP
     ----------------------------------------- */

  useEffect(() => {
    if (phase !== 'waiting') return;

    const t = setTimeout(() => {
      setLines([]);

      setCurrentText('');
      setCharIdx(0);
      setOutputIdx(-1);
      setCommandIdx(0);

      setPhase('typing');
    }, loopDelay);

    return () => clearTimeout(t);
  }, [phase, loopDelay]);


  /* -----------------------------------------
     CURSOR BLINK
     ----------------------------------------- */

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);

    return () => clearInterval(interval);
  }, []);


  /* -----------------------------------------
     AUTO SCROLL
     ----------------------------------------- */

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop =
        contentRef.current.scrollHeight;
    }
  }, [lines, phase]);


  const prompt = (
    <span className="term-prompt">
      <span className="term-user">{username}</span>
      <span className="term-at">@</span>
      <span className="term-host">{hostname}</span>
      <span className="term-colon">:~$</span>{' '}
    </span>
  );


  return (
    <div
      ref={containerRef}
      className={cn('terminal-wrap', className)}
    >
      <div className="terminal-window">

        <div className="terminal-titlebar">

          <div className="terminal-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>

          <span className="terminal-title">
            {username}@{hostname} — about-me
          </span>

          <span className="terminal-spacer" />

        </div>


        <div
          ref={contentRef}
          className="terminal-body"
        >

          {lines.map((line, i) => (
            <div
              key={i}
              className="terminal-line"
            >
              {line.type === 'command' ? (
                <span>
                  {prompt}
                  <Highlighted text={line.content} />
                </span>
              ) : (
                <span className="term-output">
                  {line.content}
                </span>
              )}
            </div>
          ))}


          {phase === 'typing' && (
            <div className="terminal-line">
              {prompt}

              <Highlighted text={currentText} />

              <span className="term-cursor" />
            </div>
          )}


          {(
            phase === 'done' ||
            phase === 'pausing' ||
            phase === 'outputting' ||
            phase === 'waiting'
          ) && (
            <div className="terminal-line">
              {prompt}

              <span
                className={cn(
                  'term-cursor',
                  !cursorVisible &&
                    'term-cursor-hidden'
                )}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}