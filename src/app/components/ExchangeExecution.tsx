'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dummyData = [
    { exchange: 'Bithumb', buy: 7000, sell: 5000 },
    { exchange: 'Binance', buy: 10000, sell: 8000 },
    { exchange: 'Bybit', buy: 6000, sell: 3500 },
    { exchange: 'Upbit', buy: 9000, sell: 4500 },
  ];
  

  export default function ExchangeExecution() {
    return (
      <div className="w-full h-96 max-w-3xl mx-auto bg-white rounded shadow">
        <h2 className="text-3xl font-bold text-center mb-8">거래소별 매수 / 매도 체결량</h2>
        
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={dummyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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