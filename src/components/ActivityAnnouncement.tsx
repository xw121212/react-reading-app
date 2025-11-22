import { Link } from "react-router-dom";

export function ActivityAnnouncement() {
    const activities = [{
        id: 1,
        title: "7天阅读挑战",
        description: "连续阅读7天，赢取精美图书",
        startTime: "2025-11-25",
        endTime: "2025-12-01",
        imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Reading%20Challenge%20Activity%20Banner&sign=2ef8eadf30f0cbec1fe09a6d23f4bbf8"
    }, {
        id: 2,
        title: "读书分享会",
        description: "每月线下读书交流会，分享你的阅读心得",
        startTime: "2025-12-10",
        endTime: "2025-12-10",
        imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Book%20Club%20Meeting%20Event&sign=76b2f2e0a1c2be1d46dc530c8606425a"
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
                    <i className="fas fa-bullhorn text-autumn-yellow mr-2"></i>活动公告
                            </h2>
                <Link
                    to="/activities"
                    className="text-sm text-glass-blue hover:underline"
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>全部 <i className="fas fa-chevron-right text-xs ml-1"></i>
                </Link>
            </div>
            <div className="p-3">
                <div className="space-y-3">
                    {activities.map(activity => <Link
                        key={activity.id}
                        to={`/activity/${activity.id}`}
                        className="block rounded-lg overflow-hidden hover:shadow-md transition-shadow chinese-corner-decoration">
                        <div className="relative">
                            <img
                                src={activity.imageUrl}
                                alt={activity.title}
                                className="w-full h-32 object-cover" />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                                <h3
                                    className="text-white font-medium text-sm"
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>{activity.title}</h3>
                                <p
                                    className="text-white/80 text-xs mt-1"
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>{activity.description}</p>
                            </div>
                        </div>
                        <div className="p-2 border border-t-0 border-silk-gray bg-rice-paper/30">
                            <p className="text-xs text-inkstone-gray flex items-center justify-between">
                                <span
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>
                                    <i className="far fa-calendar-alt mr-1"></i>
                                    {activity.startTime === activity.endTime ? activity.startTime : `${activity.startTime} - ${activity.endTime}`}
                                </span>
                                <span
                                    className="text-autumn-yellow btn-chinese inline-block px-2 py-0.5 rounded-full"
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>立即报名</span>
                            </p>
                        </div>
                    </Link>)}
                </div>
            </div>
        </div>
    );
}