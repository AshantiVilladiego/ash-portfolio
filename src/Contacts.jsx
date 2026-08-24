import { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      if (response.status === 200) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <section className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="border p-2 rounded"
          required 
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="border p-2 rounded"
          required 
        />
        <textarea 
          placeholder="Your Message" 
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="border p-2 rounded h-32"
          required 
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>
      {status && <p className="mt-4 text-center text-sm font-medium">{status}</p>}
    </section>
  );
}