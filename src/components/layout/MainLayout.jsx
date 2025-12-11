import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, GraduationCap, BarChart2, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ to, icon: Icon, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`
            }
        >
            <Icon size={20} strokeWidth={2} />
            <span className="font-medium">{label}</span>
        </NavLink>
    );
};

const MainLayout = () => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200 shadow-xl z-20 hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-100/50">
                    <div className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tight">
                        <GraduationCap size={32} />
                        <span>Science<span className="text-secondary">Lab</span></span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <SidebarItem to="/" icon={LayoutDashboard} label="대시보드" />
                    <SidebarItem to="/study" icon={BookOpen} label="학습하기" />
                    <SidebarItem to="/exam" icon={GraduationCap} label="문제풀이" />
                    <SidebarItem to="/report" icon={BarChart2} label="학습결과서" />
                </nav>

                <div className="p-4 border-t border-slate-100/50">
                    <div className="bg-gradient-to-br from-primary to-indigo-600 rounded-xl p-4 text-white shadow-lg shadow-primary/25">
                        <p className="text-sm font-medium opacity-90">오늘의 학습 달성도</p>
                        <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-[75%] rounded-full" />
                        </div>
                        <p className="text-xs mt-2 text-right font-bold">75% 완료</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50 relative">
                {/* Mobile Header (Hidden on Desktop) */}
                <header className="md:hidden h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center px-4 justify-between z-10 sticky top-0">
                    <span className="font-bold text-lg text-primary">ScienceLab</span>
                    <button className="p-2 text-slate-600">
                        <Menu />
                    </button>
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-auto p-6 md:p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto h-full">
                        <AnimatePresence mode="wait">
                            {/* Add page transition wrapper here if needed */}
                            <Outlet />
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
