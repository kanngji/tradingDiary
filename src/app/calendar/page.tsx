'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useAuthStore } from '@/stores/useAuthStore';

type CalendarEvent = {
  title: string;
  date: string;
  color: string;
};

export default function Calendar() {
  const [startMoney, setStartMoney] = useState(0);
  const [currentMoney, setCurrentMoney] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [inputMoney, setInputMoney] = useState<string>(''); // 문자열로 수정
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const email = useAuthStore((state) => state.email);

  // 합산 처리 함수 추가 
  

  useEffect(() => {
    if (!email) return;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calendar/${email}/monthlySetup`)
      .then(res => res.json())
      .then(data => {
        if (typeof data.start_amount === 'number') {
          setStartMoney(data.start_amount);
          setCurrentMoney(data.start_amount);
        }
      })
      .catch(err => {
        console.error('시작 금액 불러오기 실패:', err);
      });

    // 손익 기록 가져오기
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calendar/${email}/records?year=${year}&month=${month}`)
    .then(res => res.json())
    .then(date => {
      setEvents(date);
    })
    .catch(err => {
      console.error("손익 기록 불러오기 실패:", err);
    })

    // 서버에서 계산된 현재금액 + 시작금액 + 손익 합계 
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calendar/${email}/currentMoney`)
    .then(res => res.json())
    .then(data => {
      setStartMoney(data.start_amount);
      setCurrentMoney(data.current_amount);
    })
    .catch(err => {
      console.error("현재 금액 상태 불러오기 실패:", err);
    });
  }, [email]);

  const handleDateClick = (arg: any) => {
    if (!email) {
      alert('로그인이 필요한 기능입니다');
      return;
    }

    const clickedDate = new Date(arg.dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    clickedDate.setHours(0, 0, 0, 0);

    if (clickedDate > today) {
      alert('미래 날짜는 선택할 수 없습니다. \nDo not select future.');
      return;
    }

    setSelectedDate(arg.dateStr);
    setInputMoney(''); // 빈값으로 초기화
    setIsModalOpen(true);
  };

  const handleProfit = async () => {
    const money = parseInt(inputMoney || '0', 10);
    setCurrentMoney(prev => prev + money);
  
    if (selectedDate) {
      // 1. 프론트에 바로 반영
      setEvents(prev => [
        ...prev,
        {
          title: `+$${money.toLocaleString()}`,
          date: selectedDate,
          color: 'green',
        },
      ]);
  
      // 2. 🔴 백엔드에 저장 요청
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calendar/record`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            date: selectedDate,
            profit_loss: money,
          }),
        });
      } catch (err) {
        console.error('이익 저장 실패:', err);
        alert('이익 저장에 실패했습니다.');
      }
    }
  
    setIsModalOpen(false);
    setInputMoney('');
  };

  const handleLoss = async () => {
    const money = parseInt(inputMoney || '0', 10);
    setCurrentMoney(prev => prev - money);
  
    if (selectedDate) {
      // 1. 프론트에 바로 반영
      setEvents(prev => [
        ...prev,
        {
          title: `-$${money.toLocaleString()}`,
          date: selectedDate,
          color: 'red',
        },
      ]);
  
      // 2. 🔴 백엔드에 저장 요청
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calendar/record`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            date: selectedDate,
            profit_loss: -money, // 음수로 저장
          }),
        });
      } catch (err) {
        console.error('손실 저장 실패:', err);
        alert('손실 저장에 실패했습니다.');
      }
    }
  
    setIsModalOpen(false);
    setInputMoney('');
  };

  const handleSaveStartMoney = () => {
    if (!email || startMoney <= 0) {
      alert("이메일이 없거나 시작 금액이 0입니다.");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calendar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, start_amount: startMoney }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('저장 실패');
        return res.json();
      })
      .then((data) => {
        alert("시작 금액 저장 완료!");
        console.log("Setup 저장 완료:", data);
      })
      .catch((err) => {
        console.error("저장 오류:", err);
      });
  };

  const pnl = currentMoney - startMoney;
  const pnlColor = pnl >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <>
      <Navbar />
      <div className="flex gap-8 max-w-7xl mx-auto mt-20 p-4">
        <div className="flex-1">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            editable={true}
            selectable={true}
            height="auto"
            headerToolbar={{
              left: '',
              center: 'title prev next',
              right: 'today',
            }}
            dateClick={handleDateClick}
            dayCellContent={(arg) => {
              const day = arg.date.getDay();
              let className = '';
              if (day === 0) className = 'text-red-600 font-bold';
              if (day === 6) className = 'text-blue-600 font-bold';
              return <div className={className}>{arg.dayNumberText}</div>;
            }}
          />
        </div>

        <div className="w-80 bg-white shadow-md rounded-xl p-6 text-black">
          <h2 className="text-lg font-semibold mb-4">My Account</h2>
          {email && <h6 className="mr-4 text-gray-600">{email}님</h6>}

          <div className="mt-3 mb-3">
            <label className="block text-sm font-medium mb-1">시작 금액</label>
            <input
              type="number"
              value={isNaN(startMoney) ? '' : startMoney}
              onChange={(e) => {
                const val = e.target.value;
                setStartMoney(val === '' ? NaN : Number(val));
              }}
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
            />
            <button
              onClick={handleSaveStartMoney}
              className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md text-sm"
            >
              시작금액 저장
            </button>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">현재 금액</label>
            <input
              type="number"
              value={currentMoney}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">P&L</label>
            <input
              type="text"
              value={(pnl >= 0 ? '+' : '') + '$' + pnl.toLocaleString() + ' (' + ((currentMoney - startMoney) / startMoney * 100).toFixed(2) + '%)'}
              readOnly
              className={`w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 ${pnlColor}`}
            />
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded-xl shadow max-w-sm w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-500 hover:text-black text-xl"
            >
              X
            </button>
            <Dialog.Title className="text-lg text-black font-bold mb-4">
              {selectedDate} 금액 입력
            </Dialog.Title>

            <input
              type="number"
              value={inputMoney}
              onChange={(e) => setInputMoney(e.target.value.replace(/^0+/, ''))}
              className="w-full border text-black rounded-md p-2 mb-4"
              placeholder="금액 입력"
              inputMode="numeric"
            />

            <div className="flex gap-4">
              <button
                onClick={handleProfit}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
              >
                이익
              </button>
              <button
                onClick={handleLoss}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
              >
                손실
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
