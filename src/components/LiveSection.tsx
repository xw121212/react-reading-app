import { Link } from "react-router-dom";

export function LiveSection() {
    const ongoingLive = {
        id: 1,
        title: "《百年孤独》深度解析",
        host: "文学教授张明",
        viewers: 1243,
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Literature%20Book%20Discussion%20Live%20Stream&sign=6dcc0b119ef403eb1b7adb620d8741e3"
    };

    const upcomingLives = [{
        id: 2,
        title: "科幻小说创作分享会",
        host: "科幻作家李华",
        time: "今天 20:00"
    }, {
        id: 3,
        title: "诗歌鉴赏入门",
        host: "诗人王芳",
        time: "明天 19:30"
    }];

    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden chinese-pattern-border">
            <div
                className="p-4 border-b border-silk-gray flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center">
                    <i className="fas fa-video text-crabapple-red mr-2"></i>直播中心
                            </h2>
                <Link to="/live" className="text-sm text-glass-blue hover:underline">更多 <i className="fas fa-chevron-right text-xs ml-1"></i>
                </Link>
            </div>
            {}
      {}
            {ongoingLive && <Link to={`/live/${ongoingLive.id}`} className="block relative">
                <div className="p-3">
                    <div className="relative rounded-lg overflow-hidden chinese-corner-decoration">
                        <img
                            src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Chinese%20Style%20Literature%20Discussion%20Live%20Stream%20with%20Ink%20Painting%20Background&sign=3df94dd9d6ffe3a14c4029fb6fc96186"
                            alt={ongoingLive.title}
                            className="w-full h-40 object-cover" />
                        <div
                            className="absolute top-2 left-2 bg-crabapple-red text-white text-xs px-2 py-1 rounded-full flex items-center"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>
                            <i className="fas fa-circle text-[6px] mr-1 animate-pulse"></i>正在直播
                                          </div>
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <h3
                                className="text-white font-medium text-sm"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>{ongoingLive.title}</h3>
                            <p
                                className="text-white/80 text-xs"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>{ongoingLive.host}</p>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <span
                            className="text-xs text-inkstone-gray flex items-center"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>
                            <i className="fas fa-eye mr-1"></i> {ongoingLive.viewers}人观看
                                          </span>
                        <span
                            className="text-xs px-2 py-1 bg-glass-blue/10 text-glass-blue rounded-full btn-chinese"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>进入观看
                                          </span>
                    </div>
                </div>
            </Link>}
            {}
            <div className="p-3 border-t border-silk-gray bg-rice-paper/30">
                <h3
                    className="text-sm font-medium mb-2 flex items-center"
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>
                    <span className="w-1 h-4 bg-autumn-yellow inline-block mr-2"></span>直播预告
                            </h3>
                <div className="space-y-2">
                    {upcomingLives.map(live => <Link
                        key={live.id}
                        to={`/live/${live.id}`}
                        className="block p-2 rounded-lg hover:bg-silk-gray transition-colors">
                        <div className="flex items-start justify-between">
                            <div>
                                <h4
                                    className="text-sm font-medium"
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>{live.title}</h4>
                                <p
                                    className="text-xs text-inkstone-gray mt-1"
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>{live.host}</p>
                            </div>
                            <span
                                className="text-xs text-autumn-yellow whitespace-nowrap"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>{live.time}</span>
                        </div>
                    </Link>)}
                </div>
            </div>
        </div>
    );
}