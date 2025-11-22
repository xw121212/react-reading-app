import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// 模拟已读书单数据
const readBooks = [
  {
    id: 1,
    title: "人类简史",
    author: "尤瓦尔·赫拉利",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=History%20Book%20Cover%20Sapiens&sign=eeb87ae98a563b9841dea83a087f7db9",
    readDate: "2025-10"
  },
  {
    id: 2,
    title: "被讨厌的勇气",
    author: "岸见一郎",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Self%20Help%20Book%20Cover&sign=a0b923cab11b1c386388175d6b6159d7",
    readDate: "2025-09"
  },
  {
    id: 3,
    title: "解忧杂货店",
    author: "东野圭吾",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Japanese%20Novel%20Book%20Cover&sign=3382a5c4753bdc4baed58fda1d0a9690",
    readDate: "2025-08"
  },
  {
    id: 4,
    title: "三体",
    author: "刘慈欣",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Science%20Fiction%20Book%20Cover%20Three-Body%20Problem&sign=2c3dd569615d42d4f637674ba2f9a492",
    readDate: "2025-07"
  }
];

// 模拟原创帖子数据
const userPosts = [
  {
    id: 1,
    title: "《三体》中的宇宙观与哲学思考",
    content: "《三体》不仅仅是一部科幻小说，更是一部探讨宇宙观、人性和文明发展的哲学著作。本文将从多个角度解析《三体》中的深层含义...",
    likes: 2154,
    comments: 342,
    date: "2025-10-15",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Space%20Galaxy%20Science%20Fiction%20Illustration&sign=e6249b4553c90b6b04bc02417da48f57"
  },
  {
    id: 2,
    title: "如何培养良好的阅读习惯？分享我的十年阅读心得",
    content: "阅读是一种能够伴随我们一生的美好习惯。在这篇文章中，我将分享自己十年来培养的阅读习惯和技巧，希望能够帮助更多的人爱上阅读...",
    likes: 872,
    comments: 135,
    date: "2025-09-28",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Reading%20Corner%20Cozy%20Book%20Nook&sign=fdf2f1939c478d5b949c4755c5d7870b"
  }
];

// 模拟加入的社区数据
const joinedCommunities = [
  {
    id: 1,
    name: "推理小说圈",
    members: 12568,
    icon: "fa-magnifying-glass"
  },
  {
    id: 2,
    name: "诗歌精读圈",
    members: 8973,
    icon: "fa-feather"
  },
  {
    id: 3,
    name: "科幻爱好者圈",
    members: 9876,
    icon: "fa-rocket"
  }
];

// 模拟阅读成就徽章数据
const achievements = [
  {
    id: 1,
    name: "阅读达人",
    description: "累计阅读时长超过1000小时",
    icon: "fa-trophy",
    isUnlocked: true
  },
  {
    id: 2,
    name: "知识渊博",
    description: "阅读书籍超过50本",
    icon: "fa-book",
    isUnlocked: true
  },
  {
    id: 3,
    name: "坚持阅读",
    description: "连续阅读30天",
    icon: "fa-calendar-check",
    isUnlocked: true
  },
  {
    id: 4,
    name: "社交达人",
    description: "在社区发表10篇以上优质内容",
    icon: "fa-comments",
    isUnlocked: false
  },
  {
    id: 5,
    name: "深夜读者",
    description: "在夜晚阅读时间超过100小时",
    icon: "fa-moon",
    isUnlocked: false
  },
  {
    id: 6,
    name: "直播爱好者",
    description: "参与50场以上直播",
    icon: "fa-video",
    isUnlocked: false
  }
];

// 模拟阅读统计数据
const readingStats = {
  totalBooks: 24,
  readingDays: 128,
  totalHours: 436,
  completionRate: 75
};

