'use client'; // Next.js 13 이상이면 추가! (상태 관리하려면 필요)

import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-start">
        {/* 로고 */}
        <div className="text-2xl font-bold text-black mr-20">
          Coing with
        </div>

        {/* PC 메뉴 */}
        <div className="hidden md:flex space-x-10 ml-20">
          <a href="#home" className="text-gray-700 hover:text-black ">Home</a>
          <a href="#about" className="text-gray-700 hover:text-black ">Info</a>
          <a href="#services" className="text-gray-700 hover:text-black ">Calendar</a>
          <a href="#contact" className="text-gray-700 hover:text-black ">Contact</a>
        </div>

        {/* 햄버거 버튼 */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-1 bg-black mb-1"></div>
          <div className="w-6 h-1 bg-black mb-1"></div>
          <div className="w-6 h-1 bg-black"></div>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <a href="#home" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</a>
          <a href="#about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Info</a>
          <a href="#services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Calendar</a>
          <a href="#contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</a>
        </div>
      )}
    </nav>
  );
}