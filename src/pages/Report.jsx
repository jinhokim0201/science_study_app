import React from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';
import { CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';

const SUBJECT_DATA = [
    { subject: '물리학', score: 85, fullMark: 100 },
    { subject: '화학', score: 92, fullMark: 100 },
    { subject: '생명과학', score: 78, fullMark: 100 },
    { subject: '지구과학', score: 65, fullMark: 100 },
];

const WEAKNESS_DATA = [
    { topic: '지권의 변화', score: 40 },
    { topic: '힘과 운동', score: 55 },
    { topic: '전기와 자기', score: 60 },
    { topic: '화학 반응', score: 80 },
    { topic: '생물 다양성', score: 90 },
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

const Report = () => {
    return (
        <div className="space-y-8 pb-10">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">종합 학습 분석 리포트</h1>
                    <p className="text-slate-500">최근 3개월간의 학습 데이터와 모의고사 결과를 분석했습니다.</p>
                </div>
                <div className="text-right bg-indigo-50 px-8 py-4 rounded-2xl">
                    <p className="text-sm font-bold text-indigo-400 uppercase tracking-wide">Estimated Grade</p>
                    <p className="text-4xl font-black text-indigo-600">2 <span className="text-xl font-medium text-slate-400">등급</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Subject Balance Radar */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <TrendingUp className="text-indigo-500" /> 과목별 밸런스
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SUBJECT_DATA}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="내 점수"
                                    dataKey="score"
                                    stroke="#4f46e5"
                                    strokeWidth={3}
                                    fill="#4f46e5"
                                    fillOpacity={0.2}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-sm text-slate-500 mt-4">
                        <span className="font-bold text-indigo-600">화학</span> 과목에서 강점을 보이고 있으나, <br />
                        <span className="font-bold text-red-500">지구과학</span>의 보완이 시급합니다.
                    </p>
                </div>

                {/* Weakness Bar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <AlertTriangle className="text-pink-500" /> 단원별 취약점
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={WEAKNESS_DATA} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis type="category" dataKey="topic" width={80} tick={{ fontSize: 11 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="score" barSize={20} radius={[0, 4, 4, 0]}>
                                    {WEAKNESS_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.score < 60 ? '#ec4899' : '#cbd5e1'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 bg-pink-50 p-4 rounded-xl border border-pink-100">
                        <h4 className="font-bold text-pink-700 text-sm mb-1">학습 제안</h4>
                        <p className="text-xs text-pink-600 leading-relaxed">
                            '지권의 변화' 단원의 성취도가 40%로 가장 낮습니다. 해당 단원의 핵심 개념(판 구조론, 암석의 순환) 강의를 다시 수강하고, 기본 문제를 통해 개념을 다지는 것을 추천합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
