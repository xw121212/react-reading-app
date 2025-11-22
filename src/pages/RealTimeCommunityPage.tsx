import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// 模拟创作动态
const creationUpdates = [
  {
    id: 1,
    user: {
      name: '墨香',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Author%20Portrait%20Professional&sign=b96582b3cf6739d78eb7cfaa051b3454',
      title: '作家'
    },
    content: '今天写到《活着的意义》第三章了，这一章将揭示主角的内心挣扎，敬请期待！',
    time: '10分钟前',
    likes: 45,
    comments: 12,
    type: 'update'
  },
  {
    id: 2,
    user: {
      name: '书香满屋',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Book%20Lover&sign=049878cd026320bf183335b6562ef447',
      title: '文学爱好者'
    },
    content: '求助各位老师，如何更好地塑造反派角色？我正在写一部推理小说，但总觉得反派不够立体。',
    time: '30分钟前',
    likes: 23,
    comments: 18,
    type: 'help'
  },
  {
    id: 3,
    user: {
      name: '科幻探索者',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Sci-Fi%20Enthusiast&sign=fe0a752ea3749cc13afab31461d2f1ac',
      title: '科幻作家'
    },
    content: '【投票】下一部作品你们希望我写哪种题材？',
    poll: [
      { id: 1, option: '太空歌剧', votes: 45 },
      { id: 2, option: '赛博朋克', votes: 32 },
      { id: 3, option: '后启示录', votes: 28 }
    ],
    time: '1小时前',
    likes: 56,
    comments: 15,
    type: 'poll'
  },
  {
    id: 4,
    user: {
      name: '文学爱好者',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Literature%20Lover&sign=7d4957ba875a438c96549fb404bf18a7',
      title: '创作者'
    },
    content: '分享一下我的写作环境，大家觉得怎么样？有没有什么建议？',
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Writers%20Workspace%20Desk%20with%20Books%20and%20Notebook&sign=62c4489caf35a09f68046e233418b0f1',
    time: '2小时前',
    likes: 34,
    comments: 9,
    type: 'share'
  }
];

// 模拟读者讨论
const readerDiscussions = [
  {
    id: 1,
    work: {
      title: '活着的意义',
      author: '墨香'
    },
    topic: '第三章结尾的伏笔分析',
    starter: {
      name: '推理迷',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Mystery%20Lover&sign=b60d377b123719dc7be842b29370aa45'
    },
    content: '第三章结尾主角看到的那个神秘人物，是不是后面的关键线索？感觉像是在为后续剧情做铺垫。',
    time: '30分钟前',
    replies: 8,
    views: 42
  },
  {
    id: 2,
    work: {
      title: '都市微光',
      author: '墨香'
    },
    topic: '关于女主角的人物塑造',
    starter: {
      name: '书香满屋',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Book%20Lover&sign=049878cd026320bf183335b6562ef447'
    },
    content: '女主角的性格变化很真实，从最初的柔弱到后来的坚强，作者刻画得很到位。',
    time: '1小时前',
    replies: 12,
    views: 68
  },
  {
    id: 3,
    work: {
      title: '星辰大海',
      author: '墨香'
    },
    topic: '对未来科技的想象',
    starter: {
      name: '科幻探索者',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Sci-Fi%20Enthusiast&sign=fe0a752ea3749cc13afab31461d2f1ac'
    },
    content: '书中关于曲速引擎的描写很有创意，结合了现实物理理论，又加入了有趣的想象。',
    time: '2小时前',
    replies: 6,
    views: 35
  }
];

