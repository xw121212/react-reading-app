import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";

const ongoingLives = [{
    id: 1,
    title: "《百年孤独》深度解析",
    host: "文学教授张明",
    viewers: 1243,
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Literature%20Book%20Discussion%20Live%20Stream&sign=6dcc0b119ef403eb1b7adb620d8741e3",
    description: "一起探讨马尔克斯的经典之作《百年孤独》的文学价值和深刻内涵",
    tags: ["文学", "经典", "马尔克斯"],
    startTime: "2025-11-21 19:00",
    isLive: true
}, {
    id: 2,
    title: "推理小说创作技巧分享",
    host: "推理作家陈晨",
    viewers: 856,
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Mystery%20Novel%20Writing%20Tips%20Live&sign=eb100dc69a4550b627e43058d33f276e",
    description: "从悬念设置到人物塑造，揭秘推理小说的创作秘诀",
    tags: ["写作", "推理小说", "创作技巧"],
    startTime: "2025-11-21 20:30",
    isLive: true
}, {
    id: 3,
    title: "心理学与生活：如何提升幸福感",
    host: "心理学家刘芳",
    viewers: 1567,
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Psychology%20Wellness%20Live%20Workshop&sign=288f80958f22b681002d7be87d387dcf",
    description: "从心理学角度探讨如何培养积极心态，提升生活幸福感",
    tags: ["心理学", "生活", "幸福感"],
    startTime: "2025-11-21 18:00",
    isLive: true
}];

const upcomingLives = [{
    id: 4,
    title: "科幻小说创作分享会",
    host: "科幻作家李华",
    time: "2025-11-25 20:00",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Science%20Fiction%20Writing%20Workshop%20Live&sign=2077deb4ca9ff7981181d188681505a3",
    description: "与知名科幻作家一起探讨科幻文学的创作理念和未来发展",
    tags: ["科幻", "创作", "分享会"],
    isReserved: false
}, {
    id: 5,
    title: "诗歌鉴赏入门",
    host: "诗人王芳",
    time: "2025-11-28 19:30",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Poetry%20Appreciation%20Live%20Class&sign=dea5e1c69b26e5b8f4d020c89c6a4f2d",
    description: "从零开始学习诗歌鉴赏，感受文字之美",
    tags: ["诗歌", "鉴赏", "入门"],
    isReserved: true
}, {
    id: 6,
    title: "文学经典《红楼梦》解读",
    host: "文学教授张明",
    time: "2025-12-05 21:00",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Dream%20of%20the%20Red%20Chamber%20Literature%20Analysis&sign=51127efc40159795b85c0cca3eb4ae61",
    description: "深入解析中国古典文学巅峰之作《红楼梦》的艺术魅力",
    tags: ["红楼梦", "古典文学", "文学分析"],
    isReserved: false
}];

const pastLives = [{
    id: 7,
    title: "《三体》中的宇宙观与哲学思考",
    host: "科幻作家李华",
    time: "2025-11-20 20:00",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Three-Body%20Problem%20Cosmology%20Discussion&sign=7d61b57a0d6670cb43d40b905ba479ee",
    description: "探讨《三体》中的宇宙观、黑暗森林理论及其哲学意义",
    tags: ["三体", "科幻", "哲学"],
    duration: "120",
    views: 3456
}, {
    id: 8,
    title: "高效阅读方法分享",
    host: "阅读教练赵阳",
    time: "2025-11-18 19:00",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Speed%20Reading%20Techniques%20Workshop&sign=b865415efba9f88a15d16d2e6120cee8",
    description: "分享如何提高阅读效率，掌握快速阅读的实用技巧",
    tags: ["阅读方法", "效率", "学习技巧"],
    duration: "90",
    views: 2341
}, {
    id: 9,
    title: "中国现代文学发展历程",
    host: "文学教授张明",
    time: "2025-11-15 14:00",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Modern%20Chinese%20Literature%20Lecture&sign=c9c7ff098581b05e81c9068a835c672e",
    description: "梳理中国现代文学的发展脉络，分析重要文学流派和代表作家",
    tags: ["现代文学", "文学史", "文学研究"],
    duration: "150",
    views: 1897
}];

