import React, { useState } from 'react';
import { CURRICULUM } from '../data/curriculum';
import ExamPaper from '../components/exam/ExamPaper';
import { CheckCircle, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResultModal = ({ score, total, onRetry }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
        <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
        >
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">시험 종료!</h2>
            <p className="text-slate-500 mb-6">수고하셨습니다. 당신의 점수는?</p>

            <div className="text-5xl font-black text-indigo-600 mb-2">
                {score * 20} <span className="text-xl text-slate-400 font-medium">/ 100</span>
            </div>
            <p className="text-sm font-medium text-slate-400 mb-8">{total}문제 중 {score}문제 정답</p>

            <button
                onClick={onRetry}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
                <RefreshCw size={18} />
                다시 풀기
            </button>
        </motion.div>
    </motion.div>
);

const Exam = () => {
    // Selection State
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Exam State
    const [generatedProblems, setGeneratedProblems] = useState([]);
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const handleGenerate = async (topic) => {
        setSelectedSubject(topic);
        setIsGenerating(true);
        try {
            // Import dynamically to avoid circular dependencies if any, or just direct import
            const { generateProblems } = await import('../services/geminiService');

            // Prepare context from the topic content
            const context = topic.content || "Context not available.";

            const problems = await generateProblems(context, selectedGrade.grade, topic.title);

            // Assign meaningful IDs 
            const formattedProblems = problems.map((p, i) => ({
                ...p,
                id: `gen-${Date.now()}-${i}`,
                grade: selectedGrade.grade,
                unit: topic.title
            }));

            setGeneratedProblems(formattedProblems);
        } catch (error) {
            alert("시험지 생성 중 오류가 발생했습니다: " + error.message);
            setIsGenerating(false); // Reset on error to allow retry
            setSelectedSubject(null);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAnswer = (problemId, choiceIndex) => {
        if (isSubmitted) return;
        setAnswers(prev => ({
            ...prev,
            [problemId]: choiceIndex
        }));
    };

    const handleSubmit = () => {
        let correctCount = 0;
        generatedProblems.forEach(p => {
            // AI returns 0-based answer index. UI sends 1-based (from ExamPaper presumably? Check ExamPaper implementation later, assuming standard 1-based click).
            // Actually ExamPaper usually passes the index of the clicked button.
            // Let's assume ExamPaper passes 1, 2, 3, 4, 5.
            // And AI assumes 0, 1, 2, 3, 4.
            // So match: answers[p.id] === p.answer + 1
            if (answers[p.id] === p.answer + 1) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setIsSubmitted(true);
    };

    const handleRetry = () => {
        setAnswers({});
        setIsSubmitted(false);
        setScore(0);
        setGeneratedProblems([]);
        setSelectedGrade(null);
        setSelectedSubject(null);
    };

    // --- Render: Selection Screen ---
    if (generatedProblems.length === 0) {
        return (
            <div className="h-full flex flex-col p-6 max-w-4xl mx-auto w-full">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">실전 모의고사 생성</h1>
                    <p className="text-slate-500">학년과 주제를 선택하면 AI가 실시간으로 40문제를 출제합니다.</p>
                </div>

                {/* Loading State */}
                {isGenerating && (
                    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                        <div className="animate-spin w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full mb-4"></div>
                        <h2 className="text-xl font-bold text-indigo-700 animate-pulse">AI 시험지 생성 중...</h2>
                        <p className="text-slate-500 mt-2">약 10~20초 정도 소요됩니다.</p>
                    </div>
                )}

                {/* Grade Selection */}
                {!selectedGrade && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {CURRICULUM.map(grade => (
                            <button
                                key={grade.id}
                                onClick={() => setSelectedGrade(grade)}
                                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50 transition-all text-left group"
                            >
                                <span className="block text-xs font-bold text-indigo-500 mb-1">GRADE</span>
                                <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-700">{grade.grade}</h3>
                                <div className="mt-4 flex items-center text-slate-400 text-sm group-hover:text-indigo-500">
                                    주제 선택하기 <ChevronRight size={16} className="ml-1" />
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Subject Selection */}
                {selectedGrade && !isGenerating && (
                    <div className="space-y-6">
                        <button
                            onClick={() => setSelectedGrade(null)}
                            className="flex items-center text-slate-500 hover:text-slate-800 font-medium"
                        >
                            <ChevronRight size={16} className="rotate-180 mr-1" /> 다름 학년 선택
                        </button>

                        <h2 className="text-xl font-bold text-slate-800 border-b pb-2">
                            {selectedGrade.grade} <span className="text-slate-400 font-normal">학습 주제 선택</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedGrade.subjects.flatMap(s => s.topics).map(topic => (
                                <button
                                    key={topic.id}
                                    onClick={() => handleGenerate(topic)}
                                    className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:ring-1 hover:ring-indigo-400 transition-all text-left flex justify-between items-center"
                                >
                                    <span className="font-semibold text-slate-700">{topic.title}</span>
                                    <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded font-bold">시험 생성</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // --- Render: Exam Paper ---
    return (
        <div className="relative h-full flex flex-col">
            {/* Toolbar */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <h2 className="font-bold text-lg flex items-center gap-2">
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-black">LIVE</span>
                    실전 모의고사 - {selectedGrade?.grade}
                </h2>
                <div className="flex items-center gap-4">
                    {!isSubmitted && (
                        <span className="text-sm font-medium text-slate-500">
                            답안 작성 중: {Object.keys(answers).length} / {generatedProblems.length}
                        </span>
                    )}
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitted}
                        className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 disabled:opacity-50 transition-colors"
                    >
                        제출하기
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto bg-slate-100">
                <ExamPaper
                    problems={generatedProblems}
                    answers={answers}
                    onAnswer={handleAnswer}
                />
            </div>

            <AnimatePresence>
                {isSubmitted && (
                    <ResultModal score={score} total={generatedProblems.length} onRetry={handleRetry} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Exam;
