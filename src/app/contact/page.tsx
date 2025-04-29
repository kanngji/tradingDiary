'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import emailjs from '@emailjs/browser';





export default function Contact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
          {
            user_name: form.name,
            user_email: form.email,
            message: form.message,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        ).then(() => {
          alert('이메일이 성공적으로 전송되었습니다!');
        }).catch(() => {
          alert('이메일 전송에 실패했습니다.');
        });
    
        setForm({ name: '', email: '', message: '' });
      };


    return (
        <>
        <Navbar/>
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4 mt-20">
            <h2 className="text-xl font-semibold text-center text-black">Contact Us</h2>

            <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-sm text-black"
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-sm text-black"
                required
            />
            <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 h-32 text-sm text-black"
                required
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition text-black"
            >
            Send
            </button>
        </form>
        
        
        </>
    )
        
    
};

