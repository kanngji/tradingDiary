'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // optional, for click/drag
import Navbar from '../components/Navbar';
import {useState} from 'react';
import {Dialog} from '@headlessui/react';
import { useAuthStore } from '@/stores/useAuthStore';


type CalendarEvent = {
  title: string;
  date: string;
  color: string;
};

export default function Calendar() {
  
  // 상태값
  const [startMoney, setStartMoney] = useState(0); // 초기값 100만원
  const [currentMoney, setCurrentMoney] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [inputMoney, setInputMoney] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const email = useAuthStore((state) => state.email);

  // 계좌관리 버튼
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // 날짜 클릭핸들러
  const handleDateClick = (arg: any) => {

    if (!email) {
      alert('로그인이 필요한 기능입니다');
      return 
    }

    // 미래날짜 클릭하면 alert창 
    const clickedDate = new Date(arg.dateStr);
    const today = new Date();

    today.setHours(0,0,0,0);
    clickedDate.setHours(0,0,0,0);

    if (clickedDate > today) {
      alert('미래 날짜는 선택할 수 없습니다. \nDo not select future.');
      return; // 모달 열지 않음
    }



    setSelectedDate(arg.dateStr); // yyyy-mm-dd 형식날짜
    setIsModalOpen(true);
  }

  // 이익버튼
  const handleProfit = () => {
    // 현재금액 증가
    setCurrentMoney(prev => prev + inputMoney);

    // 이벤트 추가
    if (selectedDate) {
      setEvents(prev => [
        ...prev,
        {
          title: `+$${inputMoney.toLocaleString()}`,
          date: selectedDate,
          color: 'green',
        },
      ]);
    }

    // 초기화
    setIsModalOpen(false);
    setInputMoney(0);
  };

  // 손실 버튼
  const handleLoss = () =>{
    setCurrentMoney(prev => prev - inputMoney);

    if (selectedDate) {
      setEvents(prev => [
        ...prev,
        {
          title: `-$${inputMoney.toLocaleString()}`,
          date: selectedDate,
          color: 'red',
        },
      ]);
    }
    setIsModalOpen(false);
    setInputMoney(0);
  }
  // 시작금액 세팅
  const handleSaveStartMoney = () => {
    if (!email || startMoney <= 0) {
      alert("이메일이 없거나 시작 금액이 0입니다.");
      return;
    }
  
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/monthly-setup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        start_amount: startMoney,
      }),
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

  // P&L계산
  const pnl = currentMoney - startMoney;
  const pnlColor = pnl >= 0 ? 'text-green-600' : 'text-red-600';



  return (
    <>
      <Navbar />
      <div className="flex gap-8 max-w-7xl mx-auto mt-20 p-4">
        {/* Calendar */}
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
            dateClick={handleDateClick}  // 🔥 날짜 클릭 이벤트 연결
            dayCellContent={(arg) => {
              const day = arg.date.getDay();  // 0 = 일요일, 6 = 토요일
              let className = '';
              if (day === 0) className = 'text-red-600 font-bold';
              if (day === 6) className = 'text-blue-600 font-bold';
          
              return (
                <div className={className}>
                  {arg.dayNumberText}
                </div>
              );
            }}
          />
        </div>

        {/* MyAccount */}
        <div className="w-80 bg-white shadow-md rounded-xl p-6 text-black">
          <h2 className="text-lg font-semibold mb-4">My Account</h2>
          
          {email && <h6 className="mr-4 text-gray-600">{email}님</h6>}

          <div className="mt-3 mb-3">
            <label className="block text-sm font-medium mb-1">시작 금액</label>
            <input
              type="number"
              value={startMoney}
              onChange={(e) => setStartMoney(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
            />
            <button
              onClick={handleSaveStartMoney}
              className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md text-sm"
            >시작금액 저장
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
              value={(pnl >= 0 ? '+' : '') + '$'+pnl.toLocaleString() +' ('+((currentMoney - startMoney) / startMoney) * 100+'%)'}
              readOnly
              className={`w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 ${pnlColor}`}
            />
          </div>
        </div>
      </div>

      {/* 🔥 Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">

          <Dialog.Panel className="bg-white p-6 rounded-xl shadow max-w-sm w-full relative">
          
            <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-5 right-5 text-gray-500 hover:text-black text-xl">
            X
            </button>
            <Dialog.Title className="text-lg font-bold mb-4">
              {selectedDate} 금액 입력
            </Dialog.Title>
            

            <input
              type="number"
              value={inputMoney}
              onChange={(e) => setInputMoney(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              placeholder="금액 입력"
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