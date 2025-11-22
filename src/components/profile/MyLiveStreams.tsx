import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

// 模拟预约的直播数据
const upcomingLives = [
  {
    id: 1,
    title: "科幻小说创作分享会",
    host: "科幻作家李华",
    time: "2025-11-25 20:00",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Science%20Fiction%20Writing%20Workshop%20Live&sign=2077deb4ca9ff7981181d188681505a3"
  },
  {
    id: 2,
    title: "诗歌鉴赏入门",
    host: "诗人王芳",
    time: "2025-11-28 19:30",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Poetry%20Appreciation%20Live%20Class&sign=dea5e1c69b26e5b8f4d020c89c6a4f2d"
  },
  {
    id: 3,
    title: "文学经典《红楼梦》解读",
    host: "文学教授张明",
    time: "2025-12-05 21:00",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Dream%20of%20the%20Red%20Chamber%20Literature%20Analysis&sign=51127efc40159795b85c0cca3eb4ae61"
  }
];

// 模拟参与过的直播数据
const pastLives = [
  {
    id: 4,
    title: "《百年孤独》深度解析",
    host: "文学教授张明",
    time: "2025-11-20 20:00",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Literature%20Book%20Discussion%20Live%20Stream&sign=6dcc0b119ef403eb1b7adb620d8741e3",
    duration: "120", // 分钟
    isRewatchable: true
  },
  {
    id: 5,
    title: "心理学与生活：如何提升幸福感",
    host: "心理学家刘芳",
    time: "2025-11-15 19:30",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Psychology%20Wellness%20Live%20Workshop&sign=288f80958f22b681002d7be87d387dcf",
    duration: "90", // 分钟
    isRewatchable: true
  },
  {
    id: 6,
    title: "推理小说创作技巧分享",
    host: "推理作家陈晨",
    time: "2025-11-10 20:30",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Mystery%20Novel%20Writing%20Tips%20Live&sign=eb100dc69a4550b627e43058d33f276e",
    duration: "105", // 分钟
    isRewatchable: true
  }
];

