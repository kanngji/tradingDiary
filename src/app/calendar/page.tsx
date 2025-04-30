'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // optional, for click/drag
import Navbar from '../components/Navbar';
import {useState} from 'react';

export default function Calendar() {
  
  // 계좌관리 버튼
  
  const events = [
    {
      title: '+₩12,000 (BTC)',
      date: '2025-04-30',
      color: 'green',
    },
    {
      title: '-₩5,000 (ETH)',
      date: '2025-05-01',
      color: 'red',
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="flex gap-8 max-w-7xl mx-auto mt-20 p-4">
  {/* FullCalendar */}
    <div className="flex-1">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        height="auto"
        headerToolbar={{
          left: '',   // 가운데에 타이틀 + < >
          center: 'title prev next',                // 비워두기
          right: 'today'             // today는 오른쪽으로!
        }}
      />
    </div>

    {/* MyAccount 패널 */}
    
    <div className="w-80 bg-white shadow-md rounded-xl p-6">
      
      <h2 className="text-lg font-semibold mb-4">My Account</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">시작 금액</label>
        <input
          type="number"
          placeholder="₩"
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">현재 금액</label>
        <input
          type="number"
          placeholder="₩"
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">P&L</label>
        <input
          type="text"
          placeholder="+₩ or -₩"
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>
    </div>
  </div>
    </>
  );
}
