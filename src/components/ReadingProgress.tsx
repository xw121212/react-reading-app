import { Link } from "react-router-dom";

export function ReadingProgress() {
    const recentBooks = [{
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
    }];

    const readingStats = {
        totalBooks: 24,
        readingDays: 128,
        totalHours: 436
    };

    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden chinese-pattern-border">
            <div
                className="p-4 border-b border-silk-gray flex justify-between items-center">
                <h2
                    className="text-lg font-semibold flex items-center"
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>
                    <i className="fas fa-book-open text-glass-blue mr-2"></i>阅读进度
                            </h2>
                <Link to="/bookshelf" className="text-sm text-glass-blue hover:underline">书架 <i className="fas fa-chevron-right text-xs ml-1"></i>
                </Link>
            </div>
            {}
            <div className="p-3">
                <h3 className="text-sm font-medium mb-3 flex items-center">
                    <span className="w-1 h-4 bg-glass-blue inline-block mr-2"></span>最近阅读
                            </h3>
                <div className="space-y-4">
                    {recentBooks.map(book => <Link
                        key={book.id}
                        to={`/read/${book.id}`}
                        className="flex items-center gap-3 group">
                        <div className="w-16 h-20 flex-shrink-0 relative chinese-corner-decoration">
                            <img
                                src={book.coverUrl}
                                alt={book.title}
                                className="w-full h-full object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4
                                className="text-sm font-medium truncate"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>{book.title}</h4>
                            <p
                                className="text-xs text-inkstone-gray mt-1"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>{book.author}</p>
                            <div className="mt-2">
                                <div className="h-1.5 w-full bg-silk-gray rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-glass-blue to-glass-blue/70 rounded-full"
                                        style={{
                                            width: `${book.progress}%`
                                        }}></div>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="text-xs text-inkstone-gray">{book.currentPage}/ {book.totalPages}页</span>
                                    <span className="text-xs text-glass-blue font-medium">{book.progress}%</span>
                                </div>
                            </div>
                        </div>
                    </Link>)}
                </div>
            </div>
            {}
            <div className="p-3 border-t border-silk-gray bg-rice-paper/30">
                <div className="grid grid-cols-3 gap-2">
                    <div className="text-center py-2 bg-white rounded-lg shadow-sm">
                        <p className="text-lg font-semibold text-glass-blue">{readingStats.totalBooks}</p>
                        <p
                            className="text-xs text-inkstone-gray"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>已读书籍</p>
                    </div>
                    <div className="text-center py-2 bg-white rounded-lg shadow-sm">
                        <p className="text-lg font-semibold text-glass-blue">{readingStats.readingDays}</p>
                        <p
                            className="text-xs text-inkstone-gray"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>阅读天数</p>
                    </div>
                    <div className="text-center py-2 bg-white rounded-lg shadow-sm">
                        <p className="text-lg font-semibold text-glass-blue">{readingStats.totalHours}</p>
                        <p
                            className="text-xs text-inkstone-gray"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>阅读时长</p>
                    </div>
                </div>
            </div>
        </div>
    );
}