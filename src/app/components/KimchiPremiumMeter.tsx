'use client';

type Props = {
  value: number; // 김치프리미엄 %
};

export default function KimchiPremiumMeter({ value }: Props) {
  const getColor = () => {
    if (value > 1.5) return 'bg-red-500';
    if (value > 0) return 'bg-orange-400';
    if (value > -1.5) return 'bg-blue-300';
    return 'bg-blue-600';
  };

  const getStatus = () => {
    if (value > 1.5) return '매우 김치프리미엄 🥵';
    if (value > 0) return '김치프리미엄 😬';
    if (value > -1.5) return '거의 무프리미엄 😐';
    return '김치 디스카운트 🧊';
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6 text-center">
      <h2 className="text-xl font-bold mb-2">김치프리미엄</h2>

      {/* 막대 게이지 */}
      <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full ${getColor()}`}
          style={{
            width: `${50 + value}%`,
            transition: 'width 0.3s ease',
          }}
        />
        {/* 가운데 선 */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-black opacity-50" />
      </div>

      {/* 수치 및 상태 */}
      <p className="text-3xl font-bold">{value > 0 ? '+' : ''}{value.toFixed(2)}%</p>
      <p className="text-sm mt-1 text-gray-600">{getStatus()}</p>
    </div>
  );
}