'use client'; // Next.js 13 이상이면 추가! (상태 관리하려면 필요)

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between ">
        {/* 로고 */}
        <div className="text-2xl font-bold text-black mr-10">
        <Link href="/" className="relative group">
            <div className="px-2 py-1 text-black">
              Coing with
            </div>
          </Link>
        </div>
        
        {/* PC 메뉴 */}
        <div className="hidden md:flex space-x-10 ml-20">
          {/*<a href="#home" className="text-gray-700 hover:text-black ">Home</a>*/}
          <Link href="/" className="relative group">
            <div className="px-2 py-1 group-hover:bg-sky-100 rounded-md transition text-black">
              Home
            </div>
          </Link>
          <Link href="/info" className="relative group">
            <div className="px-2 py-1 group-hover:bg-sky-100 rounded-md transition text-black">
              Info
            </div>
          </Link>
          <Link href="/calendar" className="relative group">
            <div className="px-2 py-1 group-hover:bg-sky-100 rounded-md transition text-black">
              Calendar
            </div>
          </Link>
          <Link href="/contact" className="relative group">
            <div className="px-2 py-1 group-hover:bg-sky-100 rounded-md transition text-black">
              Contact
            </div>
          </Link>
          
        </div>

        {/* 공지사항 회원가입 로그인  */}
        <div className="hidden md:flex space-x-4">
          
            <button className="px-3 py-1 rounded-md border border-gray-300 text-sm hover:bg-gray-100 text-black">
              공지사항
            </button>
          
          <Link href="/signup">
            <button className="px-3 py-1 rounded-md bg-sky-500 text-white text-sm hover:bg-sky-600">
              회원가입
            </button>
          </Link>
          <Link href="/login">
            <button className="px-3 py-1 rounded-md bg-gray-800 text-white text-sm hover:bg-gray-700">
              로그인
            </button>
          </Link>
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
          <Link href="/">
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              home
            </div>
          </Link>
          <Link href="/info">
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              info
            </div>
          </Link><Link href="/calendar">
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              calendar
            </div>
          </Link><Link href="/contact">
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              contact
            </div>
          </Link><Link href="/signup">
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              회원가입
            </div>
          </Link><Link href="/login">
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              로그인
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}