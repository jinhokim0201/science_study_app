import React from 'react';

const VideoPlayer = ({ videoId, title }) => {
    return (
        <div className="bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-900/10">
            <div className="aspect-video w-full relative">
                {videoId === 'mock_id' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-500 flex-col gap-4">
                        <div className="w-16 h-16 rounded-full border-2 border-slate-700 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-slate-700 border-b-[10px] border-b-transparent ml-1" />
                        </div>
                        <p>영상 준비 중입니다 ({title})</p>
                    </div>
                ) : (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}
            </div>
            <div className="p-4 bg-slate-900 text-white">
                <h2 className="text-lg font-bold">{title}</h2>
            </div>
        </div>
    );
};

export default VideoPlayer;