export function ReadingProfile() {
  const [activeTab, setActiveTab] = useState<"books" | "posts" | "communities" | "achievements">("books");

  return (
    <div className="space-y-6">
      {/* 用户基本信息 */}
      <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6 overflow-hidden ink-splash">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md relative">
            <img 
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Portrait%20Silhouette&sign=45fd7dc39ab1727c4dd3e674074b5674" 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-bamboo-green flex items-center justify-center text-white">
              <i className="fas fa-camera"></i>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: '"Noto Serif SC", serif' }}
            >
              用户名
            </h2>
            <p className="text-sm text-inkstone-gray mb-3">热爱阅读的探索者 | 文学爱好者</p>
            <p 
              className="text-sm mb-4"
              style={{ fontFamily: '"Noto Serif SC", serif' }}
            >
              "读书破万卷，下笔如有神。"
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto md:mx-0">
              <div className="text-center">
                <p className="text-xl font-bold text-glass-blue">{readingStats.totalBooks}</p>
                <p 
                  className="text-xs text-inkstone-gray"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  已读书籍
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-glass-blue">{readingStats.readingDays}</p>
                <p 
                  className="text-xs text-inkstone-gray"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  阅读天数
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-glass-blue">{readingStats.totalHours}</p>
                <p 
                  className="text-xs text-inkstone-gray"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  阅读时长
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-glass-blue">{readingStats.completionRate}%</p>
                <p 
                  className="text-xs text-inkstone-gray"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  完成率
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 内容标签页 */}
      <div className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden">
        <div className="flex border-b border-silk-gray">
          <button
            className={`py-3 px-6 text-sm font-medium border-b-2 ${activeTab === "books" ? "text-glass-blue border-glass-blue" : "text-inkstone-gray border-transparent"}`}
            onClick={() => setActiveTab("books")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            已读书单
          </button>
          <button
            className={`py-3 px-6 text-sm font-medium border-b-2 ${activeTab === "posts" ? "text-glass-blue border-glass-blue" : "text-inkstone-gray border-transparent"}`}
            onClick={() => setActiveTab("posts")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            原创帖子
          </button>
          <button
            className={`py-3 px-6 text-sm font-medium border-b-2 ${activeTab === "communities" ? "text-glass-blue border-glass-blue" : "text-inkstone-gray border-transparent"}`}
            onClick={() => setActiveTab("communities")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            加入的社区
          </button>
          <button
            className={`py-3 px-6 text-sm font-medium border-b-2 ${activeTab === "achievements" ? "text-glass-blue border-glass-blue" : "text-inkstone-gray border-transparent"}`}
            onClick={() => setActiveTab("achievements")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            阅读成就
          </button>
        </div>

        {/* 已读书单 */}
        {activeTab === "books" && (
          <div className="p-6">
            <div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
              style={{
                backgroundImage: "url(https://space-static.coze.site/coze_space/7574875098542162219/upload/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20251121042319_888x1214.jpg?sign=1766262229-3983d11001-0-eccabe9a2011e7370e3599e0017cb6bd4b3133cb9a5885e42a43e38ff488c215)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 50%",
                backgroundSize: "contain"
              }}
            >
              {readBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Link to={`/read/${book.id}`} className="block group">
                    <div className="w-32 h-44 flex-shrink-0 mx-auto chinese-corner-decoration">
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                      />
                      <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-bamboo-green flex items-center justify-center">
                        <i className="fas fa-check text-white"></i>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <h3 
                        className="text-sm font-medium truncate max-w-32 mx-auto"
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        {book.title}
                      </h3>
                      <p 
                        className="text-xs text-inkstone-gray truncate max-w-32 mx-auto"
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        {book.author}
                      </p>
                      <p 
                        className="text-xs text-inkstone-gray mt-1"
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        {book.readDate} 阅读
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button 
                className="px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors btn-chinese"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                查看全部
              </button>
            </div>
          </div>
        )}

        {/* 原创帖子 */}
        {activeTab === "posts" && (
          <div className="p-6">
            <div className="space-y-6">
              {userPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <h3 
                      className="font-medium text-base mb-2"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      {post.title}
                    </h3>
                    <p 
                      className="text-sm text-ink mb-3 line-clamp-3"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      {post.content}
                    </p>
                    {post.imageUrl && (
                      <div className="rounded-lg overflow-hidden mb-3">
                        <img
                          src={post.imageUrl}
                          alt="Post image"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span 
                        className="text-xs text-inkstone-gray"
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        {post.date}
                      </span>
                      <div className="flex gap-4">
                        <button className="flex items-center gap-1 text-sm text-inkstone-gray hover:text-glass-blue transition-colors">
                          <i className="far fa-thumbs-up"></i>
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-sm text-inkstone-gray hover:text-glass-blue transition-colors">
                          <i className="far fa-comment"></i>
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 text-sm text-inkstone-gray hover:text-glass-blue transition-colors">
                          <i className="far fa-bookmark"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button 
                className="px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors btn-chinese"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                查看全部
              </button>
            </div>
          </div>
        )}

        {/* 加入的社区 */}
        {activeTab === "communities" && (
          <div className="p-6">
            <div className="space-y-4">
              {joinedCommunities.map((community, index) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/community/${community.id}`}
                    className="block p-4 rounded-lg hover:bg-silk-gray transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-12 h-12 rounded-full bg-bamboo-green/10 flex items-center justify-center text-bamboo-green border border-bamboo-green/20"
                        >
                          <i className={`fas ${community.icon}`}></i>
                        </div>
                        <div className="ml-3">
                          <h3 
                            className="text-sm font-medium"
                            style={{ fontFamily: '"Noto Serif SC", serif' }}
                          >
                            {community.name}
                          </h3>
                          <p 
                            className="text-xs text-inkstone-gray mt-1 flex items-center"
                            style={{ fontFamily: '"Noto Serif SC", serif' }}
                          >
                            <i className="fas fa-user text-xs mr-1"></i> {community.members.toLocaleString()}成员
                          </p>
                        </div>
                      </div>
                      <button
                        className="text-xs px-3 py-1 bg-glass-blue/10 text-glass-blue rounded-full hover:bg-glass-blue/20 transition-colors btn-chinese"
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        进入
                      </button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button 
                className="px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors btn-chinese"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                探索更多社区
              </button>
            </div>
          </div>
        )}

        {/* 阅读成就 */}
        {activeTab === "achievements" && (
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${
                    achievement.isUnlocked 
                      ? 'border-bamboo-green/30 bg-bamboo-green/5' 
                      : 'border-silk-gray bg-silk-gray/30 opacity-70'
                  }`}
                >
                  <div 
                    className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      achievement.isUnlocked ? 'bg-bamboo-green text-white' : 'bg-silk-gray text-inkstone-gray'
                    }`}
                  >
                    <i className={`fas ${achievement.icon} text-xl`}></i>
                  </div>
                  <h3 
                    className="text-sm font-medium text-center mb-1"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    {achievement.name}
                  </h3>
                  <p 
                    className="text-xs text-center text-inkstone-gray"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    {achievement.description}
                  </p>
                  {!achievement.isUnlocked && (
                    <div className="text-center mt-2">
                      <span 
                        className="text-xs text-inkstone-gray"
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        未解锁
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-rice-paper rounded-lg border border-silk-gray">
              <p 
                className="text-sm text-center"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                已解锁 {achievements.filter(a => a.isUnlocked).length} / {achievements.length} 个成就
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}