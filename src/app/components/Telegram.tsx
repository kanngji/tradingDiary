'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

type Post = {
    channel: string;
    text: string;
    views: number;
  };
  
  interface TelegramVerticalCarouselProps {
    posts: Post[];
  }
export default function Telegram({posts} : TelegramVerticalCarouselProps) {
    return (
        <>
            <div className="w-full h-96 max-w-md mx-auto ">
  <Swiper
    direction="vertical"
    autoplay={{ delay: 10000 }}
    loop={true}
    modules={[Autoplay]}
    className="h-full"
  >
    {posts.map((post, index) => (
      <SwiperSlide key={index}>
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-blue-800 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
              </svg>
              [{post.channel}]
            </h3>
            <p className="mt-2 text-gray-800 line-clamp-3">
              {post.text}
            </p>
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-1 mt-4">
            👁️ 조회수: {post.views.toLocaleString()}
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>
    
        </>

    )
}