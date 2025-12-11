import React from 'react';
import clsx from 'clsx';

const CircleNum = ({ num, isSelected }) => {
    // Unicode for circled numbers: ① = 0x2460
    const charCode = 0x2460 + (num - 1);
    return (
        <span className={clsx(
            "inline-flex items-center justify-center text-lg leading-none transition-colors",
            isSelected ? "text-indigo-600 font-bold" : "text-slate-500"
        )}>
            {String.fromCharCode(charCode)}
        </span>
    );
};

const QuestionItem = ({ problem, index, selectedAnswer, onSelect }) => {
    return (
        <div className="break-inside-avoid mb-8 relative group">
            <div className="flex gap-2 mb-3">
                <span className="font-bold text-xl font-serif text-slate-900">{index + 1}.</span>
                <div className="flex-1">
                    <h3 className="font-serif font-semibold text-lg leading-snug text-slate-800">
                        {problem.question}
                    </h3>
                    {problem.passage && (
                        <div className="my-3 p-4 border border-slate-300 rounded-sm bg-white text-sm font-serif leading-relaxed text-slate-700">
                            {problem.passage.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-1.5 pl-6">
                {problem.choices.map((choice, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(problem.id, idx + 1)}
                        className="w-full text-left flex items-start gap-2 hover:bg-indigo-50/50 p-1 -ml-1 rounded transition-colors group/choice"
                    >
                        <CircleNum num={idx + 1} isSelected={selectedAnswer === idx + 1} />
                        <span className={clsx(
                            "text-sm font-serif pt-0.5",
                            selectedAnswer === idx + 1 ? "text-indigo-700 font-medium" : "text-slate-700"
                        )}>
                            {choice}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const ExamPaper = ({ problems, answers, onAnswer }) => {
    return (
        <div className="bg-slate-200 p-4 md:p-8 min-h-full font-serif overflow-auto">
            {/* Paper Sheet */}
            <div className="max-w-5xl mx-auto bg-white shadow-2xl min-h-[1000px] relative">
                {/* Header mimicking test paper */}
                <div className="border-b-2 border-slate-800 p-8 pb-4 mb-8">
                    <div className="flex justify-between items-end border-b border-slate-300 pb-2 mb-2">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">2024학년도 과학 탐구 영역</h1>
                        <div className="text-right">
                            <span className="border border-slate-800 px-4 py-1 font-bold text-lg">3 교시</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-600">
                        <span>성명: ________________</span>
                        <span>수험번호: ________________</span>
                    </div>
                </div>

                {/* 2-Column Layout */}
                <div className="px-8 pb-16 columns-1 md:columns-2 gap-12 text-justify">
                    {problems.map((problem, index) => (
                        <QuestionItem
                            key={problem.id}
                            problem={problem}
                            index={index}
                            selectedAnswer={answers[problem.id]}
                            onSelect={onAnswer}
                        />
                    ))}
                </div>

                {/* Footer Page Num */}
                <div className="absolute bottom-4 w-full text-center">
                    <span className="font-bold text-lg text-slate-400">- 1 -</span>
                </div>
            </div>
        </div>
    );
};

export default ExamPaper;
