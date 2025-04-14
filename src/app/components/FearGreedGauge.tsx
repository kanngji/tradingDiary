'use client';

import React from 'react';

type Props = {
  value: number;
  label: string;
};

export default function FearGreedGauge({ value, label }: Props) {
  const angle = (value / 100) * 180 - 90; // -90도(좌) ~ +90도(우)

  const getColor = () => {
    if (value < 25) return 'text-red-500';
    if (value < 50) return 'text-orange-500';
    if (value < 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-xl font-bold text-center mb-4">공포 & 탐욕 지수</h2>

    {/* 게이지 영역 */}
    <div className="relative w-full h-40 flex items-end justify-center">
      {/* 반원 배경 */}
      <div className="absolute bottom-0 w-[200px] h-[100px] rounded-t-full overflow-hidden">
        <div className="relative w-full h-full">

          {/* 빨강: 0~24 */}
          <div className="absolute left-0 top-0 w-1/4 h-full bg-red-500 rotate-[0deg] origin-bottom-left" />

          {/* 주황: 25~49 */}
          <div className="absolute left-1/4 top-0 w-1/4 h-full bg-orange-400 rotate-[0deg] origin-bottom-left" />

          {/* 노랑: 50~74 */}
          <div className="absolute left-2/4 top-0 w-1/4 h-full bg-yellow-300 rotate-[0deg] origin-bottom-left" />

          {/* 초록: 75~100 */}
          <div className="absolute left-3/4 top-0 w-1/4 h-full bg-green-400 rotate-[0deg] origin-bottom-left" />
        </div>
      </div>

      {/* 바늘 */}
      <div
        className="absolute bottom-0 w-1 h-24 bg-black origin-bottom"
        style={{ transform: `rotate(${angle}deg)` }}
      />
    </div>

    {/* 수치와 상태 */}
    <div className="text-center mt-6">
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-md mt-2">{label}</p>
    </div>
  </div>
  );
}