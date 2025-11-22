import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

// 模拟数据统计
const performanceData = [
  { name: '周一', reads: 400, comments: 240, likes: 180, shares: 60 },
  { name: '周二', reads: 300, comments: 139, likes: 230, shares: 50 },
  { name: '周三', reads: 200, comments: 980, likes: 390, shares: 70 },
  { name: '周四', reads: 278, comments: 390, likes: 480, shares: 90 },
  { name: '周五', reads: 189, comments: 480, likes: 380, shares: 120 },
  { name: '周六', reads: 239, comments: 380, likes: 430, shares: 150 },
  { name: '周日', reads: 349, comments: 430, likes: 340, shares: 130 },
];

// 模拟读者增长数据
const followerGrowthData = [
  { month: '1月', followers: 400 },
  { month: '2月', followers: 600 },
  { month: '3月', followers: 800 },
  { month: '4月', followers: 1000 },
  { month: '5月', followers: 1300 },
  { month: '6月', followers: 1800 },
];

// 模拟收益数据
const revenueData = [
  { name: '付费阅读', value: 65 },
  { name: '打赏', value: 20 },
  { name: '会员分成', value: 15 },
];

// 模拟作品数据
const worksData = [
  { id: 1, title: '活着的意义', status: '连载中', reads: 12568, comments: 2342, likes: 9876, progress: 65 },
  { id: 2, title: '都市微光', status: '已完结', reads: 8973, comments: 1876, likes: 7654, progress: 100 },
  { id: 3, title: '星辰大海', status: '草稿', reads: 0, comments: 0, likes: 0, progress: 25 },
];

// 模拟读者评论
const recentComments = [
  { id: 1, user: '书香满屋', content: '这篇文章写得真好，很有见地！', work: '活着的意义', time: '10分钟前' },
  { id: 2, user: '文学爱好者', content: '期待后续更新，写得太精彩了！', work: '活着的意义', time: '1小时前' },
  { id: 3, user: '小说迷', content: '人物塑造很成功，情节紧凑', work: '都市微光', time: '2小时前' },
];

