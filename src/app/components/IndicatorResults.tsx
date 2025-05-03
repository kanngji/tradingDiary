'use client';

import React from 'react';

export default function IndicatorResults() {

  const indicators = [
    { title: "GDP", value: "3.2%" },
    { title: "실업률", value: "4.0%" },
    { title: "CPI", value: "2.5%" },
    { title: "소비자심리지수", value: "57" },
    { title: "기준금리", value: "4.33%" },
    { title: "비농업 신규고용", value: "159,000" },
    { title: "미시간 소비자심리", value: "62" }
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">📈 참고 지표</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {indicators.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-2xl text-blue-600 font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}