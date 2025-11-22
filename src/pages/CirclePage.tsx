import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// 模拟圈子数据
const mockCircles = {
  1: {
    id: 1,
    name: "推理小说圈",
    description: "一起探讨推理小说的魅力，分享你的推理心得。这里汇聚了众多推理爱好者，从经典到现代，从本格到社会派，一起领略推理世界的精彩。",
    members: 12568,
    topics: 2342,
    icon: "fa-magnifying-glass",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Mystery%20Novel%20Circle%20Background%20Detailed&sign=d7c9183fc9a8c81771d38a4e0f836ea6",
    createTime: "2025-01-15",
    tags: ["推理小说", "悬疑", "侦探", "本格推理", "社会派推理"],
    isJoined: true,
    readingCount: 256,
    todayReaders: 45,
    recentGrowth: "+12%"
  },
  2: {
    id: 2,
    name: "诗歌精读圈",
    description: "欣赏经典诗歌，感受文字之美，分享创作灵感。在这里，我们一起朗诵、赏析、创作，让诗歌走进生活的每一个角落。",
    members: 8973,
    topics: 1876,
    icon: "fa-feather",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Poetry%20Reading%20Circle%20Background%20Detailed&sign=127adac324039d5acd3fa1e57482ffd7",
    createTime: "2025-02-10",
    tags: ["诗歌", "文学", "创作", "赏析", "朗诵"],
    isJoined: false,
    readingCount: 189,
    todayReaders: 32,
    recentGrowth: "+8%"
  },
  3: {
    id: 3,
    name: "社科讨论圈",
    description: "探讨社会科学的各个领域，拓宽知识面。从社会学、心理学到经济学、政治学，让我们一起理解这个复杂多变的世界。",
    members: 15672,
    topics: 3456,
    icon: "fa-brain",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Social%20Science%20Discussion%20Circle%20Detailed&sign=3e1202211ce220ecd627c4c7edddf9ed",
    createTime: "2025-01-05",
    tags: ["社会学", "心理学", "经济学", "政治学", "文化研究"],
    isJoined: true,
    readingCount: 321,
    todayReaders: 56,
    recentGrowth: "+15%"
  }
};

// 模拟帖子数据
const mockPosts = [
  {
    id: 1,
    type: "normal",
    title: "【推荐】近期值得一读的推理小说",
    content: "最近读了几本不错的推理小说，特别想推荐给大家。《嫌疑人X的献身》不用多说，东野圭吾的经典之作。另外《占星术杀人魔法》也是本格推理的巅峰之作，强烈推荐给喜欢推理的朋友们！",
    author: {
      name: "推理爱好者",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Mystery%20Lover&sign=b60d377b123719dc7be842b29370aa45",
      level: "高级会员",
      joinTime: "2025-01-20"
    },
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Japanese%20Mystery%20Novel%20Books&sign=0c1ff80e42c81a4dc245f6a57016878a",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Mystery%20Book%20Collection%20on%20Shelf&sign=9d1e875d6cb92ae6e1484a01fd35200b",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Crime%20Scene%20Investigation%20Theme%20Book&sign=bab365f47473e670fa1794d12f346310"
    ],
    likes: 128,
    comments: 32,
    shares: 15,
    time: "2天前",
    views: 568,
    isHot: true,
    isLiveRelated: false
  },
  {
    id: 2,
    type: "live",
    title: "【直播讨论】《百年孤独》中的魔幻现实主义",
    content: "昨天参加了张明教授的直播，收获颇丰。教授对《百年孤独》中的魔幻现实主义手法进行了深入解析，让我对这部作品有了全新的认识。分享一些我的笔记和思考，欢迎大家一起讨论。",
    author: {
      name: "文学研究者",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Literature%20Researcher&sign=95c4df7f2471e7c533ab68102d5989ad",
      level: "圈子达人",
      joinTime: "2025-01-05"
    },
    liveInfo: {
      title: "《百年孤独》深度解析",
      host: "文学教授张明",
      coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Literature%20Book%20Discussion%20Live%20Stream&sign=6dcc0b119ef403eb1b7adb620d8741e3",
      replayUrl: "/live/1"
    },
    likes: 89,
    comments: 45,
    shares: 23,
    time: "昨天",
    views: 345,
    isHot: false,
    isLiveRelated: true
  },
  {
    id: 3,
    type: "normal",
    title: "我的推理小说阅读心得分享",
    content: "从初中开始接触推理小说，至今已有十年。从最初的阿加莎·克里斯蒂到后来的东野圭吾，再到现在的国产推理作家，推理小说陪伴我度过了许多美好的时光。在这里想和大家分享一些我的阅读心得和感受...",
    author: {
      name: "书香满屋",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Book%20Lover&sign=049878cd026320bf183335b6562ef447",
      level: "忠实读者",
      joinTime: "2025-02-10"
    },
    likes: 67,
    comments: 28,
    shares: 9,
    time: "3天前",
    views: 234,
    isHot: false,
    isLiveRelated: false
  }
];

