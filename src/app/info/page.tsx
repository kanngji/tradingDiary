import React from 'react';
import Navbar from '../components/Navbar';
import LongShortRatio from '../components/LongShortRatio';
import Telegram from '../components/Telegram';
import IndicatorResults from '../components/IndicatorResults';
import ExchangeExecution from '../components/ExchangeExecution';



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
                    
                    <Telegram/>
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

