'use client';

import React, {useState, useEffect}from 'react';

export default function IndicatorResults() {

  const [indicators, setIndicators] = useState<{ title: string; value: string | number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/economicIndicators/latest`);
        const data = await res.json();

        // API에서 받은 데이터를 화면에 쓸 형식으로 변환
        const formattedData = [
          { title: "GDP", value: Number(data.gdp.value).toLocaleString() },  // % 제거
          { title: "실업률", value: data.unemployment_rate.value + "%" },
          { title: "CPI", value: Number(data.cpi.value).toLocaleString() }, // % 제거
          { title: "소비자심리지수", value: data.consumer_sentiment.value },
          { title: "기준금리", value: data.federal_funds_rate.value + "%" },
          { title: "비농업 신규고용", value: Number(data.nonfarm_payrolls.value).toLocaleString() }
        ];

        setIndicators(formattedData);
      } catch (error) {
        console.error("지표 데이터를 가져오는 중 에러 발생:", error);
      }
    };

    fetchData();
  }, []);

  if (!indicators) {
    return <div className="text-center text-gray-500">지표 데이터를 불러오는 중...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">📈 참고 지표</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {indicators.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-2xl text-black-300 bg-blue-100  font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}