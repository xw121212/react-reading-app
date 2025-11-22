import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// 模拟圈子数据
const circles = [
  {
    id: 1,
    name: "推理小说圈",
    description: "一起探讨推理小说的魅力，分享你的推理心得",
    members: 12568,
    topics: 2342,
    icon: "fa-magnifying-glass",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Mystery%20Novel%20Circle%20Background&sign=0d4ab8d0be0ff42a09c7676f72246f07"
  },
  {
    id: 2,
    name: "诗歌精读圈",
    description: "欣赏经典诗歌，感受文字之美，分享创作灵感",
    members: 8973,
    topics: 1876,
    icon: "fa-feather",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Poetry%20Reading%20Circle%20Background&sign=6e0b25b04e9c6efddc6e152628a58cb7"
  },
  {
    id: 3,
    name: "社科讨论圈",
    description: "探讨社会科学的各个领域，拓宽知识面",
    members: 15672,
    topics: 3456,
    icon: "fa-brain",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Social%20Science%20Discussion%20Circle&sign=38e6ac34349789887faf0a4aa1ac4f63"
  },
  {
    id: 4,
    name: "科幻爱好者圈",
    description: "探索宇宙奥秘，讨论科幻作品，畅想未来科技",
    members: 9876,
    topics: 2103,
    icon: "fa-rocket",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Science%20Fiction%20Lovers%20Circle&sign=cff3ca11dd9fea28dd0bf060c8236e32"
  },
  {
    id: 5,
    name: "历史研读圈",
    description: "回顾历史，以史为鉴，探讨历史事件的深层次意义",
    members: 7890,
    topics: 1678,
    icon: "fa-book-open",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=History%20Study%20Circle&sign=29255703fc09aee98fc383e52778bd3f"
  },
  {
    id: 6,
    name: "哲学思考圈",
    description: "思考人生哲理，探讨存在的意义，寻找内心的平静",
    members: 6543,
    topics: 1234,
    icon: "fa-balance-scale",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Philosophy%20Thinking%20Circle&sign=3bc3be47431bac6cc36dec72b99dbc98"
  }
];

// 模拟最新动态数据
const latestActivities = [
  {
    id: 1,
    type: "post",
    user: {
      name: "书香满屋",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Book%20Lover&sign=049878cd026320bf183335b6562ef447"
    },
    circle: "推理小说圈",
    content: "最近读完了《解忧杂货店》，东野圭吾的作品总是能带给我惊喜，大家有什么推荐的推理小说吗？",
    time: "2小时前",
    likes: 45,
    comments: 12
  },
  {
    id: 2,
    type: "live",
    user: {
      name: "文学教授张明",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Professor%20Avatar%20Male%20Literature&sign=504fe243e32ea0b706248fefeee0ac27"
    },
    circle: "诗歌精读圈",
    content: "《百年孤独》深度解析直播即将开始，欢迎大家参与讨论！",
    time: "5小时前",
    participants: 128,
    isLive: true
  },
  {
    id: 3,
    type: "comment",
    user: {
      name: "文学爱好者",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Literature%20Lover&sign=7d4957ba875a438c96549fb404bf18a7"
    },
    circle: "社科讨论圈",
    content: "同意你的观点，人类简史确实改变了我对历史的看法",
    targetPost: "《人类简史》读后感：重新审视人类的发展历程",
    time: "昨天",
    likes: 23
  }
];

