import React from 'react';
import Navbar from '../components/Navbar';

export default function Info() {
    return (
        <>
        <Navbar/>
        <main className="w-full h-screen p-8 bg-gray-50">
            <div className="grid grid-cols-2 gap-6 h-full mt-20">
                <div className="bg-white border border-gray-400 rounded-lg p-4 text-center">
                    박스 1
                </div>
                <div className="bg-white border border-gray-400 rounded-lg p-4 text-center">
                    박스 2
                </div>
                <div className="bg-white border border-gray-400 rounded-lg p-4 text-center">
                    박스 3
                </div>
                <div className="bg-white border border-gray-400 rounded-lg p-4 text-center">
                    박스 4
                </div>
            </div>
        </main>
        
        </>
    )
        
    
};