export default function RealTimeCommunityPage() {
  const [activeTab, setActiveTab] = useState<'updates' | 'discussions'>('updates');
  const navigate = useNavigate();
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState<'update' | 'help' | 'poll'>('update');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  
  // 切换评论展开状态
  const toggleComments = (postId: number) => {
    setExpandedComments(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId]
    );
  };
  
  // 切换点赞状态
  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId]
    );
  };
  
  // 添加投票选项
  const addPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, '']);
    }
  };
  
  // 删除投票选项
  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };
  
  // 更新投票选项内容
  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };
  
  // 提交新内容
  const submitNewPost = () => {
    if (!newPostContent.trim()) {
      toast.error('请输入内容');
      return;
    }
    
    if (selectedPostType === 'poll') {
      const validOptions = pollOptions.filter(option => option.trim());
      if (validOptions.length < 2) {
        toast.error('请至少添加两个投票选项');
        return;
      }
    }
    
    toast.success('发布成功！');
    setShowNewPostModal(false);
    setNewPostContent('');
    setSelectedPostType('update');
    setPollOptions(['', '']);
  };
  
  // 模拟接收新消息
  useEffect(() => {
    const interval = setInterval(() => {
      // 随机模拟新消息通知
      if (Math.random() > 0.7) {
        toast.info('有新的创作动态，点击查看');
      }
    }, 30000); // 每30秒检查一次
    
    return () => clearInterval(interval);
  }, []);
  
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
              <i className="fas fa-comments mr-2"></i>实时创作社区
            </h1>
          </div>
          <button
            onClick={() => setShowNewPostModal(true)}
            className="px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            <i className="fas fa-plus mr-1"></i>发布动态
          </button>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="bg-white border-b border-silk-gray sticky top-[7.5rem] z-10">
        <div className="container mx-auto flex overflow-x-auto hide-scrollbar">
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "updates" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("updates")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            创作动态
            {activeTab === "updates" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "discussions" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("discussions")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            读者讨论
            {activeTab === "discussions" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
        </div>
      </div>

      {/* 主内容区域 */}
      <main className="flex-1 container mx-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -20
            }}
            transition={{
              duration: 0.3
            }}
            className="mt-4"
          >
            {/* 创作动态 */}
            {activeTab === "updates" && (
              <div className="space-y-4">
                {creationUpdates.map((update, index) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <img 
                          src={update.user.avatar} 
                          alt={update.user.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-3">
                          <div className="flex items-center">
                            <span 
                              className="text-sm font-medium"
                              style={{ fontFamily: '"Noto Serif SC", serif' }}
                            >
                              {update.user.name}
                            </span>
                            <span className="ml-2 text-xs px-2 py-0.5 bg-silk-gray rounded-full text-inkstone-gray">
                              {update.user.title}
                            </span>
                          </div>
                          <span className="text-xs text-inkstone-gray">{update.time}</span>
                        </div>
                      </div>
                      
                      {update.type === 'poll' ? (
                        <div>
                          <p 
                            className="text-sm mb-4"
                            style={{ fontFamily: '"Noto Serif SC", serif' }}
                          >
                            {update.content}
                          </p>
                          <div className="space-y-3 mb-4">
                            {update.poll?.map(option => (
                              <div key={option.id} className="p-3 bg-silk-gray/30 rounded-lg hover:bg-silk-gray/50 transition-colors cursor-pointer">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm">{option.option}</span>
                                  <span className="text-xs text-inkstone-gray">{option.votes}票</span>
                                </div>
                                <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-glass-blue rounded-full"style={{ width: `${(option.votes / update.poll.reduce((sum, opt) => sum + opt.votes, 0)) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p 
                            className="text-sm mb-3"
                            style={{ fontFamily: '"Noto Serif SC", serif' }}
                          >
                            {update.content}
                          </p>
                          {update.image && (
                            <div className="rounded-lg overflow-hidden mb-3">
                              <img 
                                src={update.image} 
                                alt="Shared image" 
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center pt-3 border-t border-silk-gray">
                        <div className="flex gap-4">
                          <button 
                            onClick={() => toggleLike(update.id)}
                            className={`flex items-center gap-1 text-sm transition-colors ${
                              likedPosts.includes(update.id) ? 'text-crabapple-red' : 'text-inkstone-gray hover:text-crabapple-red'
                            }`}
                          >
                            <i className={likedPosts.includes(update.id) ? 'fas fa-heart' : 'far fa-heart'}></i>
                            <span>{likedPosts.includes(update.id) ? update.likes + 1 : update.likes}</span>
                          </button>
                          <button 
                            onClick={() => toggleComments(update.id)}
                            className="flex items-center gap-1 text-sm text-inkstone-gray hover:text-glass-blue transition-colors"
                          >
                            <i className="far fa-comment"></i>
                            <span>{update.comments}</span>
                          </button>
                        </div>
                        <button className="text-inkstone-gray hover:text-glass-blue transition-colors">
                          <i className="fas fa-share-alt"></i>
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {expandedComments.includes(update.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 border-t border-silk-gray mt-3">
                              {/* 评论输入框 */}
                              <div className="flex items-start mb-3">
                                <img 
                                  src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Portrait%20Silhouette&sign=45fd7dc39ab1727c4dd3e674074b5674" 
                                  alt="Your avatar" 
                                  className="w-8 h-8 rounded-full object-cover mt-1"
                                />
                                <div className="flex-1 ml-2">
                                  <input
                                    type="text"
                                    placeholder="写下你的评论..."
                                    className="w-full px-4 py-2 bg-silk-gray rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-glass-blue/30"
                                  />
                                </div>
                              </div>
                              
                              {/* 评论列表 */}
                              <div className="space-y-3">
                                <div className="flex items-start">
                                  <img 
                                    src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Literature%20Lover&sign=7d4957ba875a438c96549fb404bf18a7" 
                                    alt="Comment author" 
                                    className="w-8 h-8 rounded-full object-cover mt-1"
                                  />
                                  <div className="ml-2 flex-1">
                                    <div className="bg-silk-gray rounded-lg p-2">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium">文学爱好者</span>
                                        <span className="text-xs text-inkstone-gray">5分钟前</span>
                                      </div>
                                      <p className="text-sm">期待更新！第三章一定会很精彩。</p>
                                    </div>
                                    <div className="flex items-center mt-1 ml-1 text-xs text-inkstone-gray">
                                      <button className="hover:text-glass-blue transition-colors mr-3">回复</button>
                                      <button className="hover:text-glass-blue transition-colors mr-3">点赞</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
                
                <div className="text-center">
                  <button className="px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors">
                    加载更多
                  </button>
                </div>
              </div>
            )}
            
            {/* 读者讨论 */}
            {activeTab === "discussions" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-4 mb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-silk-gray flex items-center justify-center text-inkstone-gray mr-3">
                      <i className="fas fa-search"></i>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="搜索讨论话题..."
                        className="w-full px-4 py-2 bg-silk-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-glass-blue/30"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 bg-glass-blue text-white text-xs rounded-full">全部</button>
                    <button className="px-3 py-1 bg-white border border-silk-gray text-xs text-inkstone-gray rounded-full hover:bg-silk-gray/50 transition-colors">活着的意义</button>
                    <button className="px-3 py-1 bg-white border border-silk-gray text-xs text-inkstone-gray rounded-full hover:bg-silk-gray/50 transition-colors">都市微光</button>
                    <button className="px-3 py-1 bg-white border border-silk-gray text-xs text-inkstone-gray rounded-full hover:bg-silk-gray/50 transition-colors">星辰大海</button>
                    <button className="px-3 py-1 bg-white border border-silk-gray text-xs text-inkstone-gray rounded-full hover:bg-silk-gray/50 transition-colors">创作技巧</button>
                    <button className="px-3 py-1 bg-white border border-silk-gray text-xs text-inkstone-gray rounded-full hover:bg-silk-gray/50 transition-colors">读者反馈</button>
                  </div>
                </div>
                
                {readerDiscussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="px-2 py-1 bg-glass-blue/10 text-glass-blue text-xs rounded-full">
                          {discussion.work.title}
                        </div>
                        <span className="mx-2 text-inkstone-gray">·</span>
                        <span className="text-xs text-inkstone-gray">作者：{discussion.work.author}</span>
                      </div>
                      
                      <h4 
                        className="text-base font-medium mb-3"
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        {discussion.topic}
                      </h4>
                      
                      <div className="flex mb-3">
                        <img 
                          src={discussion.starter.avatar} 
                          alt={discussion.starter.name} 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="ml-2 flex-1">
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-medium">{discussion.starter.name}</span>
                            <span className="ml-2 text-xs text-inkstone-gray">{discussion.time}</span>
                          </div>
                          <p 
                            className="text-sm"
                            style={{ fontFamily: '"Noto Serif SC", serif' }}
                          >
                            {discussion.content}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-silk-gray">
                        <div className="flex items-center text-xs text-inkstone-gray">
                          <span className="flex items-center mr-3">
                            <i className="fas fa-reply mr-1"></i> {discussion.replies}条回复
                          </span>
                          <span className="flex items-center">
                            <i className="fas fa-eye mr-1"></i> {discussion.views}次浏览
                          </span>
                        </div>
                        <button className="px-3 py-1 bg-glass-blue text-white text-xs rounded-full hover:bg-opacity-90 transition-colors">
                          参与讨论
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <div className="text-center">
                  <button className="px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors">
                    加载更多讨论
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* 发布新内容弹窗 */}
      <AnimatePresence>
        {showNewPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowNewPostModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                  发布创作动态
                </h3>
                <button 
                  onClick={() => setShowNewPostModal(false)}
                  className="p-1 rounded-full hover:bg-silk-gray transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="flex items-center mb-4">
                <img 
                  src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Portrait%20Silhouette&sign=45fd7dc39ab1727c4dd3e674074b5674" 
                  alt="Your avatar" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <span className="font-medium">你的昵称</span>
                  <p className="text-xs text-inkstone-gray">作为创作者发布</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex mb-3">
                  <button 
                    className={`flex-1 py-2 text-center text-sm font-medium border-b-2 ${
                      selectedPostType === 'update' ? 'text-glass-blue border-glass-blue' : 'text-inkstone-gray border-transparent'
                    }`}
                    onClick={() => setSelectedPostType('update')}
                  >
                    <i className="fas fa-edit mr-1"></i>创作更新
                  </button>
                  <button 
                    className={`flex-1 py-2 text-center text-sm font-medium border-b-2 ${
                      selectedPostType === 'help' ? 'text-glass-blue border-glass-blue' : 'text-inkstone-gray border-transparent'
                    }`}
                    onClick={() => setSelectedPostType('help')}
                  >
                    <i className="fas fa-question-circle mr-1"></i>寻求帮助
                  </button>
                  <button 
                    className={`flex-1 py-2 text-center text-sm font-medium border-b-2 ${
                      selectedPostType === 'poll' ? 'text-glass-blue border-glass-blue' : 'text-inkstone-gray border-transparent'
                    }`}
                    onClick={() => setSelectedPostType('poll')}
                  >
                    <i className="fas fa-chart-pie mr-1"></i>发起投票
                  </button>
                </div>
                
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder={
                    selectedPostType === 'update' 
                      ? '分享你的创作进度或心得...' 
                      : selectedPostType === 'help'
                        ? '描述你遇到的问题，寻求大家的帮助...'
                        : '发起一个投票，了解读者的想法...'
                  }
                  className="w-full px-4 py-3 bg-silk-gray/50 border border-silk-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-glass-blue/30 transition-all resize-none min-h-[120px]"
                  maxLength={500}
                ></textarea>
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-inkstone-gray">{newPostContent.length}/500</span>
                </div>
              </div>
              
              {selectedPostType === 'poll' && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-3">投票选项</p>
                  <div className="space-y-2">
                    {pollOptions.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updatePollOption(index, e.target.value)}
                          placeholder={`选项 ${index + 1}`}
                          className="flex-1 px-4 py-2 bg-silk-gray/50 border border-silk-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-glass-blue/30"
                        />
                        {pollOptions.length > 2 && (
                          <button 
                            onClick={() => removePollOption(index)}
                            className="ml-2 p-2 text-inkstone-gray hover:text-crabapple-red transition-colors"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {pollOptions.length < 5 && (
                    <button 
                      onClick={addPollOption}
                      className="mt-2 w-full py-2 text-sm text-glass-blue hover:bg-glass-blue/5 transition-colors flex items-center justify-center"
                    >
                      <i className="fas fa-plus mr-1"></i>添加选项
                    </button>
                  )}
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="p-2 text-inkstone-gray hover:text-glass-blue transition-colors">
                    <i className="far fa-image"></i>
                  </button>
                  <button className="p-2 text-inkstone-gray hover:text-glass-blue transition-colors">
                    <i className="far fa-smile"></i>
                  </button>
                </div>
                <button 
                  onClick={submitNewPost}
                  className="px-5 py-2.5 bg-glass-blue text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors btn-chinese"
                >
                  发布
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}