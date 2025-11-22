import { useState } from "react";
import { Link } from "react-router-dom";

export function ReadingRanking() {
    const [activeType, setActiveType] = useState("weekly");

    const weeklyRanking = [{
        id: 1,
        title: "三体",
        author: "刘慈欣",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Science%20Fiction%20Book%20Cover%20Three-Body%20Problem&sign=2c3dd569615d42d4f637674ba2f9a492",
        readers: 12568
    }, {
        id: 2,
        title: "活着",
        author: "余华",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Chinese%20Literature%20Book%20Cover&sign=d28f58106ee60d3fcb1a39a1c99bf0d0",
        readers: 10873
    }, {
        id: 3,
        title: "人类简史",
        author: "尤瓦尔·赫拉利",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=History%20Book%20Cover%20Sapiens&sign=eeb87ae98a563b9841dea83a087f7db9",
        readers: 9654
    }, {
        id: 4,
        title: "被讨厌的勇气",
        author: "岸见一郎",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Self%20Help%20Book%20Cover&sign=a0b923cab11b1c386388175d6b6159d7",
        readers: 8765
    }, {
        id: 5,
        title: "解忧杂货店",
        author: "东野圭吾",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Japanese%20Novel%20Book%20Cover&sign=3382a5c4753bdc4baed58fda1d0a9690",
        readers: 7654
    }];

    const monthlyRanking = [{
        id: 6,
        title: "百年孤独",
        author: "加西亚·马尔克斯",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Classic%20Literature%20Book%20Cover%20One%20Hundred%20Years%20of%20Solitude&sign=0af9273248c3843f67868f44673c1fb9",
        readers: 24568
    }, {
        id: 7,
        title: "追风筝的人",
        author: "卡勒德·胡赛尼",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Novel%20Book%20Cover%20The%20Kite%20Runner&sign=2b9713fef99b879a16603b55fd8d47c0",
        readers: 22345
    }, {
        id: 8,
        title: "三体",
        author: "刘慈欣",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Science%20Fiction%20Book%20Cover%20Three-Body%20Problem&sign=2c3dd569615d42d4f637674ba2f9a492",
        readers: 21567
    }, {
        id: 9,
        title: "活着",
        author: "余华",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Chinese%20Literature%20Book%20Cover&sign=d28f58106ee60d3fcb1a39a1c99bf0d0",
        readers: 19876
    }, {
        id: 10,
        title: "人类简史",
        author: "尤瓦尔·赫拉利",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=History%20Book%20Cover%20Sapiens&sign=eeb87ae98a563b9841dea83a087f7db9",
        readers: 18765
    }];

    const currentRanking = activeType === "weekly" ? weeklyRanking : monthlyRanking;

    const getRankStyle = (index: number) => {
        if (index === 0)
            return "bg-crabapple-red text-white";

        if (index === 1)
            return "bg-[#E6A23C] text-white";

        if (index === 2)
            return "bg-[#67C23A] text-white";

        return "bg-silk-gray text-inkstone-gray";
    };

    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden chinese-pattern-border">
            <div className="p-4 border-b border-silk-gray">
                <h2
                    className="text-lg font-semibold flex items-center"
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>
                    <i className="fas fa-crown text-[#E6A23C] mr-2"></i>阅读排行榜
                            </h2>
                {}
                <div className="flex mt-3 bg-silk-gray rounded-lg p-1">
                    <button
                        className={`flex-1 py-1 text-xs rounded-md text-center ${activeType === "weekly" ? "bg-white shadow-sm text-ink" : "text-inkstone-gray"}`}
                        onClick={() => setActiveType("weekly")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>周榜
                                  </button>
                    <button
                        className={`flex-1 py-1 text-xs rounded-md text-center ${activeType === "monthly" ? "bg-white shadow-sm text-ink" : "text-inkstone-gray"}`}
                        onClick={() => setActiveType("monthly")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>月榜
                                  </button>
                </div>
            </div>
            {}
            <div className="p-3 ink-splash">
                <div className="space-y-3">
                    {currentRanking.map((book, index) => <Link
                        key={book.id}
                        to={`/book/${book.id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-silk-gray transition-colors">
                        {}
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getRankStyle(index)}`}>
                            {index + 1}
                        </div>
                        <div className="w-10 h-14 flex-shrink-0">
                            <img
                                src={book.coverUrl}
                                alt={book.title}
                                className="w-full h-full object-cover rounded shadow-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3
                                className="text-sm font-medium truncate"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>{book.title}</h3>
                            <p
                                className="text-xs text-inkstone-gray mt-1 truncate"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>作者：{book.author}</p>
                            <p
                                className="text-xs text-inkstone-gray mt-1 flex items-center"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>
                                <i className="fas fa-user text-xs mr-1"></i> {book.readers.toLocaleString()}人在读
                                                </p>
                        </div>
                    </Link>)}
                </div>
            </div>
        </div>
    );
}