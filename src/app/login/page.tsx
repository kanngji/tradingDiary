'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  // setEmail 대신 login 함수 사용
  const login = useAuthStore((state) => state.login);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 이미 로그인되어 있으면 홈으로 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const result = await res.json();
        // 로그인 성공 시 login 함수 사용 (localStorage에 저장됨)
        login(result.user_email || email);
        alert('로그인 성공!');
        setEmail('');
        setPassword('');
        router.push('/');
      } else {
        const result = await res.json();
        setError(result.detail || '로그인 실패');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      setError('서버 연결 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4 text-black">
          <h2 className="text-2xl font-bold text-center">로그인</h2>

          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded p-2"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded p-2"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
          >
            로그인
          </button>
          <Link href="/signup"
            className="w-full bg-white-600 text-gray-600 rounded p-2 border border-gray-300 text-center block hover:bg-gray-300">
            회원가입
          </Link>
        </form>
      </div>
    </>
  );
}