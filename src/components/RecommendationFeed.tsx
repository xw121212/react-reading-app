import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ReadingChallenge } from "./ReadingChallenge";

export function RecommendationFeed() {
    const [activeTab, setActiveTab] = useState("recommended");

    const recommendedContent = [{
        id: 1,
        type: "book",
        title: "人类简史",
        author: "尤瓦尔·赫拉利",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=History%20Book%20Cover%20Sapiens&sign=eeb87ae98a563b9841dea83a087f7db9",
        rating: 4.8,
        reviews: 12568,
        tags: ["历史", "哲学", "社科"]
    }, {
        id: 2,
        type: "post",
        title: "如何培养良好的阅读习惯？分享我的十年阅读心得",
        author: "书香满屋",
        authorAvatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Book%20Lover&sign=049878cd026320bf183335b6562ef447",
        content: "阅读是一种能够伴随我们一生的美好习惯。在这篇文章中，我将分享自己十年来培养的阅读习惯和技巧，希望能够帮助更多的人爱上阅读...",
        likes: 872,
        comments: 135,

        images: [
            "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Reading%20Corner%20Cozy%20Book%20Nook&sign=fdf2f1939c478d5b949c4755c5d7870b"
        ]
    }, {
        id: 3,
        type: "mood",
        content: "今天读完了《追风筝的人》，内心久久不能平静。有些错误，需要用一生去弥补。",
        author: "文学爱好者",
        authorAvatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Literature%20Lover&sign=7d4957ba875a438c96549fb404bf18a7",
        mood: "思考",
        likes: 345,
        comments: 56
    }, {
        id: 4,
        type: "book",
        title: "被讨厌的勇气",
        author: "岸见一郎",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Self%20Help%20Book%20Cover&sign=a0b923cab11b1c386388175d6b6159d7",
        rating: 4.7,
        reviews: 9873,
        tags: ["心理", "哲学", "自我成长"]
    }];

    const trendingContent = [{
        id: 5,
        type: "book",
        title: "三体",
        author: "刘慈欣",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Science%20Fiction%20Book%20Cover%20Three-Body%20Problem&sign=2c3dd569615d42d4f637674ba2f9a492",
        rating: 4.9,
        reviews: 28976,
        tags: ["科幻", "小说"]
    }, {
        id: 6,
        type: "post",
        title: "《三体》中的宇宙观与哲学思考",
        author: "科幻迷",
        authorAvatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Sci-Fi%20Enthusiast&sign=fe0a752ea3749cc13afab31461d2f1ac",
        content: "《三体》不仅仅是一部科幻小说，更是一部探讨宇宙观、人性和文明发展的哲学著作。本文将从多个角度解析《三体》中的深层含义...",
        likes: 2154,
        comments: 342,

        images: [
            "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Space%20Galaxy%20Science%20Fiction%20Illustration&sign=e6249b4553c90b6b04bc02417da48f57"
        ]
    }];

    const currentContent = activeTab === "recommended" ? recommendedContent : trendingContent;

    const renderContentCard = (item: any) => {
        switch (item.type) {
        case "book":
            return (
                <div
                    className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-silk-gray hover:shadow-md transition-shadow">
                    <div className="w-20 h-28 flex-shrink-0 relative">
                        <img
                            src={item.coverUrl}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg shadow-sm" />
                    </div>
                    <div className="flex-1">
                        <h3
                            className="font-medium text-base"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>{item.title}</h3>
                        <p
                            className="text-sm text-inkstone-gray mt-1"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>作者：{item.author}</p>
                        <div className="flex items-center mt-2">
                            <div className="flex items-center">
                                <i className="fas fa-star text-autumn-yellow text-xs"></i>
                                <span className="text-sm font-medium ml-1">{item.rating}</span>
                            </div>
                            <span className="mx-2 text-inkstone-gray">|</span>
                            <span
                                className="text-sm text-inkstone-gray"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>{item.reviews}人评价</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {item.tags.map((tag: string, index: number) => <span
                                key={index}
                                className="text-xs px-2 py-1 bg-silk-gray rounded-full text-inkstone-gray"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>
                                {tag}
                            </span>)}
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button
                                className="flex-1 py-2 bg-glass-blue text-white text-sm font-medium rounded-lg hover:bg-opacity-90 transition-colors">立即阅读
                                                </button>
                            <button
                                className="px-3 py-2 border border-silk-gray rounded-lg text-sm hover:bg-silk-gray transition-colors">
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            );
        case "post":
            return (
                <div
                    className="p-4 bg-white rounded-xl shadow-sm border border-silk-gray hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                        <img
                            src={item.authorAvatar}
                            alt={item.author}
                            className="w-8 h-8 rounded-full object-cover" />
                        <span
                            className="font-medium text-sm"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>{item.author}</span>
                    </div>
                    <h3 className="font-medium text-base mb-2">{item.title}</h3>
                    <p
                        className="text-sm text-ink mb-3 line-clamp-3"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>{item.content}</p>
                    {item.images && item.images.length > 0 && <div className="rounded-lg overflow-hidden mb-3">
                        <img
                            src={item.images[0]}
                            alt="Post image"
                            className="w-full h-48 object-cover" />
                    </div>}
                    <div
                        className="flex justify-between items-center pt-3 border-t border-silk-gray">
                        <div className="flex gap-4">
                            <button
                                className="flex items-center gap-1 text-sm text-inkstone-gray hover:text-glass-blue transition-colors">
                                <i className="far fa-thumbs-up"></i>
                                <span>{item.likes}</span>
                            </button>
                            <button
                                className="flex items-center gap-1 text-sm text-inkstone-gray hover:text-glass-blue transition-colors">
                                <i className="far fa-comment"></i>
                                <span>{item.comments}</span>
                            </button>
                        </div>
                        <button
                            className="text-sm text-inkstone-gray hover:text-glass-blue transition-colors">
                            <i className="far fa-bookmark"></i>
                        </button>
                    </div>
                </div>
            );
        case "mood":
            const getMoodStyles = () => {
                switch (item.mood) {
                case "共鸣":
                    return "bg-crabapple-red/10 text-crabapple-red";
                case "思考":
                    return "bg-glass-blue/10 text-glass-blue";
                case "有趣":
                    return "bg-bamboo-green/10 text-bamboo-green";
                case "伤感":
                    return "bg-autumn-yellow/10 text-autumn-yellow";
                default:
                    return "bg-silk-gray text-inkstone-gray";
                }
            };

            return (
                <motion.div
                    className="p-4 bg-white rounded-xl shadow-sm border border-silk-gray hover:shadow-md transition-shadow"
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.3
                    }}>
                    <div className="flex items-center gap-2 mb-3">
                        <img
                            src={item.authorAvatar}
                            alt={item.author}
                            className="w-8 h-8 rounded-full object-cover" />
                        <span
                            className="font-medium text-sm"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>{item.author}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getMoodStyles()}`}>
                            {item.mood}
                        </span>
                    </div>
                    <p
                        className="text-sm text-ink mb-3"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>{item.content}</p>
                    <div
                        className="flex justify-between items-center pt-3 border-t border-silk-gray">
                        <div className="flex gap-4">
                            <button
                                className="flex items-center gap-1 text-sm text-inkstone-gray hover:text-crabapple-red transition-colors">
                                <i className="far fa-heart"></i>
                                <span>{item.likes}</span>
                            </button>
                            <button
                                className="flex items-center gap-1 text-sm text-inkstone-gray hover:text-glass-blue transition-colors">
                                <i className="far fa-comment"></i>
                                <span>{item.comments}</span>
                            </button>
                        </div>
                        <button
                            className="text-sm text-inkstone-gray hover:text-glass-blue transition-colors">
                            <i className="fas fa-share-alt"></i>
                        </button>
                    </div>
                </motion.div>
            );
        default:
            return null;
        }
    };

    return (
        <div className="h-full flex flex-col ink-splash">
            {}
            <div
                className="mb-6 relative rounded-xl overflow-hidden shadow-sm chinese-pattern-border">
                <div className="relative">
                    <img
                        src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Chinese%20Style%20Literature%20Live%20Stream%20Banner%20with%20Ink%20Painting%20Style&sign=8fa14f4805814d4900788702a90646f1"
                        alt="Live stream banner"
                        className="w-full h-48 object-cover" />
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                        <div className="p-6 text-white">
                            <div
                                className="inline-flex items-center bg-crabapple-red text-white text-xs px-2 py-1 rounded-full mb-3">
                                <i className="fas fa-circle text-[6px] mr-1 animate-pulse"></i>即将开始
                                              </div>
                            <h2
                                className="text-xl font-bold mb-2"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>文学大家谈：如何培养深度阅读能力</h2>
                            <p
                                className="text-sm text-white/80 mb-3"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>今晚 20:00，著名作家李敬泽与你不见不散</p>
                            <button
                                className="px-4 py-2 bg-white text-glass-blue text-sm font-medium rounded-lg hover:bg-opacity-90 transition-colors btn-chinese"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif",
                                    backgroundColor: "#FDE68A"
                                }}>立即预约
                                              </button>
                        </div>
                    </div>
                    {}
                    <div className="absolute bottom-3 right-3 flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                        <span className="w-2 h-2 rounded-full bg-white/50"></span>
                        <span className="w-2 h-2 rounded-full bg-white/50"></span>
                    </div>
                </div>
            </div>
            {}
            {/* 共读挑战 */}
            <ReadingChallenge />
            {}
            <div className="mb-4 border-b border-silk-gray">
                <div className="flex">
                    <button
                        className={`py-3 px-4 text-sm font-medium relative ${activeTab === "recommended" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("recommended")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>为你推荐
                                    {activeTab === "recommended" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                    <button
                        className={`py-3 px-4 text-sm font-medium relative ${activeTab === "trending" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("trending")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>热门内容
                                    {activeTab === "trending" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                </div>
            </div>
            {}
            <div className="flex-1 overflow-y-auto space-y-4 pb-6">
                {currentContent.map(item => <div key={item.id}>
                    {renderContentCard(item)}
                </div>)}
                {}
                <div className="text-center pt-4">
                    <button
                        className="px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors btn-chinese"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif",
                            backgroundColor: "#FDE68A"
                        }}>加载更多
                                  </button>
                </div>
            </div>
        </div>
    );
}