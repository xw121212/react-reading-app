import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookCollection } from "@/components/bookshelf/BookCollection";
import { ReadingStats } from "@/components/bookshelf/ReadingStats";
import { PrivateBookshelf } from "@/components/bookshelf/PrivateBookshelf";
import { DeviceSync } from "@/components/bookshelf/DeviceSync";

export default function BookshelfPage() {
    const [activeTab, setActiveTab] = useState("collection");
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-rice-paper text-ink flex flex-col">
            {}
            <div
                className="bg-white border-b border-silk-gray p-4 sticky top-16 z-10 ink-splash">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 rounded-full hover:bg-silk-gray transition-colors mr-3">
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <h1
                            className="text-2xl font-bold text-glass-blue flex items-center"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>
                            <i className="fas fa-book mr-2"></i>我的书架
                                                          </h1>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="p-2 rounded-full hover:bg-silk-gray transition-colors"
                            style={{
                                backgroundColor: "#FECACA"
                            }}>
                            <i className="fas fa-sort"></i>
                        </button>
                        <button
                            className="p-2 rounded-full hover:bg-silk-gray transition-colors"
                            style={{
                                backgroundColor: "#FECACA"
                            }}>
                            <i className="fas fa-search"></i>
                        </button>
                        <button
                            className="p-2 rounded-full hover:bg-silk-gray transition-colors"
                            style={{
                                backgroundColor: "#FECACA"
                            }}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
            {}
            <div className="bg-white border-b border-silk-gray sticky top-[7.5rem] z-10">
                <div className="container mx-auto flex overflow-x-auto hide-scrollbar">
                    <button
                        className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "collection" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("collection")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>我的书库
                                                            {activeTab === "collection" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                    <button
                        className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "stats" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("stats")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>阅读统计
                                                            {activeTab === "stats" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                    <button
                        className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "private" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("private")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>私密书架
                                                            {activeTab === "private" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                    <button
                        className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "sync" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("sync")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>多设备同步
                                                            {activeTab === "sync" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                </div>
            </div>
            {}
            <main className="flex-1 container mx-auto p-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            y: -20
                        }}
                        transition={{
                            duration: 0.3
                        }}
                        className="mt-4">
                        {activeTab === "collection" && <BookCollection />}
                        {activeTab === "stats" && <ReadingStats />}
                        {activeTab === "private" && <PrivateBookshelf />}
                        {activeTab === "sync" && <DeviceSync />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}