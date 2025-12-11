import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Map, Trophy, ArrowRight, PlayCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Card = ({ children, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${className}`}
    >
        {children}
    </motion.div>
);

const Home = () => {
    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">반갑습니다, 김학생님! 👋</h1>
                    <p className="text-slate-500 mt-2">오늘도 과학 만점을 향해  달려볼까요?</p>
                </div>
                <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-slate-400">내신 시험 D-14</p>
                    <p className="text-2xl font-bold text-primary">목표 달성 85%</p>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Study Now */}
                <Link to="/study" className="group">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white h-full relative overflow-hidden shadow-lg shadow-indigo-200 hover:scale-[1.02] transition-transform">
                        <div className="relative z-10">
                            <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-1">학습하기</h3>
                            <p className="text-indigo-100 text-sm mb-4">커리큘럼에 맞춰 개념 완벽 정리</p>
                            <div className="flex items-center gap-2 text-sm font-medium bg-white/10 w-fit px-3 py-1.5 rounded-lg group-hover:bg-white/20 transition-colors">
                                이어하기 <ArrowRight size={14} />
                            </div>
                        </div>
                        {/* Decor */}
                        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    </div>
                </Link>

                {/* Problem Solving */}
                <Link to="/exam" className="group">
                    <div className="bg-white rounded-2xl p-6 h-full border border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all relative overflow-hidden group-hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center mb-4">
                            <Map size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">실전 문제 풀이</h3>
                        <p className="text-slate-500 text-sm mb-4">기출 트렌드 분석 모의고사</p>
                        <span className="text-pink-500 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                            문제 풀러 가기 <ArrowRight size={16} />
                        </span>
                    </div>
                </Link>

                {/* Report (Analysis) */}
                <Link to="/report" className="group">
                    <div className="bg-white rounded-2xl p-6 h-full border border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all group-hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                            <Trophy size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">학습 리포트</h3>
                        <p className="text-slate-500 text-sm mb-4">취약점 분석 및 솔루션 제공</p>
                        <span className="text-emerald-600 text-sm font-semibold">
                            내 실력 확인하기
                        </span>
                    </div>
                </Link>
            </div>

            {/* Recent Activity & Weakness */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <PlayCircle className="text-indigo-500" size={20} />
                            최근 학습 강좌
                        </h3>
                        <span className="text-xs font-medium text-slate-400 cursor-pointer hover:text-indigo-500">전체보기</span>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer">
                                <div className="w-16 h-10 bg-slate-200 rounded-lg relative overflow-hidden flex-shrink-0">
                                    <div className="absolute inset-0 bg-slate-300 animate-pulse" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-slate-900 truncate">중2 과학 - 전기와 자기 기초</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">20분 전 학습 • 진도율 40%</p>
                                </div>
                                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                                    <PlayCircle size={16} fill="currentColor" className="opacity-0 group-hover:opacity-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <AlertCircle className="text-pink-500" size={20} />
                            취약 유형 분석
                        </h3>
                        <span className="text-xs font-medium text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">솔루션 준비됨</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-5 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-slate-700">물리 - 힘과 운동</span>
                            <span className="text-xs font-bold text-pink-500 bg-pink-50 px-2 py-0.5 rounded">정답률 42%</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            '가속도' 개념이 포함된 응용 문제에서 오답률이 높습니다. 그래프 해석 연습이 필요합니다.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-slate-700">지구과학 - 판 구조론</span>
                            <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded">정답률 55%</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            판의 경계 종류(수렴형, 발산형) 구분 암기가 부족해 보입니다.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Home;