// 模拟热门话题数据
const trendingTopics = [
  { id: 1, name: "#百年孤独读后感#", posts: 568 },
  { id: 2, name: "#科幻小说推荐#", posts: 432 },
  { id: 3, name: "#诗歌创作技巧#", posts: 321 },
  { id: 4, name: "#阅读习惯养成#", posts: 287 },
  { id: 5, name: "#历史人物评价#", posts: 213 }
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"discover" | "joined" | "recommended">("discover");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-rice-paper text-ink flex flex-col">
       {/* 顶部信息栏 */}
      <div className="bg-white border-b border-silk-gray p-4 sticky top-16 z-10 ink-splash">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-full hover:bg-silk-gray transition-colors mr-3">
              <i className="fas fa-arrow-left"></i>
            </button>
            <h1 
              className="text-2xl font-bold text-glass-blue flex items-center"
              style={{ fontFamily: '"Noto Serif SC", serif' }}
            >
              <i className="fas fa-users mr-2"></i>社区中心
            </h1>
          </div>
          <div className="flex gap-2">
            <button 
              className="px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
              style={{ fontFamily: '"Noto Serif SC", serif' }}
            >
              <i className="fas fa-plus mr-1"></i>创建圈子
            </button>
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="bg-white border-b border-silk-gray sticky top-[7.5rem] z-10">
        <div className="container mx-auto flex overflow-x-auto hide-scrollbar">
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "discover" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("discover")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            发现圈子
            {activeTab === "discover" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "joined" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("joined")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            我的圈子
            {activeTab === "joined" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "recommended" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("recommended")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            为你推荐
            {activeTab === "recommended" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
        </div>
      </div>

      {/* 主内容区域 */}
      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-12 gap-6">
          {/* 左侧 - 圈子列表 */}
          <div className="col-span-12 md:col-span-8">
            <div className="mb-6">
              <h2 
                className="text-xl font-bold mb-4 flex items-center"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                <span className="w-3 h-6 bg-glass-blue inline-block mr-2"></span>热门圈子
              </h2>
              
              {/* 精选圈子横幅 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {circles.slice(0, 2).map((circle) => (
                  <motion.div
                    key={circle.id}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="rounded-xl overflow-hidden shadow-sm border border-silk-gray relative group"
                  >
                    <Link to={`/community/${circle.id}`} className="block">
                      <div className="h-40 relative">
                        <img 
                          src={circle.coverUrl} 
                          alt={circle.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                          <h3 
                            className="text-white font-bold text-lg"
                            style={{ fontFamily: '"Noto Serif SC", serif' }}
                          >
                            {circle.name}
                          </h3>
                          <p className="text-white/80 text-sm line-clamp-2">{circle.description}</p>
                        </div>
                      </div>
                      <div className="p-3 bg-white border-t border-silk-gray">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span 
                              className="text-xs text-inkstone-gray flex items-center"
                              style={{ fontFamily: '"Noto Serif SC", serif' }}
                            >
                              <i className="fas fa-user text-xs mr-1"></i> {circle.members.toLocaleString()}成员
                            </span>
                            <span 
                              className="text-xs text-inkstone-gray"
                              style={{ fontFamily: '"Noto Serif SC", serif' }}
                            >{circle.topics.toLocaleString()}话题</span>
                          </div>
                          <button 
                            className="text-xs px-3 py-1 bg-glass-blue/10 text-glass-blue rounded-full hover:bg-glass-blue/20 transition-colors btn-chinese"
                            style={{ fontFamily: '"Noto Serif SC", serif' }}
                          >
                            加入
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* 其他圈子列表 */}
              <div className="space-y-3">
                {circles.slice(2).map((circle, index) => (
                  <motion.div
                    key={circle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/community/${circle.id}`}
                      className="block p-4 rounded-lg hover:bg-silk-gray transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="w-12 h-12 rounded-full bg-bamboo-green/10 flex items-center justify-center text-bamboo-green border border-bamboo-green/20"
                          >
                            <i className={`fas ${circle.icon}`}></i>
                          </div>
                          <div className="ml-3">
                            <h3 
                              className="text-sm font-medium"
                              style={{ fontFamily: '"Noto Serif SC", serif' }}
                            >
                              {circle.name}
                            </h3>
                            <p className="text-xs text-inkstone-gray mt-1 line-clamp-1">{circle.description}</p>
                            <div className="flex items-center mt-1">
                              <span 
                                className="text-xs text-inkstone-gray flex items-center"
                                style={{ fontFamily: '"Noto Serif SC", serif' }}
                              >
                                <i className="fas fa-user text-xs mr-1"></i> {circle.members.toLocaleString()}成员
                              </span>
                              <span className="mx-2 text-inkstone-gray">|</span>
                              <span 
                                className="text-xs text-inkstone-gray"
                                style={{ fontFamily: '"Noto Serif SC", serif' }}
                              >{circle.topics.toLocaleString()}话题</span>
                            </div>
                          </div>
                        </div>
                        <button
                          className="text-xs px-3 py-1 bg-glass-blue/10 text-glass-blue rounded-full hover:bg-glass-blue/20 transition-colors btn-chinese"
                          style={{ fontFamily: '"Noto Serif SC", serif' }}
                        >
                          加入
                        </button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 右侧 - 最新动态和热门话题 */}
          <div className="col-span-12 md:col-span-4">
            {/* 最新动态 */}
            <div 
              className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden mb-6 ink-splash"
            >
              <div className="p-4 border-b border-silk-gray">
                <h2 
                  className="text-lg font-semibold flex items-center"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  <i className="fas fa-bell text-crabapple-red mr-2"></i>最新动态
                </h2>
              </div>
              <div className="p-3">
                <div className="space-y-4">
                  {latestActivities.map((activity) => (
                    <div key={activity.id} className="pb-4 border-b border-silk-gray last:border-0 last:pb-0">
                      <div className="flex items-start">
                        <img 
                          src={activity.user.avatar} 
                          alt={activity.user.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center">
                            <span 
                              className="text-sm font-medium"
                              style={{ fontFamily: '"Noto Serif SC", serif' }}
                            >
                              {activity.user.name}
                            </span>
                            <span className="mx-1 text-inkstone-gray">·</span>
                            <span className="text-xs text-inkstone-gray">{activity.time}</span>
                            {activity.isLive && (
                              <span className="ml-2 text-xs px-2 py-0.5 bg-crabapple-red text-white rounded-full flex items-center">
                                <i className="fas fa-circle text-[6px] mr-1 animate-pulse"></i>直播中
                              </span>
                            )}
                          </div>
                          <p 
                            className="text-sm mt-1 line-clamp-2"
                            style={{ fontFamily: '"Noto Serif SC", serif' }}
                          >
                            {activity.content}
                          </p>
                          {activity.type === "comment" && (
                            <p className="text-xs text-glass-blue mt-1">
                              评论了: {activity.targetPost}
                            </p>
                          )}
                          <div className="mt-2 flex items-center gap-4 text-xs text-inkstone-gray">
                            {activity.likes !== undefined && (
                              <button className="flex items-center gap-1 hover:text-glass-blue transition-colors">
                                <i className="far fa-thumbs-up"></i>
                                <span>{activity.likes}</span>
                              </button>
                            )}
                            {activity.comments !== undefined && (
                              <button className="flex items-center gap-1 hover:text-glass-blue transition-colors">
                                <i className="far fa-comment"></i>
                                <span>{activity.comments}</span>
                              </button>
                            )}
                            {activity.participants !== undefined && (
                              <button className="flex items-center gap-1 hover:text-glass-blue transition-colors">
                                <i className="fas fa-users"></i>
                                <span>{activity.participants}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 热门话题 */}
            <div 
              className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden mb-6 ink-splash"
            >
              <div className="p-4 border-b border-silk-gray">
                <h2 
                  className="text-lg font-semibold flex items-center"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  <i className="fas fa-fire text-autumn-yellow mr-2"></i>热门话题
                </h2>
              </div>
              <div className="p-3">
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link to="#" className="block p-2 rounded-lg hover:bg-silk-gray transition-colors">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div 
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                index === 0 ? "bg-crabapple-red text-white" :
                                index === 1 ? "bg-[#E6A23C] text-white" :
                                index === 2 ? "bg-[#67C23A] text-white" :
                                "bg-silk-gray text-inkstone-gray"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <span 
                              className="ml-2 text-sm"
                              style={{ fontFamily: '"Noto Serif SC", serif' }}
                            >
                              {topic.name}
                            </span>
                          </div>
                          <span 
                            className="text-xs text-inkstone-gray"
                            style={{ fontFamily: '"Noto Serif SC", serif' }}
                          >
                            {topic.posts}篇帖子
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 创建圈子提示 */}
            <div 
              className="bg-gradient-to-r from-glass-blue to-glass-blue/70 rounded-xl shadow-sm p-5 text-white ink-splash"
            >
              <h3 
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                没有找到感兴趣的圈子？
              </h3>
              <p className="text-sm text-white/90 mb-4">
                创建属于你的专属圈子，邀请志同道合的朋友一起交流探讨
              </p>
              <button 
                className="w-full py-2 bg-white text-glass-blue rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors btn-chinese"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                <i className="fas fa-plus mr-1"></i>创建圈子
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}