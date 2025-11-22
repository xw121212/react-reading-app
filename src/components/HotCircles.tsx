import { Link } from "react-router-dom";

export function HotCircles() {
    const hotCircles = [{
        id: 1,
        name: "推理小说圈",
        members: 12568,
        topics: 2342,
        icon: "fa-magnifying-glass"
    }, {
        id: 2,
        name: "诗歌精读圈",
        members: 8973,
        topics: 1876,
        icon: "fa-feather"
    }, {
        id: 3,
        name: "社科讨论圈",
        members: 15672,
        topics: 3456,
        icon: "fa-brain"
    }, {
        id: 4,
        name: "科幻爱好者圈",
        members: 9876,
        topics: 2103,
        icon: "fa-rocket"
    }];

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
                    <i className="fas fa-users text-bamboo-green mr-2"></i>热门圈子
                            </h2>
                <Link to="/community" className="text-sm text-glass-blue hover:underline">更多 <i className="fas fa-chevron-right text-xs ml-1"></i>
                </Link>
            </div>
            <div className="p-3">
                <div className="space-y-3">
                    {hotCircles.map(circle => <Link
                        key={circle.id}
                        to={`/community/${circle.id}`}
                        className="block p-3 rounded-lg hover:bg-silk-gray transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {}
                                <div
                                    className="w-10 h-10 rounded-full bg-bamboo-green/10 flex items-center justify-center text-bamboo-green border border-bamboo-green/20">
                                    <i className={`fas ${circle.icon}`}></i>
                                </div>
                                <div className="ml-3">
                                    <h3
                                        className="text-sm font-medium"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>{circle.name}</h3>
                                    <div className="flex items-center mt-1">
                                        <span
                                            className="text-xs text-inkstone-gray flex items-center"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>
                                            <i className="fas fa-user text-xs mr-1"></i> {circle.members.toLocaleString()}成员
                                                                  </span>
                                        <span className="mx-2 text-inkstone-gray">|</span>
                                        <span
                                            className="text-xs text-inkstone-gray"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>{circle.topics.toLocaleString()}话题</span>
                                    </div>
                                </div>
                            </div>
                            {}
                            <button
                                className="text-xs px-3 py-1 bg-glass-blue text-white rounded-full hover:bg-opacity-90 transition-colors btn-chinese">加入
                                                </button>
                        </div>
                    </Link>)}
                </div>
            </div>
        </div>
    );
}