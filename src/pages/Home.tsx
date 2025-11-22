import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { LiveSection } from '@/components/LiveSection';
import { ReadingProgress } from '@/components/ReadingProgress';
import { RecommendationFeed } from '@/components/RecommendationFeed';
import { HotCircles } from '@/components/HotCircles';
import { ReadingRanking } from '@/components/ReadingRanking';
import { ActivityAnnouncement } from '@/components/ActivityAnnouncement';
import { AuthContext } from '@/contexts/authContext';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { userRole, toggleRole } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-rice-paper text-ink flex flex-col">
      <Header 
        onThemeToggle={toggleTheme}
        currentTheme={theme}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        userRole={userRole}
        toggleRole={toggleRole}
      />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <div className="container mx-auto p-4 h-full">
            {userRole === 'creator' ? (
              // 创作者首页内容
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6 ink-splash">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-glass-blue flex items-center" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                      <i className="fas fa-chart-line mr-2"></i>创作数据概览
                    </h2>
                    <Link to="/creator" className="text-sm text-glass-blue hover:underline">查看详情</Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-rice-paper rounded-xl text-center">
                      <p className="text-2xl font-bold text-glass-blue">24.8k</p>
                      <p className="text-xs text-inkstone-gray mt-1">总阅读量</p>
                    </div>
                    <div className="p-4 bg-rice-paper rounded-xl text-center">
                      <p className="text-2xl font-bold text-crabapple-red">1.5k</p>
                      <p className="text-xs text-inkstone-gray mt-1">总订阅数</p>
                    </div>
                    <div className="p-4 bg-rice-paper rounded-xl text-center">
                      <p className="text-2xl font-bold text-bamboo-green">5.2k</p>
                      <p className="text-xs text-inkstone-gray mt-1">总互动数</p>
                    </div>
                    <div className="p-4 bg-rice-paper rounded-xl text-center">
                      <p className="text-2xl font-bold text-autumn-yellow">¥860</p>
                      <p className="text-xs text-inkstone-gray mt-1">本月收益</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-silk-gray p-6 ink-splash">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>最新作品</h2>
                      <Link to="/creator" className="text-sm text-glass-blue hover:underline">管理作品</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        {id: 1, title: '活着的意义', status: '连载中', progress: 65},
                        {id: 2, title: '都市微光', status: '已完结', progress: 100},
                        {id: 3, title: '星辰大海', status: '连载中', progress: 35}
                      ].map(work => (
                        <div key={work.id} className="p-3 border border-silk-gray rounded-lg hover:bg-silk-gray/30 transition-colors">
                          <h3 className="font-medium mb-2" style={{ fontFamily: '"Noto Serif SC", serif' }}>{work.title}</h3>
                          <div className="flex justify-between items-center mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              work.status === '连载中' ? 'bg-glass-blue/10 text-glass-blue' : 'bg-bamboo-green/10 text-bamboo-green'
                            }`}>
                              {work.status}
                            </span>
                            <span className="text-xs text-inkstone-gray">{work.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-silk-gray rounded-full overflow-hidden">
                            <div className="h-full bg-glass-blue rounded-full" style={{ width: `${work.progress}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6 ink-splash">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>创作任务</h2>
                      <Link to="/creator/inspiration" className="text-sm text-glass-blue hover:underline">查看全部</Link>
                    </div>
                    <div className="space-y-3">
                      {[
                        {id: 1, title: '完成《活着的意义》第三章', priority: 'high', due: '今天'},
                        {id: 2, title: '回复读者评论', priority: 'medium', due: '明天'},
                        {id: 3, title: '准备周五直播内容', priority: 'high', due: '周五'},
                        {id: 4, title: '整理《星辰大海》大纲', priority: 'medium', due: '下周'}
                      ].map(task => (
                        <div key={task.id} className="flex items-center p-3 bg-rice-paper rounded-lg">
                          <input type="checkbox" className="mr-3" />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{task.title}</h4>
                            <div className="flex items-center mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full mr-2 ${
                                task.priority === 'high' ? 'bg-crabapple-red/10 text-crabapple-red' : 'bg-glass-blue/10 text-glass-blue'
                              }`}>
                                {task.priority === 'high' ? '高优先级' : '中优先级'}
                              </span>
                              <span className="text-xs text-inkstone-gray">{task.due}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6 ink-splash">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>读者互动</h2>
                    <Link to="/creator/comments" className="text-sm text-glass-blue hover:underline">查看全部</Link>
                  </div>
                  <div className="space-y-3">
                    {[
                      {id: 1, user: '书香满屋', content: '期待第三章更新！写得太好了', work: '活着的意义', time: '10分钟前'},
                      {id: 2, user: '文学爱好者', content: '女主角的性格很真实，有共鸣', work: '都市微光', time: '30分钟前'},
                      {id: 3, user: '科幻探索者', content: '关于曲速引擎的设定很有创意', work: '星辰大海', time: '1小时前'}
                    ].map(comment => (
                      <div key={comment.id} className="p-3 border border-silk-gray rounded-lg hover:bg-silk-gray/30 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center mb-1">
                              <span className="font-medium">{comment.user}</span>
                              <span className="ml-2 text-xs text-inkstone-gray">{comment.work}</span>
                            </div>
                            <p className="text-sm mb-2">{comment.content}</p>
                            <div className="flex gap-2">
                              <button className="px-3 py-1 bg-glass-blue text-white text-xs rounded-full hover:bg-opacity-90 transition-colors">
                                回复
                              </button>
                              <button className="px-3 py-1 border border-silk-gray text-inkstone-gray text-xs rounded-full hover:bg-silk-gray transition-colors">
                                标记已读
                              </button>
                            </div>
                          </div>
                          <span className="text-xs text-inkstone-gray">{comment.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // 读者首页内容
              <div className="grid grid-cols-12 gap-6 h-full">
                {/* 左侧栏 - 25% */}
                <div className="col-span-12 md:col-span-3 h-full flex flex-col gap-4">
                  <LiveSection />
                  <ReadingProgress />
                </div>
                
                {/* 中间栏 - 50% */}
                <div className="col-span-12 md:col-span-6 h-full">
                  <RecommendationFeed />
                </div>
                
                {/* 右侧栏 - 25% */}
                <div className="col-span-12 md:col-span-3 h-full flex flex-col gap-4">
                  <HotCircles />
                  <ReadingRanking />
                  <ActivityAnnouncement />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}