export function MyLiveStreams() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  // 取消预约
  const cancelReservation = (liveId: number) => {
    toast.success("已取消预约");
  };

  // 计算直播开始前的剩余时间
  const getTimeRemaining = (liveTime: string) => {
    const now = new Date();
    const eventDate = new Date(liveTime);
    const diffTime = eventDate.getTime() - now.getTime();
    
    if (diffTime <= 0) {
      return "即将开始";
    }
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days}天后`;
    } else if (hours > 0) {
      return `${hours}小时后`;
    } else {
      return `${minutes}分钟后`;
    }
  };

  return (
    <div className="space-y-6">
      {/* 直播统计 */}
      <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6 ink-splash">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-rice-paper rounded-lg text-center">
            <div 
              className="w-12 h-12 rounded-full bg-crabapple-red/10 flex items-center justify-center mx-auto mb-3"
            >
              <i className="fas fa-calendar-check text-crabapple-red text-xl"></i>
            </div>
            <h3 className="text-lg font-medium mb-1">我的预约</h3>
            <p className="text-2xl font-bold text-glass-blue">{upcomingLives.length}</p>
          </div>
          <div className="p-4 bg-rice-paper rounded-lg text-center">
            <div 
              className="w-12 h-12 rounded-full bg-glass-blue/10 flex items-center justify-center mx-auto mb-3"
            >
              <i className="fas fa-video text-glass-blue text-xl"></i>
            </div>
            <h3 className="text-lg font-medium mb-1">参与场次</h3>
            <p className="text-2xl font-bold text-glass-blue">{pastLives.length}</p>
          </div>
          <div className="p-4 bg-rice-paper rounded-lg text-center">
            <div 
              className="w-12 h-12 rounded-full bg-bamboo-green/10 flex items-center justify-center mx-auto mb-3"
            >
              <i className="fas fa-clock text-bamboo-green text-xl"></i>
            </div>
            <h3 className="text-lg font-medium mb-1">观看时长</h3>
            <p className="text-2xl font-bold text-glass-blue">
              {Math.round(pastLives.reduce((total, live) => total + parseInt(live.duration), 0) / 60)}小时
            </p>
          </div>
        </div>
      </div>

      {/* 直播列表标签页 */}
      <div className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden">
        <div className="flex border-b border-silk-gray">
          <button
            className={`py-3 px-6 text-sm font-medium border-b-2 ${activeTab === "upcoming" ? "text-glass-blue border-glass-blue" : "text-inkstone-gray border-transparent"}`}
            onClick={() => setActiveTab("upcoming")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            预约的直播
          </button>
          <button
            className={`py-3 px-6 text-sm font-medium border-b-2 ${activeTab === "past" ? "text-glass-blue border-glass-blue" : "text-inkstone-gray border-transparent"}`}
            onClick={() => setActiveTab("past")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            参与过的直播
          </button>
        </div>

        {/* 预约的直播 */}
        {activeTab === "upcoming" && (
          <div className="p-6">
            {upcomingLives.length === 0 ? (
              <div className="text-center py-10 text-inkstone-gray">
                <i className="fas fa-calendar-alt text-3xl mb-2"></i>
                <p 
                  className="text-sm"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  还没有预约任何直播
                </p>
                <Link 
                  to="/live"
                  className="inline-block mt-3 px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  浏览直播
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingLives.map((live, index) => (
                  <motion.div
                    key={live.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 relative">
                        <img
                          src={live.coverUrl}
                          alt={live.title}
                          className="w-full h-40 md:h-full object-cover"
                        />
                        <div 
                          className="absolute top-2 left-2 bg-crabapple-red text-white text-xs px-2 py-1 rounded-full flex items-center"
                          style={{ fontFamily: '"Noto Serif SC", serif' }}
                        >
                          <i className="far fa-clock mr-1"></i> 预约中
                        </div>
                        <div 
                          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-ink text-xs px-2 py-1 rounded-full"
                          style={{ fontFamily: '"Noto Serif SC", serif' }}
                        >
                          {getTimeRemaining(live.time)}
                        </div>
                      </div>
                      <div className="w-full md:w-2/3 p-4">
                        <h3 
                          className="font-medium text-base mb-1"
                          style={{ fontFamily: '"Noto Serif SC", serif' }}
                        >
                          {live.title}
                        </h3>
                        <p 
                          className="text-sm text-inkstone-gray mb-3"
                          style={{ fontFamily: '"Noto Serif SC", serif' }}
                        >
                          主讲人：{live.host}
                        </p>
                        <p 
                          className="text-sm text-glass-blue mb-4 flex items-center"
                          style={{ fontFamily: '"Noto Serif SC", serif' }}
                        >
                          <i className="far fa-calendar-alt mr-1"></i> {live.time}
                        </p>
                        <div className="flex justify-between items-center">
                          <Link 
                            to={`/live/${live.id}`}
                            className="px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
                            style={{ fontFamily: '"Noto Serif SC", serif' }}
                          >
                            进入直播
                          </Link>
                          <button
                            onClick={() => cancelReservation(live.id)}
                            className="px-3 py-1 border border-silk-gray text-inkstone-gray rounded-lg text-sm hover:bg-silk-gray transition-colors"
                          >
                            取消预约
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 参与过的直播 */}
        {activeTab === "past" && (
          <div className="p-6">
            {pastLives.length === 0 ? (
              <div className="text-center py-10 text-inkstone-gray">
                <i className="fas fa-history text-3xl mb-2"></i>
                <p 
                  className="text-sm"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  还没有参与过任何直播
                </p>
                <Link 
                  to="/live"
                  className="inline-block mt-3 px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  浏览直播
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {pastLives.map((live, index) => (
                  <motion.div
                    key={live.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 relative">
                        <img
                          src={live.coverUrl}
                          alt={live.title}
                          className="w-full h-40 md:h-full object-cover"
                        />
                        <div 
                          className="absolute top-2 left-2 bg-bamboo-green text-white text-xs px-2 py-1 rounded-full flex items-center"
                          style={{ fontFamily: '"Noto Serif SC", serif' }}
                        >
                          <i className="far fa-check-circle mr-1"></i> 已结束
                        </div>
                        <div 
                          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-ink text-xs px-2 py-1 rounded-full"
                          style={{ fontFamily: '"Noto Serif SC", serif' }}
                        >
                          {Math.round(parseInt(live.duration) / 60)}小时{parseInt(live.duration) % 60}分钟
                        </div>
                      </div>
                      <div className="w-full md:w-2/3 p-4">
                        <h3 
                          className="font-medium text-base mb-1"
                          style={{ fontFamily: '"Noto Serif SC", serif' }}
                        >
                          {live.title}
                        </h3>
                        <p 
                          className="text-sm text-inkstone-gray mb-3"
                          style={{ fontFamily: '"Noto Serif SC", serif' }}
                        >
                          主讲人：{live.host}
                        </p>
                        <p 
                          className="text-sm text-inkstone-gray mb-4 flex items-center"
                          style={{ fontFamily: '"Noto Serif SC", serif' }}
                        >
                          <i className="far fa-calendar-check mr-1"></i> {live.time}
                        </p>
                        <div className="flex justify-between items-center">
                          {live.isRewatchable ? (
                            <Link 
                              to={`/live/${live.id}`}
                              className="px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
                              style={{ fontFamily: '"Noto Serif SC", serif' }}
                            >
                              观看回放
                            </Link>
                          ) : (
                            <span 
                              className="text-sm text-inkstone-gray"
                              style={{ fontFamily: '"Noto Serif SC", serif' }}
                            >
                              暂无回放
                            </span>
                          )}
                          <div className="flex gap-2">
                            <button className="text-inkstone-gray hover:text-glass-blue transition-colors">
                              <i className="far fa-thumbs-up"></i>
                            </button>
                            <button className="text-inkstone-gray hover:text-glass-blue transition-colors">
                              <i className="far fa-bookmark"></i>
                            </button>
                            <button className="text-inkstone-gray hover:text-glass-blue transition-colors">
                              <i className="fas fa-share-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            <div className="text-center mt-6">
              <button 
                className="px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors btn-chinese"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                加载更多
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}