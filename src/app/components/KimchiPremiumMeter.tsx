'use client';

type Props = {
  value: number; // 김치프리미엄 %
};

export default function KimchiPremiumMeter({ value }: Props) {
  

  const getStatus = () => {
    if (value > 1.5) return '국내 암호화폐 가격이 해외보다 높게 형성 🥵';
    if (value > 0) return '😬';
    if (value > -1.5) return '국내 암호화폐 가격이 해외보다 낮게 형성 😐';
    return '김치 디스카운트 🧊';
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6 text-center mt-4">
      <div className="relative group inline-block">
        <h2 className="text-xl font-bold mb-2 text-black">
          김치프리미엄
        </h2>

        {/* 툴팁 박스 */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
        김치 프리미엄(Kimchi premium)은 대한민국에서 거래되는 암호화폐의 시세가 해외 거래소 시세와 비교해 얼마나 높은가를 뜻하는 단어이다. <br/>줄여서 &apos;김프&apos;라고도 한다.  <br/>해외 거래소보다 높을 경우 &apos;김치 프리미엄이 끼어 있다.&apos; 비슷한 정도로 낮아질 경우 &apos;김치 프리미엄이 빠졌다.&apos;라고 표현한다.
        </div>
      </div>

      

      {/* 수치 및 상태 */}
      <p className={`text-3xl font-bold ${value > 0 ? 'text-red-500' : 'text-blue-500'}`}>
        {value > 0 ? '+' : ''}{value.toFixed(2)}%
      </p>
      <p className="text-sm mt-1 text-gray-600">{getStatus()}</p>
      
    </div>
  );
}