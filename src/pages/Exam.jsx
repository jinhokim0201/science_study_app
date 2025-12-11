import React, { useState } from 'react';
import { PROBLEMS } from '../data/problems';
import ExamPaper from '../components/exam/ExamPaper';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
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
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswer = (problemId, choiceIndex) => {
        if (isSubmitted) return;
        setAnswers(prev => ({
            ...prev,
            [problemId]: choiceIndex
        }));
    };

    const handleSubmit = () => {
        // Validate all answered? (Optional, skipping for now)
        let correctCount = 0;
        PROBLEMS.forEach(p => {
            if (answers[p.id] === p.answer + 1) { // Answers in data are 0-index? Check data.js. 
                // In problems.js: "answer: 3" (index).
                // In UI: choiceIndex comes as 1-based (idx+1).
                // Let's standardize.
                // Data: answer 3 (means 4th option).
                // UI choiceIndex: 4.
                // So checking answers[p.id] === p.answer + 1 is correct.
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
        window.scrollTo(0, 0);
    };

    return (
        <div className="relative h-full flex flex-col">
            {/* Toolbar */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <h2 className="font-bold text-lg flex items-center gap-2">
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-black">LIVE</span>
                    실전 모의고사
                </h2>
                <div className="flex items-center gap-4">
                    {!isSubmitted && (
                        <span className="text-sm font-medium text-slate-500">
                            답안 작성 중: {Object.keys(answers).length} / {PROBLEMS.length}
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
                    problems={PROBLEMS}
                    answers={answers}
                    onAnswer={handleAnswer}
                />
            </div>

            <AnimatePresence>
                {isSubmitted && (
                    <ResultModal score={score} total={PROBLEMS.length} onRetry={handleRetry} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Exam;
