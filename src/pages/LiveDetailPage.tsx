import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// 模拟直播详情数据
const mockLiveDetail = {
  id: 1,
  title: "《百年孤独》深度解析",
  host: "文学教授张明",
  viewers: 1243,
  coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Literature%20Book%20Discussion%20Live%20Stream&sign=6dcc0b119ef403eb1b7adb620d8741e3",
  description: "一起探讨马尔克斯的经典之作《百年孤独》的文学价值和深刻内涵，从魔幻现实主义手法到家族命运的象征意义，全方位解析这部影响世界的文学巨著。",
  tags: ["文学", "经典", "马尔克斯", "魔幻现实主义"],
  startTime: "2025-11-21 19:00",
  duration: 120, // 分钟
  isLive: true,
  hostInfo: {
    name: "张明",
    title: "文学教授",
    bio: "著名文学评论家，专注于拉美文学研究，出版多部学术著作",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Professor%20Avatar%20Male%20Literature&sign=504fe243e32ea0b706248fefeee0ac27"
  },
  relatedCircle: {
    id: 1,
    name: "文学研读圈",
    members: 12568
  }
};

// 模拟直播消息数据
const initialLiveMessages = [
  {
    id: 1,
    type: "host",
    content: "欢迎大家来到《百年孤独》深度解析直播间！今天我们将一起探讨这部伟大的作品。",
    time: "19:00",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Professor%20Avatar%20Male%20Literature&sign=504fe243e32ea0b706248fefeee0ac27",
    name: "张明"
  },
  {
    id: 2,
    type: "user",
    content: "教授好！我想了解一下魔幻现实主义手法在书中的具体体现。",
    time: "19:01",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Literature%20Lover&sign=7d4957ba875a438c96549fb404bf18a7",
    name: "文学爱好者",
    likes: 5
  },
  {
    id: 3,
    type: "host",
    content: "很好的问题！魔幻现实主义在《百年孤独》中的体现主要有三点：一是将神话、传说融入现实描写；二是时间的非线性叙述；三是人物与超自然现象的自然融合。例如，蕾梅黛丝升天的场景就是典型的魔幻现实主义手法。",
    time: "19:03",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Professor%20Avatar%20Male%20Literature&sign=504fe243e32ea0b706248fefeee0ac27",
    name: "张明"
  },
  {
    id: 4,
    type: "user",
    content: "请问布恩迪亚家族的孤独主题是如何贯穿全书的？",
    time: "19:05",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Book%20Lover&sign=049878cd026320bf183335b6562ef447",
    name: "书香满屋",
    likes: 12
  },
  {
    id: 5,
    type: "host",
    content: "布恩迪亚家族的孤独主题确实是全书的核心。每个家庭成员都在孤独中挣扎：奥雷里亚诺上校的孤独来自于战争与权力；阿玛兰妲的孤独源于对爱的恐惧；梅梅的孤独则是被现实的残酷所困...这种孤独不是个体的，而是整个家族、甚至整个人类的宿命写照。",
    time: "19:08",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Professor%20Avatar%20Male%20Literature&sign=504fe243e32ea0b706248fefeee0ac27",
    name: "张明"
  },
  {
    id: 6,
    type: "user",
    content: "送你一朵小花 🌼",
    time: "19:09",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Student&sign=be54ff69b7e47047e164b6efcfa76957",
    name: "文学学生",
    isGift: true
  },
  {
    id: 7,
    type: "user",
    content: "教授，书中重复出现的名字有什么特殊含义吗？",
    time: "19:10",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Writer&sign=feba9c846bf1ecef7825f95fc629a575",
    name: "小说创作者",
    likes: 8
  }
];

// 模拟问题列表数据
const initialQuestions = [
  {
    id: 1,
    content: "马尔克斯在创作《百年孤独》时受到了哪些文学流派的影响？",
    author: "文学研究者",
    authorAvatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Literature%20Researcher&sign=95c4df7f2471e7c533ab68102d5989ad",
    likes: 18,
    time: "19:02",
    isAnswered: false
  },
  {
    id: 2,
    content: "如何理解书中的时间循环概念？",
    author: "哲学爱好者",
    authorAvatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Philosophy%20Lover&sign=45ac2e1065732736ca0b84c0b20a2d9e",
    likes: 24,
    time: "19:04",
    isAnswered: false
  },
  {
    id: 3,
    content: "《百年孤独》对后来的文学创作有什么影响？",
    author: "青年作家",
    authorAvatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Young%20Writer&sign=dd2b5e774188d20e441f9009848969ea",
    likes: 12,
    time: "19:07",
    isAnswered: true
  }
];

