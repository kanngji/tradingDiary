import Image from "next/image";
import FearGreedGauge from './components/FearGreedGauge';
import KimchiPremiumMeter from './components/KimchiPremiumMeter';
import Navbar from './components/Navbar'; // 경로 맞게


async function getKimchiPremium() {
  try {
    const [upbitRes, binanceRes, fxRes] = await Promise.all([
      fetch('https://api.upbit.com/v1/ticker?markets=KRW-BTC'),
      fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
      fetch('https://api.frankfurter.app/latest?from=USD&to=KRW'),
    ]);

    const upbitData = await upbitRes.json();
    const binanceData = await binanceRes.json();
    const fxData = await fxRes.json();

    const krwPrice = upbitData[0]?.trade_price;
    const usdPrice = parseFloat(binanceData?.price);
    const fxRate = fxData?.rates?.KRW;

    console.log({ krwPrice, usdPrice, fxRate });

    if (!krwPrice || !usdPrice || !fxRate) {
      throw new Error('필수 데이터가 부족합니다');
    }

    const premium = ((krwPrice - usdPrice * fxRate) / (usdPrice * fxRate)) * 100;
    return parseFloat(premium.toFixed(2));
  } catch (err) {
    console.error('김치프리미엄 계산 실패:', err);
    return 0; // fallback
  }
}
async function getFearGreedData() {
  const res = await fetch('https://api.alternative.me/fng/', {
    next: { revalidate: 360 }, // 1시간마다 재생성
  });
  const data = await res.json();
  return data.data[0]; // 최신 지수 하나만 가져오기
}

export default async function Home() {
  const fg = await getFearGreedData();
  const value = parseInt(fg.value);
  const classification = fg.value_classification;
  const premium = await getKimchiPremium();

  return (
    <>
    <Navbar />
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-10 mb-4">
      <div className="bg-black p-6 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">암호화폐 공포 & 탐욕 지수</h1>
        <p className="text-4xl font-extrabold text-red-500">{value}</p>
        <p className="text-lg mt-2">{classification}</p>
        <p className="text-sm text-gray-500 mt-4">
          제공처: Alternative.me
        </p>
      </div>
      {/*<FearGreedGauge value={value} label={classification} />*/}
      {/* 범례 표 */}
      <div className="bg-black p-6 rounded-xl shadow w-full max-w-md mt-4">
        <h2 className="text-lg font-semibold mb-4 text-center">수치 범례</h2>
        <table className="table-auto w-full text-sm border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-4 py-2">수치</th>
              <th className="border px-4 py-2">의미</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-center">0 - 24</td>
              <td className="border px-4 py-2 text-center">극단적 공포 😱</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-center">25 - 49</td>
              <td className="border px-4 py-2 text-center">공포 😨</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-center">50 - 74</td>
              <td className="border px-4 py-2 text-center">탐욕 😏</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-center">75 - 100</td>
              <td className="border px-4 py-2 text-center">극단적 탐욕 🚀</td>
            </tr>
          </tbody>
        </table>
      </div>
      <KimchiPremiumMeter value={premium} /> 
    </main>
    </> 
  );
}