'use client';

import { useEffect, useState, useRef } from 'react';

export default function ChatBox() {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // WebSocket 연결
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/chat');
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };

    return () => socket.close();
  }, []);

  // 초기 80개 메시지 불러오기
  useEffect(() => {
    fetch('/api/chat?offset=0&limit=80')
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  // 새 메시지 오면 아래로 스크롤
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!nickname.trim() || !message.trim()) return;

    socketRef.current?.send(JSON.stringify({
      nickname,
      content: message,
    }));
    setMessage('');
  };

  return (
    <div className="w-full max-w-md h-[600px] border rounded-lg shadow flex flex-col bg-white">
      {/* 메시지 영역 */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-scroll p-4 space-y-2 bg-gray-50"
      >
        {messages.map((msg, i) => (
          <div key={i} className="flex flex-col">
            <span className="font-semibold text-blue-600 text-sm">{msg.nickname}</span>
            <div className="bg-white border rounded p-2 text-gray-900 shadow-sm max-w-[90%]">
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="border-t p-3 bg-white flex gap-2 items-center">
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border p-2 rounded w-1/3 text-sm"
        />
        <input
          type="text"
          placeholder="메시지 입력"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="border p-2 rounded flex-1 text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white text-sm px-3 py-2 rounded hover:bg-blue-600"
        >
          전송
        </button>
      </div>
    </div>
  );
}