// 模拟直播摘要数据
const liveSummary = [
  { id: 1, title: "魔幻现实主义的定义与特点", startTime: "19:03", duration: "5分钟" },
  { id: 2, title: "布恩迪亚家族的孤独主题分析", startTime: "19:08", duration: "8分钟" },
  { id: 3, title: "重复命名的象征意义", startTime: "19:15", duration: "6分钟" }
];

// 模拟精彩片段数据
const highlightMoments = [
  { id: 1, title: "蕾梅黛丝升天场景解析", startTime: "19:20" },
  { id: 2, title: "奥雷里亚诺上校的孤独一生", startTime: "19:35" },
  { id: 3, title: "家族预言的解读", startTime: "19:50" }
];

export default function LiveDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [liveDetail, setLiveDetail] = useState(mockLiveDetail);
  const [messages, setMessages] = useState(initialLiveMessages);
  const [questions, setQuestions] = useState(initialQuestions);
  const [newMessage, setNewMessage] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [activeTab, setActiveTab] = useState<"live" | "summary" | "highlights">("live");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<typeof messages>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const liveAreaRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 监听消息变化，自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 模拟新消息
  useEffect(() => {
    if (liveDetail.isLive) {
      const messageInterval = setInterval(() => {
        const newMsg = {
          id: messages.length + 1,
          type: "user",
          content: getRandomMessage(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: getRandomAvatar(),
          name: getRandomName(),
          likes: Math.floor(Math.random() * 10)
        };
        
        setMessages(prev => [...prev, newMsg]);
      }, 15000); // 每15秒添加一条新消息

      return () => clearInterval(messageInterval);
    }
  }, [liveDetail.isLive, messages.length]);

  // 模拟观看人数增长
  useEffect(() => {
    if (liveDetail.isLive) {
      const viewerInterval = setInterval(() => {
        setLiveDetail(prev => ({
          ...prev,
          viewers: prev.viewers + Math.floor(Math.random() * 5)
        }));
      }, 8000); // 每8秒增加一些观看人数

      return () => clearInterval(viewerInterval);
    }
  }, [liveDetail.isLive]);

  // 处理发送消息
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        type: "user",
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Portrait%20Silhouette&sign=45fd7dc39ab1727c4dd3e674074b5674",
        name: "我",
        likes: 0
      };
      
      setMessages(prev => [...prev, newMsg]);
      setNewMessage("");
    }
  };

  // 处理发送问题
  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      const newQ = {
        id: questions.length + 1,
        content: newQuestion,
        author: "我",
        authorAvatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Portrait%20Silhouette&sign=45fd7dc39ab1727c4dd3e674074b5674",
        likes: 0,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAnswered: false
      };
      
      setQuestions(prev => [newQ, ...prev]); // 新问题放在最前面
      setNewQuestion("");
      toast.success("问题已发送，等待嘉宾回答");
    }
  };

  // 处理点赞问题
  const handleLikeQuestion = (id: number) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === id ? { ...q, likes: q.likes + 1 } : q
      )
    );
  };

  // 处理搜索关键词
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      setIsSearching(true);
      // 模拟搜索延迟
      setTimeout(() => {
        const results = messages.filter(msg => 
          msg.content.includes(searchKeyword)
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
    }
  };

  // 格式化时间
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // 随机消息生成函数
  const getRandomMessage = () => {
    const messageTemplates = [
      "教授的讲解非常精彩！",
      "这个观点很有启发性，谢谢分享。",
      "我一直对这个问题很困惑，今天终于明白了。",
      "能否请教授再详细解释一下这个概念？",
      "这本书我读了三遍，每次都有新的收获。",
      "送你一朵小花 🌼",
      "感谢教授的精彩解读！",
      "这个角度很新颖，让人眼前一亮。"
    ];
    return messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
  };

  // 随机头像生成函数
  const getRandomAvatar = () => {
    const avatars = [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Reader&sign=8be63eb9b4a5e0b97cab03da20af7eaf",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Reader&sign=1de0a48c8195a2af9e0fca1b0bedcdf9",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Young%20Male%20Student&sign=4cd8e3f5919031dadbc2b96c1c50371c",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Middle%20Aged%20Woman&sign=3282a6497dfc461ab50256b0c84cf9f5"
    ];
    return avatars[Math.floor(Math.random() * avatars.length)];
  };

  // 随机用户名生成函数
  const getRandomName = () => {
    const names = [
      "文学爱好者", "读书达人", "小说迷", "诗歌创作者", 
      "古典文学研究者", "现代文学迷", "外国文学爱好者", "书评人"
    ];
    return names[Math.floor(Math.random() * names.length)];
  };

  return (
    <div className="min-h-screen bg-rice-paper text-ink flex flex-col">
      {/* 顶部信息栏 */}
      <div className="bg-white border-b border-silk-gray p-4 sticky top-16 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/live')}
              className="p-2 rounded-full hover:bg-silk-gray transition-colors mr-2"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <h1 
              className="text-xl font-bold text-glass-blue flex items-center"
              style={{ fontFamily: '"Noto Serif SC", serif' }}
            >
              {liveDetail.title}
              {liveDetail.isLive && (
                <span className="ml-2 text-xs px-2 py-0.5 bg-crabapple-red text-white rounded-full flex items-center">
                  <i className="fas fa-circle text-[6px] mr-1 animate-pulse"></i>正在直播
                </span>
              )}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-sm text-inkstone-gray">
              <i className="fas fa-eye mr-1"></i>
              <span>{liveDetail.viewers.toLocaleString()}人观看</span>
            </div>
            {!liveDetail.isLive && (
              <button 
                className="p-2 rounded-full hover:bg-silk-gray transition-colors"
                onClick={() => toast.info("分享功能已触发")}
              >
                <i className="fas fa-share-alt"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <main className="flex-1 container mx-auto p-4">
        {/* 直播存档与回顾标签页 */}
        {!liveDetail.isLive && (
          <div className="bg-white border-b border-silk-gray mb-4">
            <div className="flex">
              <button
                className={`py-3 px-6 text-sm font-medium border-b-2 ${activeTab === "live" ? "text-glass-blue border-glass-blue" : "text-inkstone-gray border-transparent"}`}
                onClick={() => setActiveTab("live")}
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                文字实录
              </button>
              <button
                className={`py-3 px-6 text-sm font-medium border-b-2 ${activeTab === "summary" ? "text-glass-blue border-glass-blue" : "text-inkstone-gray border-transparent"}`}
                onClick={() => setActiveTab("summary")}
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                智能摘要
              </button>
              <button
                className={`py-3 px-6 text-sm font-medium border-b-2 ${activeTab === "highlights" ? "text-glass-blue border-glass-blue" : "text-inkstone-gray border-transparent"}`}
                onClick={() => setActiveTab("highlights")}
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                精彩片段
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧 - 直播实况/文字实录 */}
          <div className={`col-span-1 ${liveDetail.isLive ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <div 
              className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden h-[calc(100vh-220px)] flex flex-col"
              ref={liveAreaRef}
            >
              {/* 直播标题区 */}
              <div className="p-4 border-b border-silk-gray bg-rice-paper/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={liveDetail.hostInfo.avatar} 
                      alt={liveDetail.hostInfo.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <h3 
                        className="text-base font-medium"
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        {liveDetail.hostInfo.name}
                      </h3>
                      <p className="text-xs text-inkstone-gray">{liveDetail.hostInfo.title}</p>
                    </div>
                  </div>
                  {liveDetail.isLive && (
                    <div className="flex items-center text-sm text-inkstone-gray">
                      <i className="fas fa-clock mr-1"></i>
                      <span>直播时长: {formatTime(Math.floor((Date.now() - new Date(liveDetail.startTime).getTime()) / (1000 * 60)))}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 直播内容区域 */}
              {activeTab === "live" && (
                <div className="flex-1 overflow-y-auto p-4">
                  {/* 关键词搜索（仅回放时显示） */}
                  {!liveDetail.isLive && (
                    <form onSubmit={handleSearch} className="mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="搜索关键词..."
                          value={searchKeyword}
                          onChange={e => setSearchKeyword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-silk-gray text-sm focus:outline-none focus:ring-2 focus:ring-glass-blue/30"
                        />
                        <i 
                          className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-inkstone-gray"
                        ></i>
                        <button 
                          type="submit"
                          disabled={isSearching}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors"
                        >
                          {isSearching ? '搜索中...' : '搜索'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* 搜索结果或消息列表 */}
                  {(isSearching || (searchKeyword && searchResults.length > 0)) ? (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-medium">搜索结果</h4>
                        <button 
                          onClick={() => {
                            setSearchKeyword("");
                            setSearchResults([]);
                          }}
                          className="text-xs text-glass-blue"
                        >
                          清除搜索
                        </button>
                      </div>
                      {searchResults.length > 0 ? (
                        searchResults.map(msg => (
                          <div 
                            key={msg.id} 
                            className={`mb-4 p-3 rounded-lg ${
                              msg.type === "host" ? "bg-glass-blue/10" : "bg-silk-gray/50"
                            }`}
                          >
                            <div className="flex items-start">
                              <img 
                                src={msg.avatar} 
                                alt={msg.name} 
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div className="ml-2 flex-1">
                                <div className="flex items-center">
                                  <span 
                                    className={`text-sm font-medium ${
                                      msg.type === "host" ? "text-glass-blue" : ""
                                    }`}
                                  >
                                    {msg.name}
                                    {msg.type === "host" && (
                                      <span className="ml-1 text-xs px-1.5 py-0.5 bg-glass-blue text-white rounded">嘉宾</span>
                                    )}
                                  </span>
                                  <span className="ml-2 text-xs text-inkstone-gray">{msg.time}</span>
                                </div>
                                <p className="text-sm mt-1">{msg.content}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10 text-inkstone-gray">
                          <i className="fas fa-search text-3xl mb-2"></i>
                          <p className="text-sm">未找到相关内容</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {messages.map(msg => (
                        <div 
                          key={msg.id} 
                          className={`mb-4 p-3 rounded-lg ${
                            msg.type === "host" ? "bg-glass-blue/10" : "bg-silk-gray/50"
                          }`}
                        >
                          <div className="flex items-start">
                            <img 
                              src={msg.avatar} 
                              alt={msg.name} 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="ml-2 flex-1">
                              <div className="flex items-center">
                                <span 
                                  className={`text-sm font-medium ${
                                    msg.type === "host" ? "text-glass-blue" : ""
                                  }`}
                                >
                                  {msg.name}
                                  {msg.type === "host" && (
                                    <span className="ml-1 text-xs px-1.5 py-0.5 bg-glass-blue text-white rounded">嘉宾</span>
                                  )}
                                  {msg.isGift && (
                                    <span className="ml-1 text-xs px-1.5 py-0.5 bg-autumn-yellow text-white rounded">礼物</span>
                                  )}
                                </span>
                                <span className="ml-2 text-xs text-inkstone-gray">{msg.time}</span>
                              </div>
                              <p className="text-sm mt-1">{msg.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>
              )}

              {/* 智能摘要 */}
              {activeTab === "summary" && (
                <div className="flex-1 overflow-y-auto p-4">
                  <h3 
                    className="text-lg font-medium mb-4"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    直播内容摘要
                  </h3>
                  <div className="space-y-4">
                    {liveSummary.map(summary => (
                      <motion.div
                        key={summary.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: summary.id * 0.1 }}
                        className="p-3 bg-silk-gray/50 rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-base font-medium">{summary.title}</h4>
                          <span className="text-xs text-inkstone-gray">{summary.startTime} ({summary.duration})</span>
                        </div>
                        <div className="flex items-center">
                          <button className="p-1.5 bg-glass-blue text-white rounded-full text-xs">
                            <i className="fas fa-play"></i>
                          </button>
                          <div className="ml-2 flex-1 h-1 bg-silk-gray rounded-full overflow-hidden">
                            <div className="h-full bg-glass-blue rounded-full" style={{ width: `${(summary.id / liveSummary.length) * 100}%` }}></div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* 精彩片段 */}
              {activeTab === "highlights" && (
                <div className="flex-1 overflow-y-auto p-4">
                  <h3 
                    className="text-lg font-medium mb-4"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    精彩片段
                  </h3>
                  <div className="space-y-4">
                    {highlightMoments.map(moment => (
                      <motion.div
                        key={moment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: moment.id * 0.1 }}
                        className="flex items-center p-3 bg-silk-gray/50 rounded-lg"
                      >
                        <button className="p-2 bg-glass-blue text-white rounded-full">
                          <i className="fas fa-play"></i>
                        </button>
                        <div className="ml-3 flex-1">
                          <h4 className="text-sm font-medium">{moment.title}</h4>
                          <p className="text-xs text-inkstone-gray">{moment.startTime}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* 消息输入框 */}
              {liveDetail.isLive && (
                <div className="p-4 border-t border-silk-gray">
                  <form onSubmit={handleSendMessage} className="flex items-center">
                    <input
                      type="text"
                      placeholder="发送消息..."
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      className="flex-1 px-4 py-2 bg-silk-gray rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-glass-blue/30 mr-2"
                    />
                    <div className="flex items-center gap-2">
                      <button 
                        type="button"
                        className="p-2 rounded-full hover:bg-silk-gray transition-colors"
                        onClick={() => toast.info("表情功能暂未实现")}
                      >
                        <i className="far fa-smile"></i>
                      </button>
                      <button 
                        type="button"
                        className="p-2 rounded-full hover:bg-silk-gray transition-colors"
                        onClick={() => {
                          setNewMessage(prev => prev + " 送你一朵小花 🌼");
                        }}
                      >
                        <i className="fas fa-gift text-autumn-yellow"></i>
                      </button>
                      <button 
                        type="submit"
                        disabled={!newMessage.trim()}
                        className={`px-4 py-2 bg-glass-blue text-white rounded-full text-sm hover:bg-opacity-90 transition-colors ${
                          !newMessage.trim() ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        发送
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* 右侧 - 提问区和嘉宾信息（仅直播时显示） */}
          {liveDetail.isLive && (
            <div className="col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden h-[calc(100vh-220px)] flex flex-col">
                {/* 嘉宾信息 */}
                <div className="p-4 border-b border-silk-gray bg-rice-paper/50">
                  <div className="flex items-center">
                    <img 
                      src={liveDetail.hostInfo.avatar} 
                      alt={liveDetail.hostInfo.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <h3 
                        className="text-base font-medium"
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        {liveDetail.hostInfo.name}
                      </h3>
                      <p className="text-xs text-inkstone-gray">{liveDetail.hostInfo.title}</p>
                    </div>
                  </div>
                  <p className="text-xs text-inkstone-gray mt-2">{liveDetail.hostInfo.bio}</p>
                </div>

                {/* 提问区标题 */}
                <div className="p-3 border-b border-silk-gray flex justify-between items-center">
                  <h3 
                    className="text-base font-medium"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    提问区
                  </h3>
                  <div className="flex items-center">
                    <span className="text-xs text-inkstone-gray mr-2">排序:</span>
                    <button className="text-xs px-2 py-0.5 bg-glass-blue text-white rounded-full">
                      热度
                    </button>
                  </div>
                </div>

                {/* 提问列表 */}
                <div className="flex-1 overflow-y-auto p-3">
                  {questions.length > 0 ? (
                    <div className="space-y-3">
                      {questions.map(q => (
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3 rounded-lg border ${
                            q.isAnswered ? 'border-bamboo-green bg-bamboo-green/10' : 'border-silk-gray bg-silk-gray/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <img 
                                src={q.authorAvatar} 
                                alt={q.author} 
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <span className="ml-2 text-xs font-medium">{q.author}</span>
                            </div>
                            <span className="text-xs text-inkstone-gray">{q.time}</span>
                          </div>
                          <p className="text-sm mb-2">{q.content}</p>
                          <div className="flex items-center">
                            <button 
                              onClick={() => handleLikeQuestion(q.id)}
                              className="flex items-center text-xs text-inkstone-gray hover:text-glass-blue transition-colors"
                            >
                              <i className="far fa-thumbs-up mr-1"></i>
                              <span>{q.likes}</span>
                            </button>
                            {q.isAnswered && (
                              <span className="ml-3 text-xs px-2 py-0.5 bg-bamboo-green text-white rounded-full">
                                已回答
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-inkstone-gray">
                      <i className="fas fa-question-circle text-3xl mb-2"></i>
                      <p className="text-sm">还没有提问，来问第一个问题吧</p>
                    </div>
                  )}
                </div>

                {/* 提问输入框 */}
                <div className="p-3 border-t border-silk-gray">
                  <form onSubmit={handleSendQuestion}>
                    <input
                      type="text"
                      placeholder="提出你的问题..."
                      value={newQuestion}
                      onChange={e => setNewQuestion(e.target.value)}
                      className="w-full px-4 py-2 bg-silk-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-glass-blue/30 mb-2"
                    />
                    <div className="flex justify-end">
                      <button 
                        type="submit"
                        disabled={!newQuestion.trim()}
                        className={`px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese ${
                          !newQuestion.trim() ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        提交问题
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}