// 模拟心情卡片帖子数据
const moodCardPosts = [
  {
    id: 4,
    type: "mood",
    title: "今天读完了《追风筝的人》，内心久久不能平静",
    content: "有些错误，需要用一生去弥补。这本书让我重新思考了友谊、愧疚和救赎的意义。",
    author: {
      name: "文学爱好者",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Literature%20Lover&sign=7d4957ba875a438c96549fb404bf18a7",
      level: "中级会员",
      joinTime: "2025-02-15"
    },
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Book%20Mood%20Card%20Design%20with%20Inspirational%20Quote&sign=24704ff2a055b0676daf28da37ed16f2"
    ],
    likes: 89,
    comments: 15,
    shares: 12,
    time: "1天前",
    views: 210,
    isHot: false,
    isLiveRelated: false,
    mood: "思考"
  }
];

// 模拟成员数据
const mockMembers = [
  {
    id: 1,
    name: "推理爱好者",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Mystery%20Lover&sign=b60d377b123719dc7be842b29370aa45",
    level: "高级会员",
    joinTime: "2025-01-20",
    posts: 156,
    likes: 2345,
    isOnline: true,
    isAdmin: false
  },
  {
    id: 2,
    name: "书香满屋",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Book%20Lover&sign=049878cd026320bf183335b6562ef447",
    level: "忠实读者",
    joinTime: "2025-02-10",
    posts: 89,
    likes: 1234,
    isOnline: false,
    isAdmin: true
  },
  {
    id: 3,
    name: "文学研究者",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Literature%20Researcher&sign=95c4df7f2471e7c533ab68102d5989ad",
    level: "圈子达人",
    joinTime: "2025-01-05",
    posts: 234,
    likes: 3456,
    isOnline: true,
    isAdmin: false
  },
  {
    id: 4,
    name: "小说创作者",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Writer&sign=feba9c846bf1ecef7825f95fc629a575",
    level: "新手作家",
    joinTime: "2025-03-01",
    posts: 45,
    likes: 678,
    isOnline: false,
    isAdmin: false
  }
];

