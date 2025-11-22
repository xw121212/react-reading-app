import { useState } from "react";
import { motion } from "framer-motion";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const readingStats = {
    totalBooks: 24,
    readingDays: 128,
    totalHours: 436,
    thisMonthHours: 38,
    completionRate: 75
};

const monthlyReadingData = [{
    name: "1月",
    hours: 32
}, {
    name: "2月",
    hours: 28
}, {
    name: "3月",
    hours: 45
}, {
    name: "4月",
    hours: 38
}, {
    name: "5月",
    hours: 42
}, {
    name: "6月",
    hours: 36
}];

const readingPreferenceData = [{
    name: "小说",
    value: 40
}, {
    name: "历史",
    value: 25
}, {
    name: "哲学",
    value: 15
}, {
    name: "科技",
    value: 10
}, {
    name: "其他",
    value: 10
}];

const COLORS = ["#3A7DA8", "#D15A5A", "#6BA86B", "#B9A16A", "#A9A395"];

export function ReadingStats() {
    const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");

    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden p-6 ink-splash">
            <div className="flex justify-between items-center mb-6">
                <h2
                    className="text-xl font-bold text-glass-blue"
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>阅读统计</h2>
                {}
                <div className="flex bg-silk-gray/50 rounded-lg p-1">
                    <button
                        className={`px-3 py-1 rounded-md text-xs font-medium ${timeRange === "week" ? "bg-white shadow-sm text-ink" : "text-inkstone-gray"}`}
                        onClick={() => setTimeRange("week")}>本周
                                  </button>
                    <button
                        className={`px-3 py-1 rounded-md text-xs font-medium ${timeRange === "month" ? "bg-white shadow-sm text-ink" : "text-inkstone-gray"}`}
                        onClick={() => setTimeRange("month")}>本月
                                  </button>
                    <button
                        className={`px-3 py-1 rounded-md text-xs font-medium ${timeRange === "year" ? "bg-white shadow-sm text-ink" : "text-inkstone-gray"}`}
                        onClick={() => setTimeRange("year")}>本年
                                  </button>
                </div>
            </div>
            {}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <motion.div
                    whileHover={{
                        y: -5
                    }}
                    className="bg-rice-paper rounded-xl p-4 flex flex-col items-center">
                    <div
                        className="w-12 h-12 rounded-full bg-glass-blue/10 flex items-center justify-center mb-3">
                        <i className="fas fa-book text-glass-blue text-xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold">{readingStats.totalBooks}</h3>
                    <p
                        className="text-xs text-inkstone-gray mt-1"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>已读书籍</p>
                </motion.div>
                <motion.div
                    whileHover={{
                        y: -5
                    }}
                    className="bg-rice-paper rounded-xl p-4 flex flex-col items-center">
                    <div
                        className="w-12 h-12 rounded-full bg-crabapple-red/10 flex items-center justify-center mb-3">
                        <i className="fas fa-calendar-check text-crabapple-red text-xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold">{readingStats.readingDays}</h3>
                    <p
                        className="text-xs text-inkstone-gray mt-1"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>阅读天数</p>
                </motion.div>
                <motion.div
                    whileHover={{
                        y: -5
                    }}
                    className="bg-rice-paper rounded-xl p-4 flex flex-col items-center">
                    <div
                        className="w-12 h-12 rounded-full bg-bamboo-green/10 flex items-center justify-center mb-3">
                        <i className="fas fa-clock text-bamboo-green text-xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold">{readingStats.totalHours}</h3>
                    <p
                        className="text-xs text-inkstone-gray mt-1"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>总阅读时长</p>
                </motion.div>
                <motion.div
                    whileHover={{
                        y: -5
                    }}
                    className="bg-rice-paper rounded-xl p-4 flex flex-col items-center">
                    <div
                        className="w-12 h-12 rounded-full bg-autumn-yellow/10 flex items-center justify-center mb-3">
                        <i className="fas fa-tachometer-alt text-autumn-yellow text-xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold">{readingStats.completionRate}%</h3>
                    <p
                        className="text-xs text-inkstone-gray mt-1"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>完成率</p>
                </motion.div>
            </div>
            {}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {}
                <div className="bg-rice-paper rounded-xl p-4">
                    <h3
                        className="text-lg font-medium mb-4 flex items-center"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>
                        <span className="w-2 h-6 bg-glass-blue inline-block mr-2"></span>阅读时长趋势
                                  </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyReadingData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D9" />
                                <XAxis
                                    dataKey="name"
                                    tick={{
                                        fontSize: 12
                                    }} />
                                <YAxis
                                    tick={{
                                        fontSize: 12
                                    }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "white",
                                        borderColor: "#E8E4D9",
                                        borderRadius: "8px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                    }} />
                                <Bar dataKey="hours" fill="#3A7DA8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                {}
                <div className="bg-rice-paper rounded-xl p-4">
                    <h3
                        className="text-lg font-medium mb-4 flex items-center"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>
                        <span className="w-2 h-6 bg-crabapple-red inline-block mr-2"></span>阅读偏好分析
                                  </h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={readingPreferenceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={(
                                        {
                                            name,
                                            percent
                                        }
                                    ) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    labelLine={{
                                        stroke: "#A9A395",
                                        strokeWidth: 1
                                    }}>
                                    {readingPreferenceData.map(
                                        (entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    )}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "white",
                                        borderColor: "#E8E4D9",
                                        borderRadius: "8px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                    }}
                                    formatter={value => [`${value}%`, "占比"]} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            {}
            <div className="mt-8 bg-rice-paper rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3
                        className="text-lg font-medium flex items-center"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>
                        <span className="w-2 h-6 bg-bamboo-green inline-block mr-2"></span>本月阅读目标
                                  </h3>
                    <span
                        className="text-sm text-bamboo-green"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>{readingStats.thisMonthHours}/ 50 小时</span>
                </div>
                {}
                <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden mb-4">
                    <div
                        className="h-full bg-gradient-to-r from-glass-blue to-bamboo-green rounded-full"
                        style={{
                            width: `${readingStats.thisMonthHours / 50 * 100}%`
                        }}></div>
                </div>
                {}
                <div className="flex justify-between text-sm">
                    <span
                        className="text-inkstone-gray"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>距离目标还需阅读 <span className="text-crabapple-red font-medium">12 小时</span></span>
                    <button
                        className="text-glass-blue hover:underline"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>调整目标</button>
                </div>
            </div>
        </div>
    );
}