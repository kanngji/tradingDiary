'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js 13 이상에서는 next/navigation에서 import
import Navbar from '../components/Navbar';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!email || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
    
      if (res.ok) {
        alert('회원가입 성공!');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        router.push('/login'); // URL 직접 입력 대신 라우터 경로로 추천
      } else {
        setError(data.detail || '회원가입 실패');
      }
    } catch (err) {
      console.error('회원가입 중 오류 발생:', err);
      setError('서버 연결에 실패했습니다. 서버가 실행 중인지 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>  
      <Navbar/> 
      
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4 text-black">
          <h2 className="text-2xl font-bold text-center">회원 가입</h2>

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

          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border rounded p-2"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? '처리 중...' : '가입하기'}
          </button>
        </form>
      </div>
    </>
  );
}