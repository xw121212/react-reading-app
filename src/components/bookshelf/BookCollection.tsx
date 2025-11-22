import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Book {
    id: number;
    title: string;
    author: string;
    coverUrl: string;
    progress?: number;
    currentPage?: number;
    totalPages?: number;
}

export function BookCollection() {
    const [activeFilter, setActiveFilter] = useState<"reading" | "completed" | "wantToRead">("reading");

    const readingBooks: Book[] = [{
        id: 1,
        title: "活着",
        author: "余华",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Chinese%20Literature%20Book%20Cover&sign=d28f58106ee60d3fcb1a39a1c99bf0d0",
        progress: 65,
        currentPage: 187,
        totalPages: 288
    }, {
        id: 2,
        title: "解忧杂货店",
        author: "东野圭吾",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Japanese%20Novel%20Book%20Cover&sign=3382a5c4753bdc4baed58fda1d0a9690",
        progress: 32,
        currentPage: 98,
        totalPages: 306
    }, {
        id: 3,
        title: "三体",
        author: "刘慈欣",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Science%20Fiction%20Book%20Cover%20Three-Body%20Problem&sign=2c3dd569615d42d4f637674ba2f9a492",
        progress: 15,
        currentPage: 67,
        totalPages: 456
    }];

    const completedBooks: Book[] = [{
        id: 4,
        title: "人类简史",
        author: "尤瓦尔·赫拉利",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=History%20Book%20Cover%20Sapiens&sign=eeb87ae98a563b9841dea83a087f7db9"
    }, {
        id: 5,
        title: "被讨厌的勇气",
        author: "岸见一郎",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Self%20Help%20Book%20Cover&sign=a0b923cab11b1c386388175d6b6159d7"
    }];

    const wantToReadBooks: Book[] = [{
        id: 6,
        title: "百年孤独",
        author: "加西亚·马尔克斯",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Classic%20Literature%20Book%20Cover%20One%20Hundred%20Years%20of%20Solitude&sign=0af9273248c3843f67868f44673c1fb9"
    }, {
        id: 7,
        title: "追风筝的人",
        author: "卡勒德·胡赛尼",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Novel%20Book%20Cover%20The%20Kite%20Runner&sign=2b9713fef99b879a16603b55fd8d47c0"
    }, {
        id: 8,
        title: "红楼梦",
        author: "曹雪芹",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Chinese%20Classic%20Literature%20Dream%20of%20the%20Red%20Chamber&sign=aaeb312ca804b9df52de482fc290e770"
    }];

    const currentBooks = activeFilter === "reading" ? readingBooks : activeFilter === "completed" ? completedBooks : wantToReadBooks;

    const renderBookCard = (book: Book, index: number) => {
        return (
            <motion.div
                key={book.id}
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
                className="relative">
                <Link to={`/read/${book.id}`} className="block group">
                    <div className="w-32 h-44 flex-shrink-0 mx-auto chinese-corner-decoration">
                        <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-full h-full object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow" />
                        {}
                        {activeFilter === "reading" && book.progress !== undefined && <div
                            className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                            <div className="h-1 w-full bg-white/30 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-glass-blue rounded-full"
                                    style={{
                                        width: `${book.progress}%`
                                    }}></div>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-white text-xs">{book.currentPage}/{book.totalPages}</span>
                                <span className="text-white text-xs">{book.progress}%</span>
                            </div>
                        </div>}
                        {}
                        {activeFilter === "completed" && <div
                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-bamboo-green flex items-center justify-center">
                            <i className="fas fa-check text-white"></i>
                        </div>}
                        {}
                        {activeFilter === "wantToRead" && <div
                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-autumn-yellow flex items-center justify-center">
                            <i className="fas fa-plus text-white"></i>
                        </div>}
                    </div>
                    <div className="mt-2 text-center">
                        <h3
                            className="text-sm font-medium truncate max-w-32 mx-auto"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>{book.title}</h3>
                        <p
                            className="text-xs text-inkstone-gray truncate max-w-32 mx-auto"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>{book.author}</p>
                    </div>
                </Link>
                {}
                <div
                    className="absolute -right-4 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                        <i className="fas fa-ellipsis-v text-inkstone-gray"></i>
                    </button>
                </div>
            </motion.div>
        );
    };

    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden p-6 ink-splash">
            {}
            <div className="flex mb-6 bg-silk-gray/50 rounded-lg p-1 inline-flex">
                <button
                    className={`px-4 py-2 rounded-md text-sm font-medium ${activeFilter === "reading" ? "bg-white shadow-sm text-ink" : "text-inkstone-gray"}`}
                    onClick={() => setActiveFilter("reading")}
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>正在阅读
                                                </button>
                <button
                    className={`px-4 py-2 rounded-md text-sm font-medium ${activeFilter === "completed" ? "bg-white shadow-sm text-ink" : "text-inkstone-gray"}`}
                    onClick={() => setActiveFilter("completed")}
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>已读完
                                                </button>
                <button
                    className={`px-4 py-2 rounded-md text-sm font-medium ${activeFilter === "wantToRead" ? "bg-white shadow-sm text-ink" : "text-inkstone-gray"}`}
                    onClick={() => setActiveFilter("wantToRead")}
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>想读清单
                                                </button>
            </div>
            {}
            <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                style={{
                    backgroundImage: "url(https://space-static.coze.site/coze_space/7574875098542162219/upload/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20251121042319_888x1214.jpg?sign=1766262229-3983d11001-0-eccabe9a2011e7370e3599e0017cb6bd4b3133cb9a5885e42a43e38ff488c215)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 50%"
                }}>
                {currentBooks.map((book, index) => renderBookCard(book, index))}
                {}
                <motion.div
                    whileHover={{
                        scale: 1.05
                    }}
                    whileTap={{
                        scale: 0.95
                    }}>
                    <button
                        className="w-32 h-44 mx-auto flex flex-col items-center justify-center border-2 border-dashed border-inkstone-gray/30 rounded-lg hover:border-glass-blue hover:bg-glass-blue/5 transition-colors">
                        <i className="fas fa-plus text-inkstone-gray text-xl mb-2"></i>
                        <span
                            className="text-sm text-inkstone-gray"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>添加新书</span>
                    </button>
                </motion.div>
            </div>
            {}
            <div
                className="mt-8 pt-4 border-t border-silk-gray flex justify-between items-center">
                <div
                    className="text-sm text-inkstone-gray"
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>共 {currentBooks.length}本书籍
                                                </div>
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1.5 border border-silk-gray rounded-full text-xs text-inkstone-gray hover:bg-silk-gray transition-colors"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>
                        <i className="fas fa-th-large mr-1"></i>网格视图
                                                          </button>
                    <button
                        className="px-3 py-1.5 border border-silk-gray rounded-full text-xs text-inkstone-gray hover:bg-silk-gray transition-colors"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>
                        <i className="fas fa-list mr-1"></i>列表视图
                                                          </button>
                </div>
            </div>
        </div>
    );
}