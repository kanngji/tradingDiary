'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

type Post = {
    channel: string;
    text: string;
    views: number;
  };
  
  export default function Telegram() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            //const res = await fetch('http://localhost:8000/api/telegram/popular-posts');
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/telegram/popular-posts`);
            const data = await res.json();

            // 채널별 posts를 펼쳐서 Post[] 형태로 변환
            const flatPosts: Post[] = data.flatMap((channelData: any) =>
                channelData.posts.map((post: any) => ({
                    channel: channelData.channel,
                    text: post.text,
                    views: post.views
                }))
            );

            setPosts(flatPosts);
        };

        fetchPosts();
    }, []);

    return (
        <div className="w-full h-96 max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">📄 텔레그램 포스트</h2>
            <Swiper
                direction="vertical"
                autoplay={{ delay: 10000 }}
                loop={true}
                modules={[Autoplay]}
                className="h-full"
            >
                {posts.map((post, index) => (
                    <SwiperSlide key={index}>
                        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow-lg flex flex-col h-80 justify-between">
                            <div>
                                
                                <h3 className="text-lg font-extrabold text-black-800 mb-2 flex items-center gap-2">
                                    
                                🪙    [{post.channel}]
                                </h3>
                                <p className="mt-2 text-gray-800 line-clamp-3">
                                    {post.text}
                                </p>
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-1 mt-4">
                                👁️ views: {post.views.toLocaleString()}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}