'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Binance 롱&숏 비율',
      Long: 63,
      Short: 37,
    },
    {
      name: 'Binance 탑트레이더 롱&숏 비율',
      Long: 55,
      Short: 45,
    },
  ];

export default function LongShortRatio () {
    return (
        <>
            <div className="max-w-5xl mx-auto mt-10 p-4">
            <h2 className="text-3xl font-bold mb-8 text-center">📊 롱숏 비율</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Long" stackId="a" fill="#22c55e"> {/* green */}
                    <LabelList dataKey="Long" position="insideRight" />
                </Bar>
                <Bar dataKey="Short" stackId="a" fill="#ef4444"> {/* red */}
                    <LabelList dataKey="Short" position="insideLeft" />
                </Bar>
                </BarChart>
            </ResponsiveContainer>

            <h2 className="text-xl font-bold mb-2 text-black">
                *해당 데이터는 5분마다 갱신됩니다. 
                <br/>
                <br/>
                *해당 데이터의 출처는 Binance에서 제공하는 API 입니다.
            </h2>
            </div>
        </>
    )
};