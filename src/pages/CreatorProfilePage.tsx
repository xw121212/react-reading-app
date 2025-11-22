import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// 模拟作品数据
const worksData = [
  { id: 1, title: '活着的意义', coverUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Chinese%20Literature%20Book%20Cover&sign=d28f58106ee60d3fcb1a39a1c99bf0d0', reads: 12568, comments: 2342, likes: 9876, status: '连载中' },
  { id: 2, title: '都市微光', coverUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Urban%20Story%20Book%20Cover&sign=119a7e275beec097213cf0914ce6ee40', reads: 8973, comments: 1876, likes: 7654, status: '已完结' },
  { id: 3, title: '星辰大海', coverUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Science%20Fiction%20Book%20Cover%20Three-Body%20Problem&sign=2c3dd569615d42d4f637674ba2f9a492', reads: 5678, comments: 987, likes: 4567, status: '连载中' },
  { id: 4, title: '历史的尘埃', coverUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Historical%20Novel%20Book%20Cover&sign=1ff42744378d3ddabebb5a4b136022ed', reads: 3456, comments: 678, likes: 2345, status: '已完结' },
  { id: 5, title: '心灵之旅', coverUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Self%20Help%20Book%20Cover&sign=a0b923cab11b1c386388175d6b6159d7', reads: 4567, comments: 890, likes: 3456, status: '连载中' },
  { id: 6, title: '未来已来', coverUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Sci-Fi%20Future%20Technology%20Book%20Cover&sign=beb42efb8beda26c54e1f36d2817907b', reads: 6789, comments: 1234, likes: 5678, status: '草稿' },
];

// 模拟粉丝数据
const fansData = [
  { id: 1, name: '书香满屋', avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Book%20Lover&sign=049878cd026320bf183335b6562ef447', isOnline: true, isImportant: true },
  { id: 2, name: '文学爱好者', avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Literature%20Lover&sign=7d4957ba875a438c96549fb404bf18a7', isOnline: false, isImportant: false },
  { id: 3, name: '推理迷', avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Mystery%20Lover&sign=b60d377b123719dc7be842b29370aa45', isOnline: true, isImportant: false },
  { id: 4, name: '科幻探索者', avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Sci-Fi%20Enthusiast&sign=fe0a752ea3749cc13afab31461d2f1ac', isOnline: true, isImportant: true },
];

// 模拟收益数据
const revenueData = [
  { month: '1月', revenue: 1200 },
  { month: '2月', revenue: 1500 },
  { month: '3月', revenue: 1800 },
  { month: '4月', revenue: 1600 },
  { month: '5月', revenue: 2000 },
  { month: '6月', revenue: 2400 },
];

// 模拟创作分类数据
const categoryData = [
  { name: '小说', value: 65 },
  { name: '随笔', value: 20 },
  { name: '评论', value: 15 },
];

const COLORS = ['#3A7DA8', '#D15A5A', '#6BA86B'];

export default function CreatorProfilePage() {
  const [activeTab, setActiveTab] = useState<'works' | 'profile' | 'fans' | 'revenue'>('works');
  const [activeWorkFilter, setActiveWorkFilter] = useState<'all' | 'serializing' | 'completed' | 'draft'>('all');
  const navigate = useNavigate();
  
  const handleImportantToggle = (fanId: number) => {
    toast.info('已更新粉丝标记');
  };
  
  const handleWithdraw = () => {
    toast.info('提现功能即将上线');
  };
  
  const filteredWorks = worksData.filter(work => {
    if (activeWorkFilter === 'all') return true;
    if (activeWorkFilter === 'serializing') return work.status === '连载中';
    if (activeWorkFilter === 'completed') return work.status === '已完结';
    if (activeWorkFilter === 'draft') return work.status === '草稿';
    return true;
  });
  
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
              <i className="fas fa-user-edit mr-2"></i>创作者中心
            </h1>
          </div>
          <div className="flex gap-2">
            <button 
              className="px-4 py-2 border border-silk-gray text-inkstone-gray rounded-lg text-sm hover:bg-silk-gray transition-colors"
            >
              <i className="fas fa-cog mr-1"></i>设置
            </button>
            <button 
              className="px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
            >
              <i className="fas fa-pen-fancy mr-1"></i>开始创作
            </button>
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="bg-white border-b border-silk-gray sticky top-[7.5rem] z-10">
        <div className="container mx-auto flex overflow-x-auto hide-scrollbar">
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "works" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("works")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            作品集
            {activeTab === "works" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "profile" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("profile")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            创作者名片
            {activeTab === "profile" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "fans" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("fans")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            读者管理
            {activeTab === "fans" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "revenue" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("revenue")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            收益中心
            {activeTab === "revenue" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
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
            {/* 作品集 */}
            {activeTab === "works" && (
              <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                    我的作品集
                  </h3>
                  <div className="flex gap-2">
                    <button 
                      className={`px-3 py-1 rounded-md text-xs font-medium ${activeWorkFilter === 'all' ? 'bg-glass-blue text-white' : 'bg-silk-gray text-inkstone-gray'}`}
                      onClick={() => setActiveWorkFilter('all')}
                    >
                      全部
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-md text-xs font-medium ${activeWorkFilter === 'serializing' ? 'bg-glass-blue text-white' : 'bg-silk-gray text-inkstone-gray'}`}
                      onClick={() => setActiveWorkFilter('serializing')}
                    >
                      连载中
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-md text-xs font-medium ${activeWorkFilter === 'completed' ? 'bg-glass-blue text-white' : 'bg-silk-gray text-inkstone-gray'}`}
                      onClick={() => setActiveWorkFilter('completed')}
                    >
                      已完结
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-md text-xs font-medium ${activeWorkFilter === 'draft' ? 'bg-glass-blue text-white' : 'bg-silk-gray text-inkstone-gray'}`}
                      onClick={() => setActiveWorkFilter('draft')}
                    >
                      草稿
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {/* 添加新作品按钮 */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <button 
                      className="w-full h-full aspect-[2/3] border-2 border-dashed border-silk-gray rounded-xl flex flex-col items-center justify-center hover:border-glass-blue hover:bg-glass-blue/5 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-glass-blue/10 flex items-center justify-center text-glass-blue mb-2">
                        <i className="fas fa-plus text-xl"></i>
                      </div>
                      <span className="text-sm text-inkstone-gray">添加新作品</span>
                    </button>
                  </motion.div>
                  
                  {/* 作品展示 */}
                  {filteredWorks.map((work, index) => (
                    <motion.div
                      key={work.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="relative aspect-[2/3] mb-2 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <img 
                          src={work.coverUrl} 
                          alt={work.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-ink text-xs px-2 py-1 rounded-full">
                          {work.status}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                          <div className="p-3 w-full">
                            <div className="flex justify-between items-center">
                              <button className="px-2 py-1 bg-white text-ink text-xs rounded-lg hover:bg-opacity-90 transition-colors">
                                <i className="fas fa-edit mr-1"></i>编辑
                              </button>
                              <button className="px-2 py-1 bg-white text-ink text-xs rounded-lg hover:bg-opacity-90 transition-colors">
                                <i className="fas fa-chart-line mr-1"></i>数据
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h4 
                        className="font-medium text-center" 
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        {work.title}
                      </h4>
                      <div className="flex justify-center items-center mt-1 text-xs text-inkstone-gray">
                        <span className="flex items-center mr-2">
                          <i className="fas fa-eye mr-1"></i> {work.reads.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <i className="fas fa-thumbs-up mr-1"></i> {work.likes.toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {filteredWorks.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-silk-gray flex items-center justify-center text-inkstone-gray">
                      <i className="fas fa-book text-2xl"></i>
                    </div>
                    <p className="text-inkstone-gray" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      暂无{activeWorkFilter === 'serializing' ? '连载中' : activeWorkFilter === 'completed' ? '已完结' : '草稿'}作品
                    </p>
                    <button className="mt-3 px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese">
                      <i className="fas fa-plus mr-1"></i>添加新作品
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* 创作者名片 */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                <div className="flex flex-col md:flex-row md:items-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto md:mx-0 mb-4 md:mb-0 md:mr-6">
                    <img 
                      src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Author%20Portrait%20Professional&sign=b96582b3cf6739d78eb7cfaa051b3454" 
                      alt="创作者头像" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                          笔名：墨香
                        </h3>
                        <p className="text-inkstone-gray">作家 · 文学爱好者 · 推理小说迷</p>
                      </div>
                      <button className="mt-3 md:mt-0 px-4 py-2 border border-silk-gray rounded-lg text-sm hover:bg-silk-gray transition-colors">
                        <i className="fas fa-edit mr-1"></i>编辑资料
                      </button>
                    </div>
                    <div className="flex justify-center md:justify-start gap-4 mt-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-glass-blue">1.2k</p>
                        <p className="text-xs text-inkstone-gray">粉丝</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-glass-blue">6</p>
                        <p className="text-xs text-inkstone-gray">作品</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-glass-blue">24.5k</p>
                        <p className="text-xs text-inkstone-gray">总阅读</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h4 className="font-medium mb-3" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      个人简介
                    </h4>
                    <div className="p-4 bg-rice-paper rounded-lg mb-6">
                      <p className="text-sm leading-relaxed" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                        热爱文学创作，擅长推理小说和科幻题材，希望通过文字传递思考与感动。创作理念是"用故事探索人性，用文字传递温暖"。已出版《活着的意义》《都市微光》等多部作品，深受读者喜爱。
                      </p>
                    </div>
                    
                    <h4 className="font-medium mb-3" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      擅长题材
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1.5 bg-glass-blue/10 text-glass-blue rounded-full text-sm">推理小说</span>
                      <span className="px-3 py-1.5 bg-glass-blue/10 text-glass-blue rounded-full text-sm">科幻文学</span>
                      <span className="px-3 py-1.5 bg-glass-blue/10 text-glass-blue rounded-full text-sm">都市情感</span>
                      <span className="px-3 py-1.5 bg-glass-blue/10 text-glass-blue rounded-full text-sm">历史传奇</span>
                      <span className="px-3 py-1.5 bg-glass-blue/10 text-glass-blue rounded-full text-sm">心灵成长</span>
                    </div>
                    
                    <h4 className="font-medium mb-3" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      创作理念
                    </h4>
                    <div className="p-4 bg-rice-paper rounded-lg">
                      <p className="text-sm leading-relaxed" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                        "我相信好的故事不仅能带给读者娱乐，更能引发思考。每一个角色都有自己的灵魂，每一段情节都应该有其存在的意义。我希望通过我的作品，让读者在阅读中找到共鸣，在故事中感受生活的美好与温暖。"
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      创作数据
                    </h4>
                    <div className="bg-rice-paper rounded-lg p-4 mb-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">创作总字数</span>
                            <span className="text-sm font-medium">56.8万字</span>
                          </div>
                          <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                            <div className="h-full bg-glass-blue rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">完本率</span>
                            <span className="text-sm font-medium">67%</span>
                          </div>
                          <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                            <div className="h-full bg-bamboo-green rounded-full" style={{ width: '67%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">月更新频率</span>
                            <span className="text-sm font-medium">12-15章</span>
                          </div>
                          <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                            <div className="h-full bg-autumn-yellow rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-3" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      创作分类
                    </h4>
                    <div className="bg-rice-paper rounded-lg p-4">
                      <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={60}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                              labelLine={false}
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value) => [`${value}%`, '占比']}
                              contentStyle={{
                                backgroundColor: "white",
                                borderColor: "#E8E4D9",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 读者管理 */}
            {activeTab === "fans" && (
              <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                    读者管理
                  </h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="搜索读者..."
                        className="pl-8 pr-4 py-1.5 bg-silk-gray text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-glass-blue/30"
                      />
                      <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-inkstone-gray"></i>
                    </div>
                    <button className="p-1.5 bg-silk-gray rounded-full text-inkstone-gray hover:text-glass-blue transition-colors">
                      <i className="fas fa-filter"></i>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                        粉丝列表 (1,245)
                      </h4>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-glass-blue text-white text-xs rounded-full">
                          全部
                        </button>
                        <button className="px-3 py-1 bg-white border border-silk-gray text-xs text-inkstone-gray rounded-full hover:bg-silk-gray/50 transition-colors">
                          重要读者
                        </button>
                        <button className="px-3 py-1 bg-white border border-silk-gray text-xs text-inkstone-gray rounded-full hover:bg-silk-gray/50 transition-colors">
                          今日新增
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {fansData.map(fan => (
                        <div key={fan.id} className="flex items-center justify-between p-3 border border-silk-gray rounded-lg hover:bg-silk-gray/30 transition-colors">
                          <div className="flex items-center">
                            <div className="relative">
                              <img 
                                src={fan.avatar} 
                                alt={fan.name} 
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              {fan.isOnline && (
                                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-bamboo-green rounded-full border-2 border-white"></span>
                              )}
                            </div>
                            <div className="ml-3">
                              <div className="flex items-center">
                                <h5 className="font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                                  {fan.name}
                                </h5>
                                {fan.isImportant && (
                                  <span className="ml-2 text-xs px-2 py-0.5 bg-crabapple-red/10 text-crabapple-red rounded-full flex items-center">
                                    <i className="fas fa-star text-[8px] mr-1"></i>重要
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center mt-1 text-xs text-inkstone-gray">
                                <span className="mr-3">粉丝等级：Lv.4</span>
                                <span className="mr-3">关注时长：3个月</span>
                                <span>互动次数：42次</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleImportantToggle(fan.id)}
                              className={`p-1.5 rounded-full ${
                                fan.isImportant ? 'bg-crabapple-red/10 text-crabapple-red' : 'bg-silk-gray text-inkstone-gray hover:text-glass-blue'
                              } transition-colors`}
                            >
                              <i className={`fas ${fan.isImportant ? 'fa-star' : 'fa-star'}`}></i>
                            </button>
                            <button className="p-1.5 rounded-full bg-silk-gray text-inkstone-gray hover:text-glass-blue transition-colors">
                              <i className="fas fa-comment"></i>
                            </button>
                            <button className="p-1.5 rounded-full bg-silk-gray text-inkstone-gray hover:text-glass-blue transition-colors">
                              <i className="fas fa-ellipsis-v"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center mt-6">
                      <button className="px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors">
                        加载更多
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      粉丝增长趋势
                    </h4>
                    <div className="bg-rice-paper rounded-lg p-4 mb-6">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D9" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: "white",
                                borderColor: "#E8E4D9",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                              }}
                              formatter={(value) => [`${value}人`, '新增粉丝']}
                            />
                            <Bar dataKey="revenue" fill="#3A7DA8" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-3" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      读者画像
                    </h4>
                    <div className="bg-rice-paper rounded-lg p-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">18-25岁</span>
                            <span className="text-sm">45%</span>
                          </div>
                          <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                            <div className="h-full bg-glass-blue rounded-full" style={{ width: '45%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">26-35岁</span>
                            <span className="text-sm">35%</span>
                          </div>
                          <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                            <div className="h-full bg-glass-blue rounded-full" style={{ width: '35%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">36-45岁</span>
                            <span className="text-sm">15%</span>
                          </div>
                          <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                            <div className="h-full bg-glass-blue rounded-full" style={{ width: '15%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">46岁以上</span>
                            <span className="text-sm">5%</span>
                          </div>
                          <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                            <div className="h-full bg-glass-blue rounded-full" style={{ width: '5%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 收益中心 */}
            {activeTab === "revenue" && (
              <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                    收益中心
                  </h3>
                  <button 
                    onClick={handleWithdraw}
                    className="px-4 py-2 bg-crabapple-red text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors"
                  >
                    <i className="fas fa-wallet mr-1"></i>申请提现
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-4 border border-silk-gray rounded-xl text-center"
                  >
                    <p className="text-inkstone-gray text-sm mb-1">累计收益</p>
                    <h4 className="text-2xl font-bold text-glass-blue">¥12,680</h4>
                    <p className="text-xs text-bamboo-green mt-1">
                      <i className="fas fa-arrow-up mr-1"></i> 较上月增长 23.1%
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-4 border border-silk-gray rounded-xl text-center"
                  >
                    <p className="text-inkstone-gray text-sm mb-1">本月收益</p>
                    <h4 className="text-2xl font-bold text-glass-blue">¥2,450</h4>
                    <p className="text-xs text-bamboo-green mt-1">
                      <i className="fas fa-arrow-up mr-1"></i> 较上月增长 12.5%
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-4 border border-silk-gray rounded-xl text-center"
                  >
                    <p className="text-inkstone-gray text-sm mb-1">可提现金额</p>
                    <h4 className="text-2xl font-bold text-crabapple-red">¥8,340</h4>
                    <p className="text-xs text-inkstone-gray mt-1">
                      满¥100即可提现
                    </p>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h4 className="font-medium mb-4" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      收益明细
                    </h4>
                    <div className="border border-silk-gray rounded-xl overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-rice-paper">
                            <th className="py-3 px-4 text-left text-sm font-medium text-inkstone-gray">日期</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-inkstone-gray">来源</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-inkstone-gray">作品</th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-inkstone-gray">金额</th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-inkstone-gray">状态</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-silk-gray">
                            <td className="py-3 px-4 text-sm">2025-11-20</td>
                            <td className="py-3 px-4 text-sm">付费阅读</td>
                            <td className="py-3 px-4 text-sm">活着的意义</td>
                            <td className="py-3 px-4 text-sm text-right font-medium">¥328.50</td>
                            <td className="py-3 px-4 text-sm text-right">
                              <span className="text-xs px-2 py-0.5 bg-bamboo-green/10 text-bamboo-green rounded-full">已结算</span>
                            </td>
                          </tr>
                          <tr className="border-t border-silk-gray">
                            <td className="py-3 px-4 text-sm">2025-11-19</td>
                            <td className="py-3 px-4 text-sm">读者打赏</td>
                            <td className="py-3 px-4 text-sm">星辰大海</td>
                            <td className="py-3 px-4 text-sm text-right font-medium">¥156.00</td>
                            <td className="py-3 px-4 text-sm text-right">
                              <span className="text-xs px-2 py-0.5 bg-bamboo-green/10 text-bamboo-green rounded-full">已结算</span>
                            </td>
                          </tr>
                          <tr className="border-t border-silk-gray">
                            <td className="py-3 px-4 text-sm">2025-11-18</td>
                            <td className="py-3 px-4 text-sm">会员分成</td>
                            <td className="py-3 px-4 text-sm">活着的意义</td>
                            <td className="py-3 px-4 text-sm text-right font-medium">¥459.20</td>
                            <td className="py-3 px-4 text-sm text-right">
                              <span className="text-xs px-2 py-0.5 bg-bamboo-green/10 text-bamboo-green rounded-full">已结算</span>
                            </td>
                          </tr>
                          <tr className="border-t border-silk-gray">
                            <td className="py-3 px-4 text-sm">2025-11-17</td>
                            <td className="py-3 px-4 text-sm">付费阅读</td>
                            <td className="py-3 px-4 text-sm">都市微光</td>
                            <td className="py-3 px-4 text-sm text-right font-medium">¥287.80</td>
                            <td className="py-3 px-4 text-sm text-right">
                              <span className="text-xs px-2 py-0.5 bg-glass-blue/10 text-glass-blue rounded-full">处理中</span>
                            </td>
                          </tr>
                          <tr className="border-t border-silk-gray">
                            <td className="py-3 px-4 text-sm">2025-11-16</td>
                            <td className="py-3 px-4 text-sm">读者打赏</td>
                            <td className="py-3 px-4 text-sm">活着的意义</td>
                            <td className="py-3 px-4 text-sm text-right font-medium">¥98.00</td>
                            <td className="py-3 px-4 text-sm text-right">
                              <span className="text-xs px-2 py-0.5 bg-glass-blue/10 text-glass-blue rounded-full">处理中</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="text-center mt-6">
                      <button className="px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors">
                        查看更多记录
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      收益分析
                    </h4>
                    <div className="bg-rice-paper rounded-lg p-4 mb-6">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D9" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: "white",
                                borderColor: "#E8E4D9",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                              }}
                              formatter={(value) => [`¥${value}`, '收益']}
                            />
                            <Bar dataKey="revenue" fill="#3A7DA8" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-3" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      收益构成
                    </h4>
                    <div className="bg-rice-paper rounded-lg p-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">付费阅读</span>
                            <span className="text-sm font-medium">65%</span>
                          </div>
                          <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                            <div className="h-full bg-glass-blue rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">读者打赏</span>
                            <span className="text-sm font-medium">20%</span>
                          </div>
                          <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                            <div className="h-full bg-crabapple-red rounded-full" style={{ width: '20%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">会员分成</span>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                          <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                            <div className="h-full bg-bamboo-green rounded-full" style={{ width: '15%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}