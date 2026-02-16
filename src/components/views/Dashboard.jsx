import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Activity, Zap, TrendingUp, Target } from 'lucide-react';
import { format } from 'date-fns';
import { useStore } from '../../lib/store';

// Widgets
import PulseWidget from '../widgets/PulseWidget';
import FocusWidget from '../widgets/FocusWidget';
import SmartInsightsWidget from '../widgets/SmartInsightsWidget';
import VelocityGraph from '../widgets/VelocityGraph';
import HabitHeatmap from '../widgets/HabitHeatmap';
import DailyObjectivesWidget from '../widgets/DailyObjectivesWidget';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } }
};

const Dashboard = () => {
    const { user, habits, tasks, projects, timetable, latestInsight, systemStatus } = useStore();
    const navigate = useNavigate();

    const { getCompletionRate } = useStore();

    const todayActivities = (timetable || []).filter(item => {
        const todayName = format(new Date(), 'EEEE');
        const todayStr = format(new Date(), 'yyyy-MM-dd');
        return item.recurrence === 'weekly' ? item.day === todayName : item.date === todayStr;
    });

    const userName = user?.email?.split('@')[0] || 'Operator';
    const motivationLine = latestInsight?.motivation || "Initializing tactical sequence. Maintain absolute focus.";

    return (
        <motion.div
            className="space-y-8 max-w-[1600px] mx-auto pb-32 px-4 md:px-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Professional Command Header */}
            <motion.header variants={itemVariants} className="mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-4 border-b border-white/5">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-1 h-3 bg-[var(--neon-green)]/20 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                                ))}
                            </div>
                            <span className="text-[var(--neon-green)] font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                                Neural Command Console v2.4
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-[var(--text-main)] tracking-tighter leading-none">
                            Welcome, <span className="text-gradient-green opacity-90">{userName}</span>
                        </h1>
                        <p className="text-[var(--text-dim)] text-sm md:text-base max-w-2xl font-medium leading-relaxed italic border-l-2 border-[var(--neon-green)]/40 pl-6 py-1">
                            "{motivationLine}"
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2">
                        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 dark:bg-white/5 rounded-2xl border border-white/10 dark:border-white/5 order-2 md:order-1">
                            <div className="text-right">
                                <p className="text-[9px] font-black text-[var(--text-dim)] uppercase tracking-widest">System Efficiency</p>
                                <p className="text-2xl font-mono font-black text-[var(--text-main)] leading-none mt-1">{getCompletionRate()}%</p>
                            </div>
                            <div className="w-12 h-12 relative flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                                    <motion.circle
                                        cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-[var(--neon-green)]"
                                        strokeDasharray={125.6}
                                        initial={{ strokeDashoffset: 125.6 }}
                                        animate={{ strokeDashoffset: 125.6 - (125.6 * getCompletionRate()) / 100 }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </svg>
                                <Zap size={14} className="absolute text-[var(--neon-green)] animate-pulse" />
                            </div>
                        </div>
                        <p className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-widest order-1 md:order-2">
                            LATENCY: <span className="text-[var(--neon-green)]">0.2ms</span> // STATUS: <span className="text-[var(--neon-green)] uppercase"> {systemStatus === 'optimal' ? 'Optimal' : systemStatus}</span>
                        </p>
                    </div>
                </div>
            </motion.header>

            {/* Top Row: AI Tactical Grid & Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <motion.div variants={itemVariants} className="lg:col-span-8 h-[280px]">
                    <SmartInsightsWidget />
                </motion.div>
                <motion.div variants={itemVariants} className="lg:col-span-4 h-[280px]">
                    <VelocityGraph />
                </motion.div>
            </div>

            {/* Middle Row: Operations, Focus & Consistency */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Active Operations */}
                <motion.div variants={itemVariants} className="glass-card p-8 h-[360px] flex flex-col group hover:border-[var(--neon-green)]/20 transition-all">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-3">
                            <Target size={16} className="text-[var(--neon-green)]" /> Active Operations
                        </h3>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--neon-green)]/10 transition-colors">
                            <Activity size={12} className="text-gray-500 group-hover:text-[var(--neon-green)]" />
                        </div>
                    </div>
                    <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
                        {(projects || []).filter(p => !p.completed).length > 0 ? (
                            (projects || []).filter(p => !p.completed).sort((a, b) => (b.progress || 0) - (a.progress || 0)).slice(0, 3).map(p => (
                                <div key={p.id} className="group/item cursor-pointer" onClick={() => navigate('/projects')}>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="font-bold text-gray-300 group-hover/item:text-[var(--neon-green)] transition-colors">{p.name}</span>
                                        <span className="font-mono text-[var(--neon-green)]/60 font-black">{p.progress || 0}%</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${p.progress || 0}%` }}
                                            className="h-full bg-gradient-to-r from-[var(--neon-green)]/40 to-[var(--neon-green)]"
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full opacity-20">
                                <Target size={40} className="mb-2" />
                                <p className="text-[9px] font-black uppercase">No active ops</p>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => navigate('/projects')}
                        className="mt-6 w-full py-3 bg-white/5 hover:bg-[var(--neon-green)]/10 text-[9px] text-gray-400 hover:text-[var(--neon-green)] font-black uppercase tracking-[0.3em] rounded-xl transition-all border border-transparent hover:border-[var(--neon-green)]/20"
                    >
                        Access Command Center
                    </button>
                </motion.div>

                {/* Focus Module */}
                <motion.div variants={itemVariants} className="h-[360px]">
                    <FocusWidget />
                </motion.div>

                {/* Consistency / Pulse */}
                <motion.div variants={itemVariants} className="h-[360px]">
                    <DailyObjectivesWidget />
                </motion.div>
            </div>

            {/* Bottom Row: Tactical Grid */}
            <motion.div variants={itemVariants} className="glass-card p-8 min-h-[450px] flex flex-col overflow-hidden group hover:border-[var(--neon-green)]/20 transition-all">
                <div className="flex justify-between items-center mb-8">
                    <div className="space-y-1">
                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-3">
                            <Calendar size={16} className="text-[var(--neon-green)]" /> Daily Tactical Grid
                        </h3>
                        <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest pl-7">Temporal Alignment: {format(new Date(), 'EEEE, MMM do')}</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-[10px] bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/20 px-3 py-1.5 rounded-lg text-[var(--neon-green)] font-black tracking-widest">
                            {todayActivities.length} SECTORS
                        </span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 no-scrollbar">
                    {todayActivities.length > 0 ? (
                        todayActivities.map((item, i) => (
                            <div key={i} className="flex items-center gap-6 p-5 bg-white/[0.02] hover:bg-white/[0.04] rounded-[24px] border border-white/5 transition-all group/task cursor-pointer" onClick={() => useStore.getState().toggleTimetableItem(item.id)}>
                                <div className="font-mono text-xs text-[var(--neon-green)]/40 group-hover/task:text-[var(--neon-green)] transition-colors min-w-[70px] flex flex-col">
                                    <span className="text-[8px] text-gray-600 uppercase font-black mb-0.5">Time</span>
                                    {item.time || '00:00'}
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-bold text-gray-100 mb-1 leading-snug">{item.activity}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-green)]/40" />
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.type || 'Standard Op'}</p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all ${item.completed ? 'bg-[var(--neon-green)] border-[var(--neon-green)] shadow-[0_0_15px_var(--neon-green-glow)]' : 'border-white/10 group-hover/task:border-white/20'}`}>
                                    {item.completed && <Zap size={12} className="text-black" />}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-700 opacity-30 space-y-4">
                            <Activity size={48} className="animate-pulse" />
                            <div className="text-center">
                                <p className="text-xs font-black uppercase tracking-[0.3em]">Grid Status: Clear</p>
                                <p className="text-[9px] mt-2 font-medium">No tactical sessions assigned to current sector.</p>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
