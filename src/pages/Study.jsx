import React, { useState } from 'react';
import { CURRICULUM } from '../data/curriculum';
import VideoPlayer from '../components/study/VideoPlayer';
import { ChevronRight, ChevronDown, PlayCircle, Book, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TopicItem = ({ topic, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-all rounded-lg ml-2 ${isActive ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
            }`}
    >
        <PlayCircle size={16} className={isActive ? 'fill-indigo-200' : 'opacity-50'} />
        <span className="truncate">{topic.title}</span>
    </button>
)

const GradeSection = ({ gradeData, onSelectTopic, currentTopicId }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 w-full text-left p-2 font-bold text-slate-800 hover:text-indigo-600 transition-colors"
            >
                {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                {gradeData.grade}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-2 border-l-2 border-slate-100 ml-3"
                    >
                        {gradeData.subjects.map(subject => (
                            <div key={subject.id} className="mb-3 mt-2">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 px-2 flex items-center gap-1">
                                    <Book size={12} /> {subject.title}
                                </div>
                                <div className="space-y-0.5">
                                    {subject.topics.map(topic => (
                                        <TopicItem
                                            key={topic.id}
                                            topic={topic}
                                            isActive={currentTopicId === topic.id}
                                            onClick={() => onSelectTopic(topic)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Simple Markdown Parser for Text Content
const ContentViewer = ({ content }) => {
    if (!content) return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4 min-h-[200px]">
            <FileText size={48} className="opacity-20" />
            <p>선택된 주제에 대한 텍스트 학습 자료가 없습니다.</p>
        </div>
    );

    return (
        <div className="space-y-4 text-slate-700 leading-relaxed overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
            {content.split('\n').map((line, i) => {
                const trimmed = line.trim();
                if (trimmed.startsWith('# ')) {
                    return <h1 key={i} className="text-2xl font-bold text-slate-900 mt-6 mb-4 border-b pb-2 border-slate-200">{trimmed.replace('# ', '')}</h1>;
                }
                if (trimmed.startsWith('## ')) {
                    return <h2 key={i} className="text-xl font-bold text-indigo-700 mt-5 mb-3">{trimmed.replace('## ', '')}</h2>;
                }
                if (trimmed.startsWith('### ')) {
                    return <h3 key={i} className="text-lg font-bold text-slate-800 mt-4 mb-2">{trimmed.replace('### ', '')}</h3>;
                }
                if (trimmed.startsWith('- ')) {
                    return <li key={i} className="ml-4 list-disc marker:text-indigo-400 pl-1">{trimmed.replace('- ', '')}</li>;
                }
                if (trimmed === '') {
                    return <div key={i} className="h-2"></div>;
                }
                return <p key={i} className="">{line}</p>;
            })}
        </div>
    );
};

const Study = () => {
    const [activeTopic, setActiveTopic] = useState(CURRICULUM[0].subjects[0].topics[0]);

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
            {/* Curriculum Sidebar */}
            <div className="w-full lg:w-80 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden flex-shrink-0">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="font-bold text-lg">학습 목차</h2>
                    <p className="text-xs text-slate-500">학년별/과목별 커리큘럼</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {CURRICULUM.map(grade => (
                        <GradeSection
                            key={grade.id}
                            gradeData={grade}
                            currentTopicId={activeTopic.id}
                            onSelectTopic={setActiveTopic}
                        />
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-6 min-w-0 overflow-y-auto custom-scrollbar pr-2">
                {/* Top: Lecture Notes (Took place of Video) */}
                <div className="flex-none bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[700px]">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 flex-shrink-0">
                        <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                        강의 핵심 노트
                    </h3>
                    <div className="flex-1">
                        <ContentViewer content={activeTopic.content} />
                    </div>
                </div>

                {/* Bottom: Video (Moved from top) */}
                <div className="flex-shrink-0">
                    <VideoPlayer videoId={activeTopic.videoId} title={activeTopic.title} />
                </div>
            </div>
        </div>
    );
};

export default Study;
