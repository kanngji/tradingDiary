'use client'; // Next.js 13 이상이면 추가! (상태 관리하려면 필요)

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpenAnnounce, setIsopenAnnounce] = useState(false);

  // 화면 크기 변경 감지
  useEffect(() => {
    // 초기 설정
    checkScreenSize();
    
    // 리사이즈 이벤트 리스너
    function handleResize() {
      checkScreenSize();
    }
    
    window.addEventListener('resize', handleResize);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 화면 크기 체크 함수
  const checkScreenSize = () => {
    // 여기서 숫자를 조정하여 햄버거 메뉴로 전환되는 시점을 설정할 수 있습니다
    // UI가 깨지기 시작하는 지점(예: 768px)을 설정하세요
    setIsMobile(window.innerWidth < 1024);
  };

  // Dialog


  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 로고 */}
        <div className="text-2xl font-bold text-black mr-10">
          <Link href="/" className="relative group">
            <div className="px-2 py-1 text-black">
              Coing with
            </div>
          </Link>
        </div>
        
        {/* PC 메뉴 - isMobile 상태에 따라 표시/숨김 */}
        {!isMobile && (
          <div className="flex space-x-10 ml-20">
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
        )}

        {/* 공지사항 회원가입 로그인 - isMobile 상태에 따라 표시/숨김 */}
        {!isMobile && (
          <div className="flex space-x-4">
            <button onClick={()=> setIsopenAnnounce(true)}className="px-3 py-1 rounded-md border border-gray-300 text-sm hover:bg-gray-100 text-black">
              공지사항
            </button>
            <Dialog open={isOpenAnnounce} onClose={() => setIsopenAnnounce(false)} className="relative z-50">
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center">
              <Dialog.Panel className="bg-white p-6 rounded shadow" style={{ width: '800px' }}>
              <Dialog.Title className="text-lg font-bold text-black">공지사항</Dialog.Title>
              <p className="mt-2 text-black">여기에 공지사항 내용을 넣으세요.</p>
              <div className="flex justify-center">
                <button
                onClick={() => setIsopenAnnounce(false)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded mt-10 mr-5">
                닫기
                </button>
                <button
                
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded mt-10">
                작성
                </button>
                
              </div>
              </Dialog.Panel>
              </div>
            </Dialog>
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
        )}

        {/* 햄버거 버튼 - isMobile 상태에 따라 표시/숨김 */}
        {isMobile && (
          <button
            className="focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-1 bg-black mb-1"></div>
            <div className="w-6 h-1 bg-black mb-1"></div>
            <div className="w-6 h-1 bg-black"></div>
          </button>
        )}
      </div>

      {/* 모바일 메뉴 - isMobile 상태와 isOpen 상태에 따라 표시/숨김 */}
      {isMobile && isOpen && (
        <div className="bg-white shadow-md">
          <Link href="/">
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Home
            </div>
          </Link>
          <Link href="/info">
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Info
            </div>
          </Link>
          <Link href="/calendar">
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Calendar
            </div>
          </Link>
          <Link href="/contact">
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Contact
            </div>
          </Link>
          <Link href="/signup">
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              회원가입
            </div>
          </Link>
          <Link href="/login">
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              로그인
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}