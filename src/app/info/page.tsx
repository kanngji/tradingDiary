import React from 'react';
import Navbar from '../components/Navbar';
import LongShortRatio from '../components/LongShortRatio';
import Telegram from '../components/Telegram';
import IndicatorResults from '../components/IndicatorResults';
import ExchangeExecution from '../components/ExchangeExecution';


const dummyPosts = [
    { channel: 'Crypto Korea', text: '비트코인 상승 예측 🚀', views: 1200 },
    { channel: 'Crypto Banter', text: 'ETH 5% 급등 소식!', views: 850 },
    { channel: 'Whale Alert', text: '고래 1000 BTC 이동!', views: 2200 },
  ];

export default function Info() {
    return (
        <>
        <Navbar/>
        <main className="w-full h-screen p-8 bg-gray-50">
            <div className="grid grid-cols-2 gap-6 h-full mt-20">
                <div className="bg-white border border-gray-400 rounded-lg p-4 text-center text-black">
                    
                    <ExchangeExecution/>

                    
                </div>
                <div className="bg-white border border-gray-400 rounded-lg p-4 text-center text-black">
                    
                    <Telegram posts={dummyPosts}/>
                </div>
                <div className="bg-white border border-gray-400 rounded-lg p-4 text-center text-black">
                    
                    <LongShortRatio/>
                </div>
                <div className="bg-white border border-gray-400 rounded-lg p-4 text-center text-black">
                    
                    <IndicatorResults/>
                </div>
            </div>
        </main>
        
        </>
    )
        
    
};