const COLORS = ['#3A7DA8', '#D15A5A', '#6BA86B'];

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'works' | 'inspiration' | 'comments' | 'revenue'>('overview');
  const navigate = useNavigate();

  const handleQuickAction = (action: string) => {
    toast.info(`快速操作：${action}`);
  };

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
              <i className="fas fa-pen-fancy mr-2"></i>创作者工作台
            </h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handleQuickAction('新建作品')}
              className="px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
              style={{ fontFamily: '"Noto Serif SC", serif' }}
            >
              <i className="fas fa-plus mr-1"></i>新建作品
            </button>
            <Link 
              to="/creator/live/create"
              className="px-4 py-2 bg-crabapple-red text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors"
            >
              <i className="fas fa-video mr-1"></i>开始直播
            </Link>
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="bg-white border-b border-silk-gray sticky top-[7.5rem] z-10">
        <div className="container mx-auto flex overflow-x-auto hide-scrollbar">
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "overview" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("overview")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            数据概览
            {activeTab === "overview" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "works" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("works")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            作品管理
            {activeTab === "works" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "inspiration" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("inspiration")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            灵感花园
            {activeTab === "inspiration" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
          </button>
          <button
            className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "comments" ? "text-glass-blue" : "text-inkstone-gray"}`}
            onClick={() => setActiveTab("comments")}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            读者评论
            {activeTab === "comments" && <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
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
            {/* 数据概览 */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* 数据卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-inkstone-gray text-sm mb-1">总阅读量</p>
                        <h3 className="text-3xl font-bold text-glass-blue">24.8k</h3>
                        <p className="text-xs text-bamboo-green mt-1">
                          <i className="fas fa-arrow-up mr-1"></i> 较上周增长 12.5%
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-glass-blue/10 flex items-center justify-center text-glass-blue">
                        <i className="fas fa-eye text-xl"></i>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-inkstone-gray text-sm mb-1">总订阅数</p>
                        <h3 className="text-3xl font-bold text-crabapple-red">1.5k</h3>
                        <p className="text-xs text-bamboo-green mt-1">
                          <i className="fas fa-arrow-up mr-1"></i> 较上周增长 8.3%
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-crabapple-red/10 flex items-center justify-center text-crabapple-red">
                        <i className="fas fa-users text-xl"></i>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-inkstone-gray text-sm mb-1">总互动数</p>
                        <h3 className="text-3xl font-bold text-bamboo-green">5.2k</h3>
                        <p className="text-xs text-bamboo-green mt-1">
                          <i className="fas fa-arrow-up mr-1"></i> 较上周增长 15.7%
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-bamboo-green/10 flex items-center justify-center text-bamboo-green">
                        <i className="fas fa-comments text-xl"></i>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-inkstone-gray text-sm mb-1">本月收益</p>
                        <h3 className="text-3xl font-bold text-autumn-yellow">¥860</h3>
                        <p className="text-xs text-crabapple-red mt-1">
                          <i className="fas fa-arrow-up mr-1"></i> 较上月增长 23.1%
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-autumn-yellow/10 flex items-center justify-center text-autumn-yellow">
                        <i className="fas fa-yuan-sign text-xl"></i>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* 图表区域 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                    <h3 className="text-lg font-medium mb-4" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      内容表现分析
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D9" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: "white",
                              borderColor: "#E8E4D9",
                              borderRadius: "8px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                            }}
                          />
                          <Bar dataKey="reads" name="阅读量" fill="#3A7DA8" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="comments" name="评论数" fill="#D15A5A" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="likes" name="点赞数" fill="#6BA86B" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="shares" name="分享数" fill="#B9A16A" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                    <h3 className="text-lg font-medium mb-4" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      读者增长趋势
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={followerGrowthData}>
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
                          />
                          <Line 
                            type="monotone" 
                            dataKey="followers" 
                            name="订阅人数" 
                            stroke="#3A7DA8" 
                            strokeWidth={2}
                            dot={{ fill: '#3A7DA8', strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                {/* 收益分析和热门作品 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                    <h3 className="text-lg font-medium mb-4" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      收益构成
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={revenueData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {revenueData.map((entry, index) => (
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
                  
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                    <h3 className="text-lg font-medium mb-4" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      作品表现
                    </h3>
                    <div className="space-y-4">
                      {worksData.map((work) => (
                        <div key={work.id} className="p-3 border border-silk-gray rounded-lg hover:bg-silk-gray/30 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <h4 className="font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>{work.title}</h4>
                                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                                  work.status === '连载中' ? 'bg-glass-blue/10 text-glass-blue' :
                                  work.status === '已完结' ? 'bg-bamboo-green/10 text-bamboo-green' :
                                  'bg-inkstone-gray/10 text-inkstone-gray'
                                }`}>
                                  {work.status}
                                </span>
                              </div>
                              <div className="flex items-center mt-2 text-sm text-inkstone-gray">
                                <span className="mr-4 flex items-center">
                                  <i className="fas fa-eye mr-1"></i> {work.reads.toLocaleString()}
                                </span>
                                <span className="mr-4 flex items-center">
                                  <i className="fas fa-comments mr-1"></i> {work.comments.toLocaleString()}
                                </span>
                                <span className="mr-4 flex items-center">
                                  <i className="fas fa-thumbs-up mr-1"></i> {work.likes.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-inkstone-gray mb-1">完成度</p>
                              <div className="h-2 w-24 bg-silk-gray rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-glass-blue rounded-full"
                                  style={{ width: `${work.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-glass-blue mt-1">{work.progress}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-4">
                      <Link 
                        to="#" 
                        className="text-sm text-glass-blue hover:underline"
                      >
                        查看全部作品
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 作品管理 */}
            {activeTab === "works" && (
              <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                <h3 className="text-lg font-medium mb-4" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                  作品管理
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ y: -5 }}
                    className="p-6 border-2 border-dashed border-silk-gray rounded-xl text-center hover:border-glass-blue hover:bg-glass-blue/5 transition-colors"
                    onClick={() => handleQuickAction('创建原创作品')}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-glass-blue/10 flex items-center justify-center text-glass-blue">
                      <i className="fas fa-edit text-2xl"></i>
                    </div>
                    <h4 className="font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>创建原创作品</h4>
                    <p className="text-sm text-inkstone-gray mt-1">开始创作全新的原创内容</p>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ y: -5 }}
                    className="p-6 border-2 border-dashed border-silk-gray rounded-xl text-center hover:border-glass-blue hover:bg-glass-blue/5 transition-colors"
                    onClick={() => handleQuickAction('创建二创作品')}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-crabapple-red/10 flex items-center justify-center text-crabapple-red">
                      <i className="fas fa-copy text-2xl"></i>
                    </div>
                    <h4 className="font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>创建二创作品</h4>
                    <p className="text-sm text-inkstone-gray mt-1">基于现有作品进行改编或解读</p>
                  </motion.button>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>我的作品</h4>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-silk-gray text-sm rounded-full">全部</button>
                      <button className="px-3 py-1 bg-white border border-silk-gray text-sm rounded-full hover:bg-silk-gray/50 transition-colors">连载中</button>
                      <button className="px-3 py-1 bg-white border border-silk-gray text-sm rounded-full hover:bg-silk-gray/50 transition-colors">已完结</button>
                      <button className="px-3 py-1 bg-white border border-silk-gray text-sm rounded-full hover:bg-silk-gray/50 transition-colors">草稿</button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {worksData.map((work) => (
                      <div key={work.id} className="p-3 border border-silk-gray rounded-lg hover:bg-silk-gray/30 transition-colors flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-14 flex-shrink-0 mr-3">
                            <div className="w-full h-full bg-silk-gray rounded-lg flex items-center justify-center text-inkstone-gray">
                              <i className="fas fa-book"></i>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>{work.title}</h5>
                            <div className="flex items-center mt-1 text-xs text-inkstone-gray">
                              <span className={`mr-3 px-2 py-0.5 rounded-full ${
                                work.status === '连载中' ? 'bg-glass-blue/10 text-glass-blue' :
                                work.status === '已完结' ? 'bg-bamboo-green/10 text-bamboo-green' :
                                'bg-inkstone-gray/10 text-inkstone-gray'
                              }`}>
                                {work.status}
                              </span>
                              <span className="flex items-center mr-3">
                                <i className="fas fa-eye mr-1"></i> {work.reads.toLocaleString()}
                              </span>
                              <span className="flex items-center">
                                <i className="fas fa-comments mr-1"></i> {work.comments.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-1.5 text-inkstone-gray hover:text-glass-blue transition-colors">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="p-1.5 text-inkstone-gray hover:text-crabapple-red transition-colors">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                          <button className="p-1.5 text-inkstone-gray hover:text-glass-blue transition-colors">
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* 灵感花园 */}
            {activeTab === "inspiration" && (
              <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                <h3 className="text-lg font-medium mb-4" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                  灵感花园
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border border-silk-gray rounded-xl p-4 hover:border-glass-blue transition-colors">
                    <h4 className="font-medium mb-2 flex items-center" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      <i className="fas fa-lightbulb text-autumn-yellow mr-2"></i>读者需求
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-silk-gray/30 rounded-lg">
                        <p className="text-sm mb-2" style={{ fontFamily: '"Noto Serif SC", serif' }}>想看关于都市生活的暖心故事</p>
                        <div className="flex justify-between items-center text-xs text-inkstone-gray">
                          <span>128人想看</span>
                          <button className="text-glass-blue hover:underline">收藏</button>
                        </div>
                      </div>
                      <div className="p-3 bg-silk-gray/30 rounded-lg">
                        <p className="text-sm mb-2" style={{ fontFamily: '"Noto Serif SC", serif' }}>希望有更多关于职场成长的真实故事</p>
                        <div className="flex justify-between items-center text-xs text-inkstone-gray">
                          <span>96人想看</span>
                          <button className="text-glass-blue hover:underline">收藏</button>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <button className="text-sm text-glass-blue hover:underline">查看更多</button>
                    </div>
                  </div>
                  
                  <div className="border border-silk-gray rounded-xl p-4 hover:border-glass-blue transition-colors">
                    <h4 className="font-medium mb-2 flex items-center" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      <i className="fas fa-chart-line text-glass-blue mr-2"></i>热门题材
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-silk-gray/30 rounded-lg">
                        <div className="flex justify-between items-center">
                          <p className="text-sm" style={{ fontFamily: '"Noto Serif SC", serif' }}>科幻悬疑</p>
                          <span className="text-xs px-2 py-0.5 bg-glass-blue/10 text-glass-blue rounded-full">热门</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-silk-gray rounded-full overflow-hidden">
                          <div className="h-full bg-glass-blue rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div className="p-3 bg-silk-gray/30 rounded-lg">
                        <div className="flex justify-between items-center">
                          <p className="text-sm" style={{ fontFamily: '"Noto Serif SC", serif' }}>历史传奇</p>
                          <span className="text-xs px-2 py-0.5 bg-bamboo-green/10 text-bamboo-green rounded-full">上升</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-silk-gray rounded-full overflow-hidden">
                          <div className="h-full bg-glass-blue rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <button className="text-sm text-glass-blue hover:underline">查看更多</button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-silk-gray rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium flex items-center" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      <i className="fas fa-bookmark text-crabapple-red mr-2"></i>我的灵感收藏
                    </h4>
                    <button className="px-3 py-1 bg-glass-blue text-white text-sm rounded-full hover:bg-opacity-90 transition-colors">
                      <i className="fas fa-plus mr-1"></i>新建灵感
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 border border-silk-gray rounded-lg hover:bg-silk-gray/30 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>都市情感故事大纲</h5>
                        <span className="text-xs px-2 py-0.5 bg-crabapple-red/10 text-crabapple-red rounded-full">进行中</span>
                      </div>
                      <p className="text-sm text-inkstone-gray mb-2">讲述都市中年轻人的情感纠葛与成长故事，设定已经完成，需要开始撰写第一章...</p>
                      <div className="flex justify-between items-center text-xs text-inkstone-gray">
                        <span>创建于 3天前</span>
                        <div className="flex gap-3">
                          <button className="text-glass-blue hover:underline">编辑</button>
                          <button className="text-glass-blue hover:underline">删除</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border border-silk-gray rounded-lg hover:bg-silk-gray/30 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>职场人物采访记录</h5>
                        <span className="text-xs px-2 py-0.5 bg-inkstone-gray/10 text-inkstone-gray rounded-full">待处理</span>
                      </div>
                      <p className="text-sm text-inkstone-gray mb-2">整理了五位不同行业职场人士的访谈内容，可以作为职场题材小说的素材...</p>
                      <div className="flex justify-between items-center text-xs text-inkstone-gray">
                        <span>创建于 1周前</span>
                        <div className="flex gap-3">
                          <button className="text-glass-blue hover:underline">编辑</button>
                          <button className="text-glass-blue hover:underline">删除</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-2 border-dashed border-silk-gray rounded-xl p-4 text-center hover:border-glass-blue hover:bg-glass-blue/5 transition-colors">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-glass-blue/10 flex items-center justify-center text-glass-blue">
                    <i className="fas fa-bullhorn text-2xl"></i>
                  </div>
                  <h4 className="font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>征集创作灵感</h4>
                  <p className="text-sm text-inkstone-gray mt-1 mb-3">向读者征集创作建议，了解他们最想读的内容</p>
                  <button className="px-4 py-2 bg-glass-blue text-white text-sm rounded-full hover:bg-opacity-90 transition-colors btn-chinese">
                    发起灵感征集
                  </button>
                </div>
              </div>
            )}
            
            {/* 读者评论 */}
            {activeTab === "comments" && (
              <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                <h3 className="text-lg font-medium mb-4" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                  读者评论
                </h3>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-glass-blue text-white text-sm rounded-full">全部</button>
                    <button className="px-3 py-1 bg-white border border-silk-gray text-sm rounded-full hover:bg-silk-gray/50 transition-colors">未回复</button>
                    <button className="px-3 py-1 bg-white border border-silk-gray text-sm rounded-full hover:bg-silk-gray/50 transition-colors">已回复</button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="搜索评论内容..."
                      className="pl-8 pr-4 py-1.5 bg-silk-gray text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-glass-blue/30"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-inkstone-gray"></i>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {recentComments.map((comment) => (
                    <div key={comment.id} className="p-4 border border-silk-gray rounded-lg hover:bg-silk-gray/30 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-silk-gray flex items-center justify-center text-inkstone-gray">
                            <i className="fas fa-user"></i>
                          </div>
                          <div className="ml-3">
                            <h5 className="font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>{comment.user}</h5>
                            <div className="flex items-center mt-0.5 text-xs text-inkstone-gray">
                              <span>{comment.work}</span>
                              <span className="mx-2">·</span>
                              <span>{comment.time}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-0.5 bg-crabapple-red/10 text-crabapple-red rounded-full">未回复</span>
                      </div>
                      <p className="text-sm mb-3" style={{ fontFamily: '"Noto Serif SC", serif' }}>{comment.content}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                          <button className="text-xs text-inkstone-gray hover:text-glass-blue transition-colors">
                            <i className="far fa-thumbs-up mr-1"></i>赞同
                          </button>
                          <button className="text-xs text-inkstone-gray hover:text-glass-blue transition-colors">
                            <i className="far fa-comment mr-1"></i>回复
                          </button>
                        </div>
                        <button className="text-xs text-inkstone-gray hover:text-glass-blue transition-colors">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <button className="px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors">
                    加载更多评论
                  </button>
                </div>
              </div>
            )}
            
            {/* 收益中心 */}
            {activeTab === "revenue" && (
              <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                <h3 className="text-lg font-medium mb-4" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                  收益中心
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-4 border border-silk-gray rounded-xl text-center"
                  >
                    <p className="text-inkstone-gray text-sm mb-1">累计收益</p>
                    <h4 className="text-2xl font-bold text-glass-blue">¥12,680</h4>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-4 border border-silk-gray rounded-xl text-center"
                  >
                    <p className="text-inkstone-gray text-sm mb-1">本月收益</p>
                    <h4 className="text-2xl font-bold text-glass-blue">¥860</h4>
                    <p className="text-xs text-bamboo-green mt-1">
                      <i className="fas fa-arrow-up mr-1"></i> 较上月增长 23.1%
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-4 border border-silk-gray rounded-xl text-center"
                  >
                    <p className="text-inkstone-gray text-sm mb-1">可提现金额</p>
                    <h4 className="text-2xl font-bold text-crabapple-red">¥6,340</h4>
                    <button className="mt-2 px-3 py-1 bg-crabapple-red text-white text-xs rounded-full hover:bg-opacity-90 transition-colors">
                      申请提现
                    </button>
                  </motion.div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>收益明细</h4>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-silk-gray text-sm rounded-full">本月</button>
                      <button className="px-3 py-1 bg-white border border-silk-gray text-sm rounded-full hover:bg-silk-gray/50 transition-colors">上月</button>
                      <button className="px-3 py-1 bg-white border border-silk-gray text-sm rounded-full hover:bg-silk-gray/50 transition-colors">自定义</button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-silk-gray">
                          <th className="py-3 px-4 text-left text-sm font-medium text-inkstone-gray">日期</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-inkstone-gray">作品</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-inkstone-gray">来源</th>
                          <th className="py-3 px-4 text-right text-sm font-medium text-inkstone-gray">金额</th>
                          <th className="py-3 px-4 text-right text-sm font-medium text-inkstone-gray">状态</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-silk-gray">
                          <td className="py-3 px-4 text-sm">2025-11-20</td>
                          <td className="py-3 px-4 text-sm">活着的意义</td>
                          <td className="py-3 px-4 text-sm">付费阅读</td>
                          <td className="py-3 px-4 text-sm text-right">¥128.50</td>
                          <td className="py-3 px-4 text-sm text-right">
                            <span className="text-xs px-2 py-0.5 bg-bamboo-green/10 text-bamboo-green rounded-full">已结算</span>
                          </td>
                        </tr>
                        <tr className="border-b border-silk-gray">
                          <td className="py-3 px-4 text-sm">2025-11-19</td>
                          <td className="py-3 px-4 text-sm">活着的意义</td>
                          <td className="py-3 px-4 text-sm">读者打赏</td>
                          <td className="py-3 px-4 text-sm text-right">¥56.00</td>
                          <td className="py-3 px-4 text-sm text-right">
                            <span className="text-xs px-2 py-0.5 bg-bamboo-green/10 text-bamboo-green rounded-full">已结算</span>
                          </td>
                        </tr>
                        <tr className="border-b border-silk-gray">
                          <td className="py-3 px-4 text-sm">2025-11-18</td>
                          <td className="py-3 px-4 text-sm">都市微光</td>
                          <td className="py-3 px-4 text-sm">付费阅读</td>
                          <td className="py-3 px-4 text-sm text-right">¥89.20</td>
                          <td className="py-3 px-4 text-sm text-right">
                            <span className="text-xs px-2 py-0.5 bg-bamboo-green/10 text-bamboo-green rounded-full">已结算</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm">2025-11-17</td>
                          <td className="py-3 px-4 text-sm">活着的意义</td>
                          <td className="py-3 px-4 text-sm">会员分成</td>
                          <td className="py-3 px-4 text-sm text-right">¥32.80</td>
                          <td className="py-3 px-4 text-sm text-right">
                            <span className="text-xs px-2 py-0.5 bg-glass-blue/10 text-glass-blue rounded-full">处理中</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4" style={{ fontFamily: '"Noto Serif SC", serif' }}>收益分析</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D9" />
                        <XAxis dataKey="name" />
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
                        <Bar dataKey="reads" name="付费阅读" fill="#3A7DA8" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="comments" name="读者打赏" fill="#D15A5A" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="likes" name="会员分成" fill="#6BA86B" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
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