export default function CirclePage() {
  const { id } = useParams<{ id: string }>();
  const [circle, setCircle] = useState(mockCircles[1]);
  const [activeTab, setActiveTab] = useState<"posts" | "members" | "events" | "live">("posts");
  const [posts, setPosts] = useState(mockPosts);
  const [members, setMembers] = useState(mockMembers);
  const [isJoined, setIsJoined] = useState(circle.isJoined);
  const [showMoodCardCreator, setShowMoodCardCreator] = useState(false);
  const [moodCardText, setMoodCardText] = useState("");
  const [moodCardMood, setMoodCardMood] = useState("共鸣");
  const [moodCardBackground, setMoodCardBackground] = useState("");
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  
  // 心情样式函数
  const getMoodStyle = (mood: string) => {
    switch (mood) {
      case "共鸣":
        return "bg-crabapple-red/10 text-crabapple-red border border-crabapple-red/30";
      case "伤感":
        return "bg-glass-blue/10 text-glass-blue border border-glass-blue/30";
      case "思考":
        return "bg-bamboo-green/10 text-bamboo-green border border-bamboo-green/30";
      case "有趣":
        return "bg-autumn-yellow/10 text-autumn-yellow border border-autumn-yellow/30";
      case "感动":
        return "bg-autumn-yellow/10 text-autumn-yellow border border-autumn-yellow/30";
      default:
        return "bg-silk-gray text-inkstone-gray";
    }
  };
  
  // 心情卡片背景选项
  const moodCardBackgrounds = [
    "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Minimalist%20Background%20Design%20with%20Soft%20Colors&sign=8aa0ac311738fa51808c0135a553dea0",
    "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Abstract%20Watercolor%20Background%20for%20Mood%20Card&sign=13dd9cc19b9dd259f786f490f2248ade",
    "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Book%20Inspired%20Minimalist%20Background%20Design&sign=111e5320fcb3c6056695db690bd68565",
    "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Nature%20Inspired%20Calm%20Background%20Design&sign=0d81796f1c165481327f9ebb207708d7",
  ];
  // 初始化心情卡片背景
  useEffect(() => {
    if (moodCardBackgrounds.length > 0 && !moodCardBackground) {
      setMoodCardBackground(moodCardBackgrounds[0]);
    }
  }, [moodCardBackgrounds, moodCardBackground]);
  // 获取圈子数据
  useEffect(() => {
    // 模拟从API获取圈子数据
    const circleData = mockCircles[id as keyof typeof mockCircles] || mockCircles[1];
    setCircle(circleData);
    setIsJoined(circleData.isJoined);
    
    // 根据圈子调整帖子数据（筛选出与直播相关的帖子）
    if (circleData.id === 1) {
      // 推理小说圈，显示所有类型的帖子，包括心情卡片
      setPosts([...mockPosts, ...moodCardPosts]);
    } else {
      // 其他圈子，筛选出与直播相关的帖子
      setPosts(mockPosts.filter(post => post.isLiveRelated));
    }
  }, [id]);
  
  // 加入/退出圈子
  const toggleJoinCircle = () => {
    setIsJoined(!isJoined);
    setCircle(prev => ({ ...prev, isJoined: !prev.isJoined }));
    
    if (!isJoined) {
      toast.success(`已加入 ${circle.name}`);
    } else {
      toast.info(`已退出 ${circle.name}`);
    }
  };
  
  // 渲染帖子卡片
  const renderPostCard = (post: any) => {
    const isLiked = likedPosts.has(post.id.toString());
    const isSaved = savedPosts.has(post.id.toString());
    const currentCommentInput = commentInput[post.id] || '';
    const areCommentsShown = showComments[post.id] || false;
    
    // 处理点赞
    const handleLike = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newLikedPosts = new Set(likedPosts);
      if (isLiked) {
        newLikedPosts.delete(post.id.toString());
      } else {
        newLikedPosts.add(post.id.toString());
      }
      setLikedPosts(newLikedPosts);
    };
    
    // 处理收藏
    const handleSave = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newSavedPosts = new Set(savedPosts);
      if (isSaved) {
        newSavedPosts.delete(post.id.toString());
      } else {
        newSavedPosts.add(post.id.toString());
      }
      setSavedPosts(newSavedPosts);
    };
    
    // 处理分享
    const handleShare = (e: React.MouseEvent) => {
      e.stopPropagation();
      toast.info("分享功能已触发");
    };
    
    // 处理评论输入变化
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCommentInput(prev => ({
        ...prev,
        [post.id]: e.target.value
      }));
    };
    
    // 处理评论提交
    const handleCommentSubmit = (e: React.FormEvent) => {
      e.stopPropagation();
      if (currentCommentInput.trim()) {
        toast.success("评论已发布");
        setCommentInput(prev => ({
          ...prev,
          [post.id]: ''
        }));
        // 这里可以添加实际的评论发布逻辑
      }
    };
    
    // 切换评论显示
    const toggleComments = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowComments(prev => ({
        ...prev,
        [post.id]: !areCommentsShown
      }));
    };
    
    return (
      <motion.div
        key={post.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden hover:shadow-md transition-shadow mb-4"
      >
        <div className="p-4">
          {/* 作者信息 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <span 
                    className="text-sm font-medium"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    {post.author.name}
                  </span>
                  {post.author.isAdmin && (
                    <span className="ml-1 text-xs px-1.5 py-0.5 bg-glass-blue text-white rounded">管理员</span>
                  )}
                </div>
                <div className="flex items-center mt-0.5">
                  <span className="text-xs text-inkstone-gray">{post.author.level}</span>
                  <span className="mx-1.5 text-inkstone-gray">·</span>
                  <span className="text-xs text-inkstone-gray">{post.time}</span>
                </div>
              </div>
            </div>
            <button className="text-inkstone-gray hover:text-ink">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
          
          {/* 帖子标题 */}
          <h3 
            className="text-base font-medium mb-2"
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            {post.title}
            {post.isHot && (
              <span className="ml-2 text-xs px-2 py-0.5 bg-autumn-yellow/10 text-autumn-yellow rounded-full">热门</span>
            )}
            {post.isLiveRelated && (
              <span className="ml-2 text-xs px-2 py-0.5 bg-crabapple-red/10 text-crabapple-red rounded-full flex items-center inline-flex">
                <i className="fas fa-video mr-1 text-[8px]"></i>直播讨论
              </span>
            )}
          </h3>
          
          {/* 帖子内容 */}
          <p 
            className="text-sm text-ink mb-3 line-clamp-3"
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            {post.content}
          </p>
          
          {/* 直播信息 */}
          {post.type === "live" && post.liveInfo && (
            <div className="mb-3 p-3 bg-rice-paper rounded-lg border border-silk-gray flex items-center">
              <img 
                src={post.liveInfo.coverUrl} 
                alt={post.liveInfo.title} 
                className="w-20 h-12 object-cover rounded-md"
              />
              <div className="ml-3 flex-1 min-w-0">
                <h4 
                  className="text-sm font-medium truncate"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  {post.liveInfo.title}
                </h4>
                <p className="text-xs text-inkstone-gray mt-0.5">{post.liveInfo.host}</p>
              </div>
              <Link 
                to={post.liveInfo.replayUrl}
                className="ml-2 px-3 py-1 bg-glass-blue text-white text-xs rounded-full hover:bg-opacity-90 transition-colors btn-chinese"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                查看回放
              </Link>
            </div>
          )}
          
          {/* 帖子图片 */}
          {post.images && post.images.length > 0 && (
            <div className={`grid gap-1 mb-3 ${
              post.images.length === 1 ? 'grid-cols-1' : 
              post.images.length === 2 || post.images.length === 4 ? 'grid-cols-2' : 
              'grid-cols-3'
            }`}>
              {post.images.map((img: string, index: number) => (
                <div 
                  key={index} 
                  className={`aspect-square overflow-hidden rounded-lg relative ${
                    post.images.length > 4 && index === 4 ? 'after:content-["+"+(images.length-4)] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:bg-black/50 after:text-white after:text-lg after:font-bold' : ''
                  }`}
                  style={{ 
                    maxHeight: post.images.length === 1 ? '300px' : 'auto'
                  }}
                >
                  <img 
                    src={img} 
                    alt={`Post image ${index + 1}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* 互动栏 */}
          <div className="flex items-center justify-between pt-2 border-t border-silk-gray">
            <div className="flex items-center text-xs text-inkstone-gray">
              <span className="flex items-center">
                <i className="far fa-eye mr-1"></i>
                <span>{post.views}浏览</span>
              </span>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  isLiked ? 'text-crabapple-red' : 'text-inkstone-gray hover:text-crabapple-red'
                }`}
              >
                <i className={isLiked ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'}></i>
                <span>{isLiked ? post.likes + 1 : post.likes}</span>
              </button>
              <button 
                onClick={toggleComments}
                className="flex items-center gap-1 text-sm text-inkstone-gray hover:text-glass-blue transition-colors"
              >
                <i className="far fa-comment"></i>
                <span>{post.comments}</span>
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center gap-1 text-sm text-inkstone-gray hover:text-glass-blue transition-colors"
              >
                <i className="fas fa-share-alt"></i>
                <span>{post.shares}</span>
              </button>
              <button 
                onClick={handleSave}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  isSaved ? 'text-autumn-yellow' : 'text-inkstone-gray hover:text-autumn-yellow'
                }`}
              >
                <i className={isSaved ? 'fas fa-bookmark' : 'far fa-bookmark'}></i>
              </button>
            </div>
          </div>
          
          {/* 评论区 */}
          <AnimatePresence>
            {areCommentsShown && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-silk-gray">
                  {/* 评论输入框 */}
                  <form onSubmit={handleCommentSubmit} className="flex items-center mb-4">
                    <input
                      type="text"
                      placeholder="说点什么..."
                      value={currentCommentInput}
                      onChange={handleCommentChange}
                      className="flex-1 px-4 py-2 bg-silk-gray rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-glass-blue/30 mr-2"
                      onKeyDown={(e) => {
                        if (e.key === '@') {
                          e.preventDefault();
                          toast.info("提及好友功能暂未实现");
                        }
                      }}
                    />
                    <button 
                      type="submit"
                      className="px-3 py-2 bg-glass-blue text-white rounded-full text-sm hover:bg-opacity-90 transition-colors"
                      disabled={!currentCommentInput.trim()}
                    >
                      发送
                    </button>
                  </form>
                  
                  {/* 评论列表 - 模拟数据 */}
                  {post.comments > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <img 
                          src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Portrait&sign=cf9445797c3769167f0fc5627827345b" 
                          alt="Comment author" 
                          className="w-8 h-8 rounded-full object-cover mt-1"
                        />
                        <div className="ml-2 flex-1">
                          <div className="bg-silk-gray rounded-lg p-2">
                            <div className="flex items-center mb-1">
                              <span className="text-xs font-medium">评论用户</span>
                              <span className="mx-1 text-inkstone-gray">·</span>
                              <span className="text-xs text-inkstone-gray">1小时前</span>
                            </div>
                            <p className="text-sm">{post.type === "live" ? "直播内容非常精彩，学到了很多！" : "这篇文章写得真好，很有见地！"}</p>
                          </div>
                          <div className="flex items-center mt-1 ml-1 text-xs text-inkstone-gray">
                            <button className="hover:text-glass-blue transition-colors mr-3">回复</button>
                            <button className="hover:text-glass-blue transition-colors mr-3">点赞</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };
  
  // 渲染成员卡片
  const renderMemberCard = (member: any) => {
    return (
      <motion.div
        key={member.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden hover:shadow-md transition-shadow p-3"
      >
        <div className="flex items-center">
          <div className="relative">
            <img 
              src={member.avatar} 
              alt={member.name} 
              className="w-12 h-12 rounded-full object-cover"
            />
            {member.isOnline && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-bamboo-green rounded-full border-2 border-white"></span>
            )}
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center">
              <span 
                className="text-sm font-medium"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                {member.name}
              </span>
              {member.isAdmin && (
                <span className="ml-1 text-xs px-1.5 py-0.5 bg-glass-blue text-white rounded">管理员</span>
              )}
            </div>
            <p className="text-xs text-inkstone-gray mt-0.5">{member.level}</p>
            <div className="flex items-center mt-1 text-xs text-inkstone-gray">
              <span className="mr-3">{member.posts}篇帖子</span>
              <span>{member.likes}获赞</span>
            </div>
          </div>
          <button 
            className="px-3 py-1 bg-silk-gray text-sm rounded-full hover:bg-silk-gray/80 transition-colors"
          >
            关注
          </button>
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="min-h-screen bg-rice-paper text-ink flex flex-col">
      {/* 顶部信息栏 */}
      <div className="bg-white border-b border-silk-gray p-4 sticky top-16 z-10 ink-splash">
        <div className="container mx-auto flex justify-between items-center">
          <h1 
            className="text-2xl font-bold text-glass-blue flex items-center"
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            <Link to="/community" className="mr-2">
              <i className="fas fa-arrow-left"></i>
            </Link>
            {circle.name}
          </h1>
          <button 
            onClick={toggleJoinCircle}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isJoined 
                ? "bg-silk-gray text-inkstone-gray hover:bg-silk-gray/80" 
                : "bg-glass-blue text-white hover:bg-opacity-90 btn-chinese"
            }`}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            {isJoined ? "已加入" : "加入圈子"}
          </button>
        </div>
      </div>
      
      {/* 圈子头部 */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={circle.coverUrl} 
          alt={circle.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-end">
          <div className="p-6 w-full">
            <div className="flex items-end justify-between">
              <div className="flex items-end">
                <div 
                  className="w-24 h-24 rounded-xl bg-white border-4 border-white shadow-md overflow-hidden flex-shrink-0"
                  style={{ marginTop: '30px' }}
                >
                  <div 
                    className="w-full h-full rounded-lg bg-bamboo-green/10 flex items-center justify-center text-4xl text-bamboo-green border border-bamboo-green/20"
                  >
                    <i className={`fas ${circle.icon}`}></i>
                  </div>
                </div>
                <div className="ml-4 text-white mb-4">
                  <h2 
                    className="text-2xl font-bold"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    {circle.name}
                  </h2>
                  <div className="flex items-center mt-1">
                    <span className="text-white/80 text-sm flex items-center">
                      <i className="fas fa-user text-sm mr-1"></i> {circle.members.toLocaleString()}成员
                    </span>
                    <span className="mx-2 text-white/80">|</span>
                    <span className="text-white/80 text-sm">{circle.topics.toLocaleString()}话题</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 标签页导航 */}
      <div className="bg-white border-b border-silk-gray sticky top-[7.5rem] z-10 mt-16">
        <div className="container mx-auto flex overflow-x-auto hide-scrollbar">
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "posts" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("posts")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            全部帖子
            {activeTab === "posts" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "members" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("members")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            成员列表
            {activeTab === "members" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "events" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("events")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            圈子活动
            {activeTab === "events" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "live" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("live")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            直播讨论
            {activeTab === "live" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
        </div>
      </div>
      
      {/* 主内容区域 */}
      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-12 gap-6">
          {/* 左侧 - 内容区域 */}
          <div className="col-span-12 md:col-span-8">
            {/* 圈子介绍 */}
            <div 
              className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden mb-6 p-5 ink-splash"
            >
              <h3 
                className="text-lg font-medium mb-3"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                圈子介绍
              </h3>
              <p 
                className="text-sm text-ink mb-4"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                {circle.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {circle.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 bg-silk-gray rounded-full text-inkstone-gray"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-silk-gray">
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-inkstone-gray">
                    <i className="fas fa-calendar-alt mr-1"></i>
                    <span>创建于 {circle.createTime}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-sm text-inkstone-gray hover:text-glass-blue transition-colors">
                    <i className="fas fa-share-alt mr-1"></i>分享
                  </button>
                  <button className="text-sm text-inkstone-gray hover:text-glass-blue transition-colors">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>
            </div>
            
             {/* 发帖区域 */}
            {isJoined && (
              <div className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden mb-6 p-4">
                <div className="flex items-start">
                  <img 
                    src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Portrait%20Silhouette&sign=45fd7dc39ab1727c4dd3e674074b5674" 
                    alt="Your avatar" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-3 flex-1">
                    <input 
                      type="text"
                      placeholder="分享你的想法或提问..."
                      className="w-full px-4 py-2 bg-silk-gray rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-glass-blue/30 mb-3"
                    />
                    <textarea
                      placeholder="详细内容..."
                      rows={3}
                      className="w-full px-4 py-2 bg-silk-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-glass-blue/30 mb-3 resize-none"
                    ></textarea>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <div className="relative group">
                        <input type="file" id="imageUpload" className="hidden" multiple accept="image/*" />
                        <label htmlFor="imageUpload" className="flex items-center text-sm text-inkstone-gray hover:text-glass-blue transition-colors cursor-pointer">
                          <i className="far fa-image mr-1"></i>
                          <span>添加图片</span>
                        </label>
                        <div className="absolute right-0 bottom-full mb-1 hidden group-hover:block bg-white rounded-lg shadow-lg border border-silk-gray p-2 z-10">
                          <p className="text-xs text-inkstone-gray">最多上传9张图片</p>
                        </div>
                      </div>
                      <button className="flex items-center text-sm text-inkstone-gray hover:text-glass-blue transition-colors">
                        <i className="far fa-smile mr-1"></i>
                        <span>表情</span>
                      </button>
                      <button 
                        onClick={() => setShowMoodCardCreator(true)}
                        className="flex items-center text-sm text-inkstone-gray hover:text-glass-blue transition-colors"
                      >
                        <i className="far fa-grin-alt mr-1"></i>
                        <span>心情卡片</span>
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <input type="checkbox" id="isPublicPost" className="mr-2" defaultChecked />
                        <label htmlFor="isPublicPost" className="text-xs text-inkstone-gray">公开可见</label>
                      </div>
                      <button 
                        className="px-4 py-1.5 bg-glass-blue text-white rounded-full text-sm hover:bg-opacity-90 transition-colors btn-chinese"
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        发布
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 帖子列表 */}
            {activeTab === "posts" && (
              <div>
                <div className="mb-4">
                  <div className="flex bg-silk-gray/50 rounded-lg p-1 inline-flex">
                    <button 
                      className="px-3 py-1 rounded-md text-xs font-medium bg-white shadow-sm text-ink"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      最新发布
                    </button>
                    <button 
                      className="px-3 py-1 rounded-md text-xs font-medium text-inkstone-gray"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      热门排序
                    </button>
                    <button 
                      className="px-3 py-1 rounded-md text-xs font-medium text-inkstone-gray"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      精华内容
                    </button>
                  </div>
                </div>
                
                {posts.map(post => renderPostCard(post))}
                
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
            
            {/* 成员列表 */}
            {activeTab === "members" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 
                    className="text-lg font-medium"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    成员列表 ({circle.members})
                  </h3>
                  <div className="flex bg-silk-gray/50 rounded-lg p-1 inline-flex">
                    <button 
                      className="px-3 py-1 rounded-md text-xs font-medium bg-white shadow-sm text-ink"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      活跃度
                    </button>
                    <button 
                      className="px-3 py-1 rounded-md text-xs font-medium text-inkstone-gray"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      加入时间
                    </button>
                    <button 
                      className="px-3 py-1 rounded-md text-xs font-medium text-inkstone-gray"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      昵称
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {members.map(member => renderMemberCard(member))}
                </div>
                
                <div className="text-center mt-6">
                  <button 
                    className="px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors btn-chinese"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    查看全部成员
                  </button>
                </div>
              </div>
            )}
            
            {/* 圈子活动 */}
            {activeTab === "events" && (
              <div className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden p-6">
                <div className="text-center py-10 text-inkstone-gray">
                  <i className="fas fa-calendar-alt text-3xl mb-3"></i>
                  <p 
                    className="text-base mb-2"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    暂无圈子活动
                  </p>
                  {isJoined && (
                    <button 
                      className="px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      <i className="fas fa-plus mr-1"></i>创建活动
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {/* 直播讨论 */}
            {activeTab === "live" && (
              <div>
                <div className="mb-4">
                  <div className="flex bg-silk-gray/50 rounded-lg p-1 inline-flex">
                    <button 
                      className="px-3 py-1 rounded-md text-xs font-medium bg-white shadow-sm text-ink"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      最新直播
                    </button>
                    <button 
                      className="px-3 py-1 rounded-md text-xs font-medium text-inkstone-gray"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      热门直播
                    </button>
                  </div>
                </div>
                
                {/* 筛选出直播相关的帖子 */}
                {posts.filter(post => post.isLiveRelated).length > 0 ? (
                  posts.filter(post => post.isLiveRelated).map(post => renderPostCard(post))
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden p-6">
                    <div className="text-center py-10 text-inkstone-gray">
                      <i className="fas fa-video text-3xl mb-3"></i>
                      <p 
                        className="text-base mb-2"
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        暂无直播讨论帖
                      </p>
                      <Link 
                        to="/live"
                        className="inline-block px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        浏览直播
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* 右侧 - 圈子信息和统计 */}
          <div className="col-span-12 md:col-span-4">
            {/* 圈子统计 */}
            <div 
              className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden mb-6 p-4 ink-splash"
            >
              <h3 
                className="text-lg font-medium mb-4"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                圈子数据
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-rice-paper rounded-lg p-3 text-center">
                  <p 
                    className="text-2xl font-bold text-glass-blue"
                  >
                    {circle.members.toLocaleString()}
                  </p>
                  <p 
                    className="text-xs text-inkstone-gray"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    成员总数
                  </p>
                </div>
                <div className="bg-rice-paper rounded-lg p-3 text-center">
                  <p 
                    className="text-2xl font-bold text-glass-blue"
                  >
                    {circle.topics.toLocaleString()}
                  </p>
                  <p 
                    className="text-xs text-inkstone-gray"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    话题总数
                  </p>
                </div>
                <div className="bg-rice-paper rounded-lg p-3 text-center">
                  <p 
                    className="text-2xl font-bold text-glass-blue"
                  >
                    {circle.todayReaders}
                  </p>
                  <p 
                    className="text-xs text-inkstone-gray"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    今日活跃
                  </p>
                </div>
                <div className="bg-rice-paper rounded-lg p-3 text-center">
                  <p 
                    className="text-2xl font-bold text-glass-blue"
                  >
                    {circle.recentGrowth}
                  </p>
                  <p 
                    className="text-xs text-inkstone-gray"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    近期增长
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <img 
                      src={mockMembers[0].avatar} 
                      alt={mockMembers[0].name} 
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                  </div>
                  <div className="relative -left-2">
                    <img 
                      src={mockMembers[1].avatar} 
                      alt={mockMembers[1].name} 
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                  </div>
                  <div className="relative -left-4">
                    <img 
                      src={mockMembers[2].avatar} 
                      alt={mockMembers[2].name} 
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                  </div>
                  <div className="relative -left-6 w-8 h-8 rounded-full bg-silk-gray border-2 border-white flex items-center justify-center text-xs text-inkstone-gray">
                    +{circle.members - 3}
                  </div>
                </div>
                <button className="text-sm text-glass-blue hover:underline">
                  查看全部
                </button>
              </div>
            </div>
            
            {/* 推荐圈子 */}
            <div 
              className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden mb-6 ink-splash"
            >
              <div className="p-4 border-b border-silk-gray">
                <h3 
                  className="text-lg font-semibold flex items-center"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  <i className="fas fa-thumbs-up text-bamboo-green mr-2"></i>推荐圈子
                </h3>
              </div>
              <div className="p-3">
                <div className="space-y-3">
                  {Object.values(mockCircles).filter(c => c.id !== circle.id).slice(0, 3).map((recCircle) => (
                    <Link
                      key={recCircle.id}
                      to={`/community/${recCircle.id}`}
                      className="block p-3 rounded-lg hover:bg-silk-gray transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="w-10 h-10 rounded-full bg-bamboo-green/10 flex items-center justify-center text-bamboo-green border border-bamboo-green/20"
                          >
                            <i className={`fas ${recCircle.icon}`}></i>
                          </div>
                          <div className="ml-3">
                            <h4 
                              className="text-sm font-medium"
                              style={{ fontFamily: '"Noto Serif SC", serif' }}
                            >
                              {recCircle.name}
                            </h4>
                            <span 
                              className="text-xs text-inkstone-gray flex items-center mt-1"
                              style={{ fontFamily: '"Noto Serif SC", serif' }}
                            >
                              <i className="fas fa-user text-xs mr-1"></i> {recCircle.members.toLocaleString()}成员
                            </span>
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
                  ))}
                </div>
              </div>
            </div>
            
            {/* 热门标签 */}
            <div 
              className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden mb-6 ink-splash"
            >
              <div className="p-4 border-b border-silk-gray">
                <h3 
                  className="text-lg font-semibold flex items-center"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  <i className="fas fa-tags text-autumn-yellow mr-2"></i>热门标签
                </h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {circle.tags.map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="text-xs px-3 py-1.5 bg-silk-gray rounded-full text-inkstone-gray hover:bg-glass-blue hover:text-white transition-colors"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 圈子公告 */}
            <div 
              className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden ink-splash"
            >
              <div className="p-4 border-b border-silk-gray">
                <h3 
                  className="text-lg font-semibold flex items-center"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  <i className="fas fa-bullhorn text-crabapple-red mr-2"></i>圈子公告
                </h3>
              </div>
              <div className="p-4">
                <div className="bg-crabapple-red/5 p-3 rounded-lg border border-crabapple-red/20">
                  <p 
                    className="text-sm"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    欢迎加入{circle.name}！请遵守圈子规则，文明发言，共同营造良好的交流氛围。如有任何问题，请联系管理员。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    
      {/* 心情卡片创建器 */}
      <AnimatePresence>
        {showMoodCardCreator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowMoodCardCreator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                  创建心情卡片
                </h3>
                <button 
                  onClick={() => setShowMoodCardCreator(false)}
                  className="p-1 rounded-full hover:bg-silk-gray transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="mb-4">
                <textarea
                  placeholder="分享你的阅读心情..."
                  rows={4}
                  className="w-full px-4 py-3 border border-silk-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-glass-blue/30 resize-none"
                  value={moodCardText}
                  onChange={(e) => setMoodCardText(e.target.value)}
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">选择心情</label>
                <div className="grid grid-cols-5 gap-2">
                  {['共鸣', '伤感', '思考', '有趣', '感动'].map(mood => (
                    <button
                      key={mood}
                      onClick={() => setMoodCardMood(mood)}
                      className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                        moodCardMood === mood ? getMoodStyle(mood as any) : 'bg-silk-gray hover:bg-silk-gray/80'
                      }`}
                    >
                      <i className="fas fa-smile text-xl mb-1"></i>
                      <span className="text-xs">{mood}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">选择背景</label>
                <div className="flex flex-wrap gap-2">
                  {moodCardBackgrounds.map((bg, index) => (
                    <button
                      key={index}
                      onClick={() => setMoodCardBackground(bg)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 ${
                        moodCardBackground === bg ? 'border-glass-blue' : 'border-transparent'
                      }`}
                    >
                      <img src={bg} alt={`Background ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="flex-1 py-2.5 bg-glass-blue text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors btn-chinese"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                  onClick={() => {
                    // 模拟生成心情卡片并分享
                    toast.success("心情卡片已生成，即将分享");
                    setShowMoodCardCreator(false);
                    setMoodCardText("");
                    setMoodCardMood("共鸣");
                  }}
                >
                  <i className="fas fa-share-alt mr-1"></i>分享心情
                </button>
                <button 
                  className="flex-1 py-2.5 bg-silk-gray text-inkstone-gray rounded-lg text-sm font-medium hover:bg-opacity-80 transition-colors"
                  onClick={() => setShowMoodCardCreator(false)}
                >
                  取消
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}