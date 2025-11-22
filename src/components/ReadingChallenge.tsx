import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// 模拟小组数据
const teamMembers = [
  { id: 1, name: '书香满屋', progress: 85, avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Book%20Lover&sign=049878cd026320bf183335b6562ef447' },
  { id: 2, name: '文学爱好者', progress: 72, avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Literature%20Lover&sign=7d4957ba875a438c96549fb404bf18a7' },
  { id: 3, name: '推理迷', progress: 90, avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Male%20Mystery%20Lover&sign=b60d377b123719dc7be842b29370aa45' },
  { id: 4, name: '诗与远方', progress: 65, avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Female%20Poetry%20Lover&sign=4b2965fa442cb75836b643fd5dd4646f' },
  { id: 5, name: '科幻探索者', progress: 78, avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Sci-Fi%20Enthusiast&sign=fe0a752ea3749cc13afab31461d2f1ac' },
];

// 模拟打卡记录
const checkInRecords = [
  { id: 1, userId: 1, date: '2025-11-20', content: '今天读完了第三章，收获颇丰，尤其是关于人生意义的探讨让我深思。', likes: 12 },
  { id: 2, userId: 2, date: '2025-11-20', content: '情节越来越精彩了，迫不及待想知道后续发展。', likes: 8 },
  { id: 3, userId: 3, date: '2025-11-19', content: '第二章的人物刻画非常生动，仿佛身临其境。', likes: 15 },
];

// 模拟挑战书籍数据
const challengeBooks = [
  { id: 1, title: '活着', author: '余华', coverUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Chinese%20Literature%20Book%20Cover&sign=d28f58106ee60d3fcb1a39a1c99bf0d0', days: 7 },
  { id: 2, title: '人类简史', author: '尤瓦尔·赫拉利', coverUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=History%20Book%20Cover%20Sapiens&sign=eeb87ae98a563b9841dea83a087f7db9', days: 21 },
];

export function ReadingChallenge() {
  const [selectedPlan, setSelectedPlan] = useState<7 | 21>(7);
  const [isJoined, setIsJoined] = useState(false);
  const [currentDay, setCurrentDay] = useState(3);
  const [myProgress, setMyProgress] = useState(45);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [checkInContent, setCheckInContent] = useState('');
  const [expandedSection, setExpandedSection] = useState<'progress' | 'checkins' | 'discussion'>('progress');
  
  // 格式化进度数据用于图表显示
  const progressData = teamMembers.map(member => ({
    name: member.name.length > 2 ? member.name.substring(0, 2) + '...' : member.name,
    progress: member.progress,
    fullName: member.name
  }));
  
  // 模拟日期数据
  useEffect(() => {
    const challengeStartDate = new Date('2025-11-18');
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - challengeStartDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 限制在挑战天数内
    if (diffDays <= selectedPlan) {
      setCurrentDay(diffDays);
    }
  }, [selectedPlan]);
  
  // 处理加入挑战
  const handleJoinChallenge = () => {
    setIsJoined(true);
    toast.success('已成功加入共读挑战！');
  };
  
  // 处理打卡
  const handleCheckIn = () => {
    if (checkInContent.trim()) {
      // 模拟打卡成功
      setShowCheckInModal(false);
      setCheckInContent('');
      setMyProgress(prev => Math.min(prev + 15, 100));
      toast.success('今日打卡成功！');
    } else {
      toast.error('请输入打卡内容');
    }
  };
  
  // 获取进度条颜色
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#6BA86B';
    if (progress >= 60) return '#3A7DA8';
    if (progress >= 40) return '#B9A16A';
    return '#D15A5A';
  };
  
  // 获取日期列表
  const getDateList = () => {
    const dates = [];
    const startDate = new Date('2025-11-18');
    
    for (let i = 0; i < selectedPlan; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      dates.push({
        date: currentDate,
        isCurrent: i + 1 === currentDay,
        isPast: i + 1 < currentDay,
        isCheckedIn: i + 1 < currentDay || (i + 1 === currentDay && myProgress > 0)
      });
    }
    
    return dates;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden mb-6 ink-splash chinese-pattern-border"
    >
      {/* 标题栏 */}
      <div className="p-4 border-b border-silk-gray flex justify-between items-center">
        <h2 
          className="text-lg font-semibold flex items-center"
          style={{ fontFamily: '"Noto Serif SC", serif' }}
        >
          <i className="fas fa-users text-glass-blue mr-2"></i>共读挑战
        </h2>
        {!isJoined && (
          <button 
            className="px-3 py-1 bg-glass-blue text-white rounded-full text-sm hover:bg-opacity-90 transition-colors btn-chinese"
            onClick={handleJoinChallenge}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            立即加入
          </button>
        )}
      </div>
      
      {/* 挑战计划选择 */}
      <div className="p-4">
        <div className="flex bg-silk-gray/50 rounded-lg p-1 inline-flex mb-4">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium ${selectedPlan === 7 ? 'bg-white shadow-sm text-ink' : 'text-inkstone-gray'}`}
            onClick={() => setSelectedPlan(7)}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            7天挑战
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium ${selectedPlan === 21 ? 'bg-white shadow-sm text-ink' : 'text-inkstone-gray'}`}
            onClick={() => setSelectedPlan(21)}
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            21天挑战
          </button>
        </div>
        
        {/* 挑战书籍 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {challengeBooks
            .filter(book => book.days === selectedPlan)
            .map(book => (
              <div key={book.id} className="flex items-center p-3 bg-rice-paper rounded-lg">
                <div className="w-16 h-20 flex-shrink-0">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title} 
                    className="w-full h-full object-cover rounded-lg shadow-sm" 
                  />
                </div>
                <div className="ml-3 flex-1">
                  <h3 
                    className="font-medium"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    {book.title}
                  </h3>
                  <p className="text-sm text-inkstone-gray mt-1">作者：{book.author}</p>
                  <p className="text-sm text-glass-blue mt-2 flex items-center">
                    <i className="fas fa-calendar-check mr-1"></i> 
                    {book.days}天阅读计划
                  </p>
                </div>
              </div>
            ))}
        </div>
        
        {/* 挑战进度 */}
        {selectedPlan === 7 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 
                className="text-base font-medium flex items-center"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                <span className="w-1 h-4 bg-glass-blue inline-block mr-2"></span>
                挑战进度
              </h3>
              <span className="text-sm text-inkstone-gray">第{currentDay}/{selectedPlan}天</span>
            </div>
            
            {/* 日期进度 */}
            <div className="flex justify-between items-center mb-4 py-2 overflow-x-auto hide-scrollbar">
              {getDateList().map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-shrink-0 min-w-[60px]">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 text-sm font-medium ${
                      item.isCurrent 
                        ? 'bg-glass-blue text-white' 
                        : item.isPast 
                          ? 'bg-bamboo-green/20 text-bamboo-green' 
                          : 'bg-silk-gray text-inkstone-gray'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span 
                    className="text-xs text-inkstone-gray"
                  >
                    {item.date.getMonth() + 1}/{item.date.getDate()}
                  </span>
                  {item.isCheckedIn && (
                    <i className="fas fa-check-circle text-bamboo-green mt-1 text-xs"></i>
                  )}
                </div>
              ))}
            </div>
            
            {/* 我的阅读进度 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">我的进度</span>
                <span className="text-sm text-glass-blue font-medium">{myProgress}%</span>
              </div>
              <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-glass-blue to-bamboo-green rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${myProgress}%` }}
                  transition={{ duration: 0.8 }}
                ></motion.div>
              </div>
            </div>
            
            {/* 打卡按钮 */}
            {currentDay <= selectedPlan && !getDateList()[currentDay - 1].isCheckedIn && (
              <button 
                className="w-full py-2.5 bg-glass-blue text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors btn-chinese"
                onClick={() => setShowCheckInModal(true)}
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                <i className="fas fa-calendar-check mr-1"></i>今日打卡
              </button>
            )}
            
            {/* 已打卡提示 */}
            {currentDay <= selectedPlan && getDateList()[currentDay - 1].isCheckedIn && (
              <div className="w-full py-2.5 bg-bamboo-green/10 text-bamboo-green rounded-lg text-sm font-medium text-center">
                <i className="fas fa-check-circle mr-1"></i>今日已打卡
              </div>
            )}
          </div>
        )}
        
        {/* 展开/收起区域控制 */}
        <div className="border-t border-b border-silk-gray mb-4">
          <div className="flex">
            {['progress', 'checkins', 'discussion'].map((section) => (
              <button
                key={section}
                className={`py-3 px-4 text-sm font-medium relative ${
                  expandedSection === section 
                    ? 'text-glass-blue' 
                    : 'text-inkstone-gray'
                }`}
                onClick={() => setExpandedSection(section as any)}
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                {section === 'progress' && '小组进度'}
                {section === 'checkins' && '打卡记录'}
                {section === 'discussion' && '讨论区'}
                {expandedSection === section && (
                  <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* 展开内容区域 */}
        {expandedSection === 'progress' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={progressData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D9" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={50} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "white",
                      borderColor: "#E8E4D9",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                    formatter={(value: any) => [`${value}%`, '阅读进度']}
                    labelFormatter={(label, data) => data[0]?.payload.fullName || label}
                  />
                  <Bar dataKey="progress" radius={[0, 4, 4, 0]}>
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getProgressColor(entry.progress)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {teamMembers.map(member => (
                <div key={member.id} className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div 
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                      style={{ backgroundColor: getProgressColor(member.progress) }}
                    ></div>
                  </div>
                  <span 
                    className="text-xs font-medium mt-1 truncate max-w-[60px] text-center"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    {member.name}
                  </span>
                  <span className="text-xs text-inkstone-gray">{member.progress}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {expandedSection === 'checkins' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {checkInRecords.map(record => {
              const user = teamMembers.find(m => m.id === record.userId);
              return (
                <div key={record.id} className="p-3 bg-rice-paper rounded-lg border border-silk-gray">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={user?.avatar} 
                        alt={user?.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span 
                          className="text-sm font-medium"
                          style={{ fontFamily: '"Noto Serif SC", serif' }}
                        >
                          {user?.name}
                        </span>
                        <span className="text-xs text-inkstone-gray">{record.date}</span>
                      </div>
                      <p 
                        className="text-sm mb-2"
                        style={{ fontFamily: '"Noto Serif SC", serif' }}
                      >
                        {record.content}
                      </p>
                      <div className="flex items-center text-xs text-inkstone-gray">
                        <button className="flex items-center hover:text-glass-blue transition-colors">
                          <i className="far fa-thumbs-up mr-1"></i>
                          <span>{record.likes}</span>
                        </button>
                        <span className="mx-2">|</span>
                        <button className="hover:text-glass-blue transition-colors">
                          <i className="far fa-comment mr-1"></i>
                          <span>评论</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="text-center">
              <button 
                className="px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors btn-chinese"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                查看全部
              </button>
            </div>
          </motion.div>
        )}
        
        {expandedSection === 'discussion' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4">
              <div className="p-3 bg-rice-paper rounded-lg border border-silk-gray">
                <h3 
                  className="text-base font-medium mb-2"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  章节讨论
                </h3>
                <div className="space-y-3">
                  {['第一章', '第二章', '第三章', '第四章'].map((chapter, index) => (
                    <Link 
                      key={index}
                      to="#" 
                      className="block p-2 rounded-md hover:bg-silk-gray transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{chapter} 讨论区</span>
                        <span className="text-xs px-2 py-0.5 bg-silk-gray rounded-full text-inkstone-gray">
                          {20 + index * 10}条讨论
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="p-3 bg-rice-paper rounded-lg border border-silk-gray">
                <h3 
                  className="text-base font-medium mb-2"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  热门话题
                </h3>
                <div className="space-y-3">
                  {[
                    '书中最让你感动的情节是什么？',
                    '如何理解作者想要表达的主题？',
                    '你如何评价书中的主人公？'
                  ].map((topic, index) => (
                    <Link 
                      key={index}
                      to="#" 
                      className="block p-2 rounded-md hover:bg-silk-gray transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{topic}</span>
                        <span className="text-xs px-2 py-0.5 bg-glass-blue/10 text-glass-blue rounded-full">
                          {15 + index * 5}人参与
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <Link 
                  to="/community/reasoning"
                  className="inline-block px-6 py-2 border border-silk-gray rounded-full text-sm text-inkstone-gray hover:bg-silk-gray transition-colors btn-chinese"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  前往圈子参与更多讨论
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* 打卡模态框 */}
      {showCheckInModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowCheckInModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 
                className="text-lg font-medium"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                今日阅读打卡
              </h3>
              <button 
                onClick={() => setShowCheckInModal(false)}
                className="p-1 rounded-full hover:bg-silk-gray transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="mb-4">
              <label 
                className="block text-sm font-medium text-inkstone-gray mb-2"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                分享今日阅读感悟
              </label>
              <textarea
                value={checkInContent}
                onChange={(e) => setCheckInContent(e.target.value)}
                placeholder="今天读了什么内容？有什么感想？分享给大家吧..."
                className="w-full px-4 py-3 border border-silk-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-glass-blue/30 resize-none"
                rows={5}
              ></textarea>
            </div>
            
            <div className="flex gap-2">
              <button 
                className="flex-1 py-2.5 bg-glass-blue text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors btn-chinese"
                onClick={handleCheckIn}
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                确认打卡
              </button>
              <button 
                className="flex-1 py-2.5 bg-silk-gray text-inkstone-gray rounded-lg text-sm font-medium hover:bg-opacity-80 transition-colors"
                onClick={() => setShowCheckInModal(false)}
              >
                取消
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}