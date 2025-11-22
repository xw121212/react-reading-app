import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReadingProfile } from "@/components/profile/ReadingProfile";
import { MyLiveStreams } from "@/components/profile/MyLiveStreams";
import { Settings } from "@/components/profile/Settings";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<"profile" | "live" | "settings">("profile");

    return (
        <div className="min-h-screen bg-rice-paper text-ink flex flex-col">
            {}
            <div className="bg-white border-b border-silk-gray p-4 sticky top-16 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <h1
                        className="text-2xl font-bold text-glass-blue flex items-center"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>
                        <i className="fas fa-user mr-2"></i>个人中心
                                  </h1>
                </div>
            </div>
            {}
            <div className="bg-white border-b border-silk-gray sticky top-[7.5rem] z-10">
                <div className="container mx-auto flex overflow-x-auto hide-scrollbar">
                    <button
                        className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "profile" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("profile")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>阅读主页
                                    {activeTab === "profile" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                    <button
                        className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "live" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("live")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>我的直播
                                    {activeTab === "live" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                    <button
                        className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "settings" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("settings")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>设置管理
                                    {activeTab === "settings" && <div
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
                        {activeTab === "profile" && <ReadingProfile />}
                        {activeTab === "live" && <MyLiveStreams />}
                        {activeTab === "settings" && <Settings />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}