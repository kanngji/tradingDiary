'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


  

export default function ExchangeExecution() {
  const [chartData, setChartData] = useState([
    {exchange: 'Binance',buy:0, sell:0},
    {exchange: 'Bybit',buy:0, sell:0},
    {exchange: 'Upbit',buy:0, sell:0},
    {exchange: 'Bithumb',buy:0, sell:0},
  
  ]);

  // useEffect
  useEffect(() => {
    const socket = new WebSocket(`ws://${process.env.NEXT_PUBLIC_BACKEND_WS}/ws/client`);  // 🔥 실제 도메인으로 바꾸기!

    socket.onopen = () => {
        console.log("웹소켓 연결됨");
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("받은 데이터:", data);

        const { exchange, trade } = data;

        setChartData((prevData) => {
            return prevData.map((item) => {
                if (item.exchange.toLowerCase() === exchange.toLowerCase()) {
                    if (trade.side === "BUY") {
                        return { ...item, buy: item.buy + trade.qty };
                    } else if (trade.side === "SELL") {
                        return { ...item, sell: item.sell + trade.qty };
                    }
                }
                return item;
            });
        });
    };

    socket.onclose = () => {
        console.log("웹소켓 연결 종료");
    };

    return () => {
        socket.close();
    };
}, []);
  // ✅ 5초마다 값 초기화
  useEffect(() => {
    const interval = setInterval(() => {
        setChartData([
            { exchange: 'Bithumb', buy: 0, sell: 0 },
            { exchange: 'Binance', buy: 0, sell: 0 },
            { exchange: 'Bybit', buy: 0, sell: 0 },
            { exchange: 'Upbit', buy: 0, sell: 0 },
        ]);
    }, 5000);

    return () => clearInterval(interval);
}, []);
    return (
      <div className="w-full h-96 max-w-3xl mx-auto bg-white rounded shadow">
        <h2 className="text-3xl font-bold text-center mb-8">거래소별 매수 / 매도 체결량</h2>
        
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="exchange" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="buy" fill="#22c55e" name="매수" />
            <Bar dataKey="sell" fill="#ef4444" name="매도" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
}