export default function LiveCenterPage() {
    const {
        userRole
    } = useContext(AuthContext);
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<"ongoing" | "upcoming" | "past">("ongoing");
    const [upcomingLiveList, setUpcomingLiveList] = useState(upcomingLives);

    const [liveViewCounts, setLiveViewCounts] = useState<Record<number, number>>(ongoingLives.reduce((acc, live) => ({
        ...acc,
        [live.id]: live.viewers
    }), {}));

    useEffect(() => {
        if (activeTab === "ongoing") {
            const interval = setInterval(() => {
                setLiveViewCounts(prev => {
                    const newCounts: Record<number, number> = {};

                    Object.keys(prev).forEach(key => {
                        const id = parseInt(key);
                        newCounts[id] = prev[id] + Math.floor(Math.random() * 10) - 2;
                    });

                    return newCounts;
                });
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [activeTab]);

    const handleReserve = (id: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setUpcomingLiveList(prev => prev.map(live => live.id === id ? {
            ...live,
            isReserved: !live.isReserved
        } : live));

        const live = upcomingLiveList.find(l => l.id === id);

        if (live) {
            if (!live.isReserved) {
                toast.success(`已预约直播：${live.title}`);
            } else {
                toast.info(`已取消预约：${live.title}`);
            }
        }
    };

    const formatDuration = (minutes: string) => {
        const mins = parseInt(minutes);
        const hours = Math.floor(mins / 60);
        const remainingMins = mins % 60;

        if (hours > 0) {
            return `${hours}小时${remainingMins}分钟`;
        }

        return `${remainingMins}分钟`;
    };

    const getTimeRemaining = (liveTime: string) => {
        const now = new Date();
        const eventDate = new Date(liveTime);
        const diffTime = eventDate.getTime() - now.getTime();

        if (diffTime <= 0) {
            return "即将开始";
        }

        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diffTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        const minutes = Math.floor(diffTime % (1000 * 60 * 60) / (1000 * 60));

        if (days > 0) {
            return `${days}天后`;
        } else if (hours > 0) {
            return `${hours}小时后`;
        } else {
            return `${minutes}分钟后`;
        }
    };

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
                            <i className="fas fa-video mr-2"></i>直播中心
                                    </h1>
                    </div>
                    {userRole === "creator" && (
                        <Link
                            to="/creator/live/create"
                            className="px-4 py-2 bg-crabapple-red text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif",
                                backgroundColor: "#FDE68A",
                                fontWeight: "bold"
                            }}>
                            <i className="fas fa-video mr-1"></i>开启直播
                        </Link>
                    )}
                </div>
            </div>
            {}
            <div className="bg-white border-b border-silk-gray sticky top-[7.5rem] z-10">
                <div className="container mx-auto flex overflow-x-auto hide-scrollbar">
                    <button
                        className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "ongoing" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("ongoing")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>正在直播
                                    {activeTab === "ongoing" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                    <button
                        className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "upcoming" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("upcoming")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>直播预告
                                    {activeTab === "upcoming" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                    <button
                        className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "past" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("past")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>直播回放
                                    {activeTab === "past" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                </div>
            </div>
            {}
            <main className="flex-1 container mx-auto p-4">
                {}
                {activeTab === "ongoing" && <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ongoingLives.map((live, index) => <motion.div
                            key={live.id}
                            initial={{
                                opacity: 0,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{
                                delay: index * 0.1
                            }}
                            className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden hover:shadow-md transition-shadow">
                            <Link to={`/live/${live.id}`} className="block relative">
                                <div className="relative">
                                    <img src={live.coverUrl} alt={live.title} className="w-full h-48 object-cover" />
                                    <div
                                        className="absolute top-2 left-2 bg-crabapple-red text-white text-xs px-2 py-1 rounded-full flex items-center"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        <i className="fas fa-circle text-[6px] mr-1 animate-pulse"></i>正在直播
                                                              </div>
                                    <div
                                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-ink text-xs px-2 py-1 rounded-full flex items-center"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        <i className="fas fa-eye mr-1"></i> {liveViewCounts[live.id]?.toLocaleString() || live.viewers.toLocaleString()}
                                    </div>
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                        <h3
                                            className="text-white font-medium text-sm"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>
                                            {live.title}
                                        </h3>
                                        <p
                                            className="text-white/80 text-xs"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>
                                            {live.host}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <div className="p-3">
                                <p
                                    className="text-sm text-ink mb-3 line-clamp-2"
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>
                                    {live.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {live.tags.map((tag, tagIndex) => <span
                                        key={tagIndex}
                                        className="text-xs px-2 py-1 bg-silk-gray rounded-full text-inkstone-gray"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        {tag}
                                    </span>)}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-xs text-inkstone-gray"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>开始时间：{live.startTime}
                                    </span>
                                    <Link
                                        to={`/live/${live.id}`}
                                        className="px-4 py-1.5 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>进入观看
                                                              </Link>
                                </div>
                            </div>
                        </motion.div>)}
                    </div>
                </div>}
                {}
                {activeTab === "upcoming" && <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingLiveList.map((live, index) => <motion.div
                            key={live.id}
                            initial={{
                                opacity: 0,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{
                                delay: index * 0.1
                            }}
                            className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden hover:shadow-md transition-shadow">
                            <Link to={`/live/${live.id}`} className="block relative">
                                <div className="relative">
                                    <img src={live.coverUrl} alt={live.title} className="w-full h-48 object-cover" />
                                    <div
                                        className="absolute top-2 left-2 bg-glass-blue text-white text-xs px-2 py-1 rounded-full flex items-center"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        <i className="far fa-clock mr-1"></i>预告
                                                              </div>
                                    <div
                                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-ink text-xs px-2 py-1 rounded-full"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        {getTimeRemaining(live.time)}
                                    </div>
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                        <h3
                                            className="text-white font-medium text-sm"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>
                                            {live.title}
                                        </h3>
                                        <p
                                            className="text-white/80 text-xs"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>
                                            {live.host}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <div className="p-3">
                                <p
                                    className="text-sm text-ink mb-3 line-clamp-2"
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>
                                    {live.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {live.tags.map((tag, tagIndex) => <span
                                        key={tagIndex}
                                        className="text-xs px-2 py-1 bg-silk-gray rounded-full text-inkstone-gray"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        {tag}
                                    </span>)}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-xs text-inkstone-gray"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>开始时间：{live.time}
                                    </span>
                                    <button
                                        onClick={e => handleReserve(live.id, e)}
                                        className={`px-4 py-1.5 rounded-lg text-sm hover:bg-opacity-90 transition-colors ${live.isReserved ? "bg-silk-gray text-inkstone-gray" : "bg-glass-blue text-white btn-chinese"}`}
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        {live.isReserved ? "已预约" : "预约"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>)}
                    </div>
                </div>}
                {}
                {activeTab === "past" && <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pastLives.map((live, index) => <motion.div
                            key={live.id}
                            initial={{
                                opacity: 0,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{
                                delay: index * 0.1
                            }}
                            className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden hover:shadow-md transition-shadow">
                            <Link to={`/live/${live.id}`} className="block relative">
                                <div className="relative">
                                    <img src={live.coverUrl} alt={live.title} className="w-full h-48 object-cover" />
                                    <div
                                        className="absolute top-2 left-2 bg-bamboo-green text-white text-xs px-2 py-1 rounded-full flex items-center"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        <i className="fas fa-play mr-1"></i>回放
                                                              </div>
                                    <div
                                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-ink text-xs px-2 py-1 rounded-full flex items-center"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        <i className="fas fa-clock mr-1"></i> {formatDuration(live.duration)}
                                    </div>
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                        <h3
                                            className="text-white font-medium text-sm"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>
                                            {live.title}
                                        </h3>
                                        <p
                                            className="text-white/80 text-xs"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>
                                            {live.host}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <div className="p-3">
                                <p
                                    className="text-sm text-ink mb-3 line-clamp-2"
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>
                                    {live.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {live.tags.map((tag, tagIndex) => <span
                                        key={tagIndex}
                                        className="text-xs px-2 py-1 bg-silk-gray rounded-full text-inkstone-gray"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        {tag}
                                    </span>)}
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <span
                                            className="text-xs text-inkstone-gray flex items-center mr-3"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>
                                            <i className="fas fa-calendar-alt mr-1"></i> {live.time}
                                        </span>
                                        <span
                                            className="text-xs text-inkstone-gray flex items-center"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>
                                            <i className="fas fa-eye mr-1"></i> {live.views.toLocaleString()}
                                        </span>
                                    </div>
                                    <Link
                                        to={`/live/${live.id}`}
                                        className="px-4 py-1.5 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>观看回放
                                                              </Link>
                                </div>
                            </div>
                        </motion.div>)}
                    </div>
                    {}
                    <div className="text-center mt-6">
                        <button
                            className="px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors btn-chinese"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>加载更多
                                          </button>
                    </div>
                </div>}
            </main>
        </div>
    );
}