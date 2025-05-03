import React from 'react';
import Navbar from '../components/Navbar';
import LongShortRatio from '../components/LongShortRatio';

export default function Info() {
    return (
        <>
        <Navbar/>
        <main className="w-full h-screen p-8 bg-gray-50">
            <div className="grid grid-cols-2 gap-6 h-full mt-20">
                <div className="bg-white border border-gray-400 rounded-lg p-4 text-center text-black">
                    거래소 별 체결량
                    
                </div>
                <div className="bg-white border border-gray-400 rounded-lg p-4 text-center text-black">
                    텔레그램 Post
                </div>
                <div className="bg-white border border-gray-400 rounded-lg p-4 text-center text-black">
                    롱 & 숏 비율
                    <LongShortRatio/>
                </div>
                <div className="bg-white border border-gray-400 rounded-lg p-4 text-center text-black">
                    참고 지표
                </div>
            </div>
        </main>
        
        </>
    )
        
    
};

