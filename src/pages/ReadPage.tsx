import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useTheme } from "@/hooks/useTheme";

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  progress: number;
  currentPage: number;
  totalPages: number;
  chapters: Chapter[];
  currentChapter: number;
  readingCount: number;
}

interface Chapter {
  id: number;
  title: string;
  content: string;
}

interface Annotation {
  id: string;
  text: string;
  start: number;
  end: number;
  mood: "共鸣" | "伤感" | "思考" | "有趣" | "其他";
  note: string;
  isPrivate: boolean;
  timestamp: number;
}

interface Danmaku {
  id: string;
  text: string;
  position: { x: number; y: number };
  color: string;
  timestamp: number;
}

// 模拟书籍数据
const mockBook: Book = {
  id: 1,
  title: "活着",
  author: "余华",
  coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Chinese%20Literature%20Book%20Cover&sign=d28f58106ee60d3fcb1a39a1c99bf0d0",
  progress: 65,
  currentPage: 187,
  totalPages: 288,
  currentChapter: 3,
  readingCount: 256,
  chapters: [
    {
      id: 1,
      title: "第一章",
      content: "我比现在年轻十岁的时候，获得了一个游手好闲的职业，去乡间收集民间歌谣。那一年的整个夏天，我如同一只乱飞的麻雀，游荡在知了和阳光充斥的村舍田野。"
    },
    {
      id: 2,
      title: "第二章",
      content: "我头戴宽边草帽，足蹬胶底布鞋，身穿粗布衣裳，肩背褪色的蓝布包，包里装着一部老掉牙的海鸥牌相机，一瓶墨水，一支钢笔，一个笔记本，还有一块擦汗的毛巾。"
    },
    {
      id: 3,
      title: "第三章",
      content: "那时候我年轻力壮，脸上还没有皱纹，头发还是乌黑的，眼睛还是明亮的，脚步还是轻快的。我每天早晨出门，傍晚归来，身后跟着一条摇着尾巴的黄狗，那是老村长家的狗，名叫阿黄。"
    },
    {
      id: 4,
      title: "第四章",
      content: "阿黄是一条通人性的狗，它跟着我走村串巷，从来不会走丢，也不会乱叫。有时候我在田埂上坐下来休息，它就会趴在我脚边，吐着舌头，看着我。"
    }
  ]
};

export default function ReadPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  // 状态管理
  const [book, setBook] = useState<Book>(mockBook);
  const [showSettings, setShowSettings] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [annotationNote, setAnnotationNote] = useState("");
  const [selectedMood, setSelectedMood] = useState<Annotation["mood"]>("其他");
  const [isPrivateNote, setIsPrivateNote] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [danmakus, setDanmakus] = useState<Danmaku[]>([]);
  const [danmakuEnabled, setDanmakuEnabled] = useState(true);
  
  // 切换弹幕显示状态
  const toggleDanmakuEnabled = () => {
    setDanmakuEnabled(prev => !prev);
  };
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [pageBackground, setPageBackground] = useState("rice-paper");
  const [bookmarkPosition, setBookmarkPosition] = useState<number | null>(null);
  
  const readingAreaRef = useRef<HTMLDivElement>(null);
  const annotationMenuRef = useRef<HTMLDivElement>(null);
  
  // 初始化，模拟从本地存储加载批注和阅读进度
  useEffect(() => {
    const savedProgress = localStorage.getItem(`book_progress_${id}`);
    const savedAnnotations = localStorage.getItem(`book_annotations_${id}`);
    const savedBookmark = localStorage.getItem(`book_bookmark_${id}`);
    
    if (savedProgress) {
      try {
        const progressData = JSON.parse(savedProgress);
        setBook(prev => ({ ...prev, ...progressData }));
      } catch (e) {
        console.error("Failed to load saved progress", e);
      }
    }
    
    if (savedAnnotations) {
      try {
        setAnnotations(JSON.parse(savedAnnotations));
      } catch (e) {
        console.error("Failed to load saved annotations", e);
      }
    }
    
    if (savedBookmark) {
      try {
        setBookmarkPosition(parseInt(savedBookmark));
      } catch (e) {
        console.error("Failed to load saved bookmark", e);
      }
    }
    
    // 模拟加载弹幕数据
    simulateDanmakus();
    
    // 点击页面其他地方关闭菜单
    const handleClickOutside = (event: MouseEvent) => {
      if (
        annotationMenuRef.current && 
        !annotationMenuRef.current.contains(event.target as Node) &&
        event.target !== readingAreaRef.current
      ) {
        setShowMoodSelector(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [id]);
  
  // 模拟弹幕数据
  const simulateDanmakus = () => {
    const sampleDanmakus = [
      "这段写得真好",
      "感人至深",
      "我也有类似的经历",
      "写得太真实了",
      "余华的文字总是那么有力"
    ];
    
    const colors = ["#3A7DA8", "#D15A5A", "#6BA86B", "#B9A16A"];
    
    // 每3-5秒生成一条弹幕
    const interval = setInterval(() => {
      if (!danmakuEnabled) return;
      
      const newDanmaku: Danmaku = {
        id: Date.now().toString(),
        text: sampleDanmakus[Math.floor(Math.random() * sampleDanmakus.length)],
        position: { 
          x: window.innerWidth, 
          y: Math.random() * 300 + 100 
        },
        color: colors[Math.floor(Math.random() * colors.length)],
        timestamp: Date.now()
      };
      
      setDanmakus(prev => [...prev, newDanmaku]);
      
      // 3秒后移除弹幕
      setTimeout(() => {
        setDanmakus(prev => prev.filter(d => d.id !== newDanmaku.id));
      }, 30000);
    }, Math.random() * 2000 + 3000);
    
    return () => clearInterval(interval);
  };
  
  // 处理选择文本
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const text = selection.toString();
      setSelectedText(text);
      
      // 获取选中文本的位置
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      if (annotationMenuRef.current) {
        annotationMenuRef.current.style.left = `${rect.left + rect.width / 2}px`;
        annotationMenuRef.current.style.top = `${rect.top - 50}px`;
      }
      
      setShowMoodSelector(true);
    } else {
      setShowMoodSelector(false);
    }
  };
  
  // 保存批注
  const saveAnnotation = () => {
    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      text: selectedText,
      start: 0, // 简化处理，实际应用中需要计算精确位置
      end: selectedText.length,
      mood: selectedMood,
      note: annotationNote,
      isPrivate: isPrivateNote,
      timestamp: Date.now()
    };
    
    const updatedAnnotations = [...annotations, newAnnotation];
    setAnnotations(updatedAnnotations);
    
    // 保存到本地存储
    localStorage.setItem(`book_annotations_${id}`, JSON.stringify(updatedAnnotations));
    
    // 重置状态
    setSelectedText("");
    setAnnotationNote("");
    setSelectedMood("其他");
    setIsPrivateNote(false);
    setShowMoodSelector(false);
    
    toast.success("批注已保存");
  };
  
  // 切换书签
  const toggleBookmark = () => {
    if (bookmarkPosition === book.currentPage) {
      setBookmarkPosition(null);
      localStorage.removeItem(`book_bookmark_${id}`);
      toast.info("已移除书签");
    } else {
      setBookmarkPosition(book.currentPage);
      localStorage.setItem(`book_bookmark_${id}`, book.currentPage.toString());
      toast.success("已添加书签");
    }
  };
  
  // 切换夜间模式
  const toggleDarkMode = () => {
    toggleTheme();
    toast.info(`已切换到${theme === 'light' ? '夜间' : '日间'}模式`);
  };
  
  // 保存阅读进度
  const saveReadingProgress = (newPage: number) => {
    const progressPercentage = Math.round((newPage / book.totalPages) * 100);
    const updatedBook = { 
      ...book, 
      currentPage: newPage, 
      progress: progressPercentage 
    };
    
    setBook(updatedBook);
    
    // 保存到本地存储
    localStorage.setItem(`book_progress_${id}`, JSON.stringify({
      currentPage: newPage,
      progress: progressPercentage
    }));
  };
  
  // 翻页
  const turnPage = (direction: 'next' | 'prev') => {
    if (direction === 'next' && book.currentPage < book.totalPages) {
      saveReadingProgress(book.currentPage + 1);
    } else if (direction === 'prev' && book.currentPage > 1) {
      saveReadingProgress(book.currentPage - 1);
    }
  };
  
  // 跳转到指定章节
  const goToChapter = (chapterId: number) => {
    const chapterIndex = book.chapters.findIndex(chapter => chapter.id === chapterId);
    if (chapterIndex !== -1) {
      setBook(prev => ({ ...prev, currentChapter: chapterIndex }));
      setShowChapters(false);
    }
  };
  
  // 离线缓存
  const toggleOfflineCache = () => {
    const isCached = localStorage.getItem(`book_cached_${id}`) === 'true';
    
    if (isCached) {
      localStorage.removeItem(`book_cached_${id}`);
      toast.info("已取消离线缓存");
    } else {
      localStorage.setItem(`book_cached_${id}`, 'true');
      toast.success("已添加到离线缓存");
    }
  };
  
  // 渲染页面内容
  const renderPageContent = () => {
    const currentChapter = book.chapters[book.currentChapter] || book.chapters[0];
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center" style={{ fontFamily: '"Noto Serif SC", serif' }}>
          {currentChapter.title}
        </h2>
        <div className="prose max-w-none" style={{ 
          fontSize: `${fontSize}px`, 
          lineHeight: lineHeight,
          fontFamily: '"Noto Serif SC", serif'
        }}>
          <p>{currentChapter.content}</p>
          {/* 模拟多段落 */}
          <p>生活是属于每个人自己的感受，不属于任何别人的看法。我们的生活，其实是由无数个瞬间组成的，每个瞬间都值得我们去珍惜。</p>
          <p>有时候，我们会因为一些小事而感到快乐，有时候，我们也会因为一些小事而感到烦恼。但无论如何，生活总是要继续的。</p>
          <p>人生就像一场旅行，重要的不是目的地，而是沿途的风景，以及看风景的心情。</p>
          <p>我们无法改变过去，但我们可以把握现在，创造未来。每一天都是新的开始，每一刻都是新的机会。</p>
        </div>
      </div>
    );
  };
  
  // 心情标签样式
  const getMoodStyle = (mood: Annotation['mood']) => {
    switch (mood) {
      case '共鸣': return 'bg-crabapple-red/10 text-crabapple-red border-crabapple-red/30';
      case '伤感': return 'bg-glass-blue/10 text-glass-blue border-glass-blue/30';
      case '思考': return 'bg-bamboo-green/10 text-bamboo-green border-bamboo-green/30';
      case '有趣': return 'bg-autumn-yellow/10 text-autumn-yellow border-autumn-yellow/30';
      default: return 'bg-silk-gray text-inkstone-gray border-inkstone-gray/30';
    }
  };
  
  return (
    <div className={`min-h-screen flex flex-col bg-${pageBackground} transition-colors duration-300`}>
      {/* 顶部信息栏 */}
      <div className="bg-white bg-opacity-80 backdrop-blur-sm border-b border-silk-gray py-3 px-4 flex justify-between items-center z-10">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/bookshelf')}
            className="p-2 rounded-full hover:bg-silk-gray transition-colors mr-2"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <h1 className="text-lg font-medium truncate max-w-[200px]" style={{ fontFamily: '"Noto Serif SC", serif' }}>
              {book.title}
            </h1>
            <p className="text-xs text-inkstone-gray">{book.author}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center text-xs text-inkstone-gray mr-4">
            <i className="fas fa-users mr-1"></i>
            <span>{book.readingCount}人在读</span>
          </div>
          <button 
            onClick={() => navigate('/bookshelf')}
            className="w-8 h-8 rounded-full overflow-hidden"
          >
            <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
      
      {/* 主阅读区域 */}
      <div 
        className="flex-1 relative overflow-hidden"
        style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          width: '100%' 
        }}
      >
        {/* 阅读内容 */}
        <div 
          ref={readingAreaRef}
          className="h-full overflow-y-auto p-8"
          onMouseUp={handleTextSelection}
        >
          {renderPageContent()}
        </div>
        
        {/* 批注选择菜单 */}
        <AnimatePresence>
          {showMoodSelector && selectedText && (
            <motion.div
              ref={annotationMenuRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute z-30 bg-white rounded-xl shadow-lg border border-silk-gray p-3"
            >
              <div className="text-sm font-medium mb-2 truncate max-w-[200px]">
                {selectedText.length > 30 ? selectedText.substring(0, 30) + '...' : selectedText}
              </div>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {['共鸣', '伤感', '思考', '有趣'].map(mood => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood as Annotation['mood'])}
                    className={`px-2 py-1 rounded-md text-xs ${
                      selectedMood === mood ? getMoodStyle(mood as Annotation['mood']) : 'bg-silk-gray text-inkstone-gray'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="添加笔记..."
                value={annotationNote}
                onChange={(e) => setAnnotationNote(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-silk-gray rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-glass-blue/30"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center text-xs text-inkstone-gray">
                  <input
                    type="checkbox"
                    checked={isPrivateNote}
                    onChange={(e) => setIsPrivateNote(e.target.checked)}
                    className="mr-1"
                  />
                  私密笔记
                </label>
                <button
                  onClick={saveAnnotation}
                  className="px-3 py-1 bg-glass-blue text-white text-xs rounded-full hover:bg-opacity-90 transition-colors"
                >
                  保存
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* 弹幕 */}
        {danmakuEnabled && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {danmakus.map(danmaku => (
              <motion.div
                key={danmaku.id}
                initial={{ x: danmaku.position.x, y: danmaku.position.y }}
                animate={{ x: -200 }}
                transition={{
                  duration: 10,
                  ease: "linear"
                }}
                className="absolute whitespace-nowrap text-sm font-medium"
                style={{ color: danmaku.color }}
              >
                {danmaku.text}
              </motion.div>
            ))}
          </div>
        )}
        
        {/* 页面控制按钮 */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-t from-black/30 to-transparent">
          <button 
            onClick={() => turnPage('prev')}
            disabled={book.currentPage <= 1}
            className={`p-3 rounded-full bg-white/80 backdrop-blur-sm text-ink ${
              book.currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white transition-colors'
            }`}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm text-ink hover:bg-white transition-colors"
            >
              <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
            <button 
              onClick={toggleDanmakuEnabled}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm text-ink hover:bg-white transition-colors"
            >
              <i className={`fas ${danmakuEnabled ? 'fa-comment-slash' : 'fa-comment'}`}></i>
            </button>
            <button 
              onClick={toggleBookmark}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm text-ink hover:bg-white transition-colors"
            >
              <i className={`fas ${bookmarkPosition === book.currentPage ? 'fa-bookmark' : 'fa-bookmark'}`} 
                 style={{ color: bookmarkPosition === book.currentPage ? '#D15A5A' : '' }}></i>
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm text-ink hover:bg-white transition-colors"
            >
              <i className="fas fa-cog"></i>
            </button>
            <button 
              onClick={() => setShowChapters(!showChapters)}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm text-ink hover:bg-white transition-colors"
            >
              <i className="fas fa-list"></i>
            </button>
            <button 
              onClick={() => setShowAnnotations(!showAnnotations)}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm text-ink hover:bg-white transition-colors"
            >
              <i className="fas fa-sticky-note"></i>
            </button>
          </div>
          
          <button 
            onClick={() => turnPage('next')}
            disabled={book.currentPage >= book.totalPages}
            className={`p-3 rounded-full bg-white/80 backdrop-blur-sm text-ink ${
              book.currentPage >= book.totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white transition-colors'
            }`}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        {/* 进度条 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-silk-gray">
          <div 
            className="h-full bg-gradient-to-r from-glass-blue to-bamboo-green"
            style={{ width: `${book.progress}%` }}
          ></div>
        </div>
        
        {/* 设置面板 */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl border border-silk-gray p-4 w-80 z-40"
            >
              <h3 className="text-lg font-medium mb-4 text-center" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                阅读设置
              </h3>
              
              <div className="space-y-4">
                {/* 字体大小 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm">字体大小</label>
                    <span className="text-sm font-medium">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-silk-gray rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                {/* 行高 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm">行高</label>
                    <span className="text-sm font-medium">{lineHeight.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1.2"
                    max="2.5"
                    step="0.1"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                    className="w-full h-2 bg-silk-gray rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                {/* 背景颜色 */}
                <div>
                  <label className="text-sm block mb-2">背景颜色</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPageBackground('rice-paper')}
                      className={`w-8 h-8 rounded-full ${
                        pageBackground === 'rice-paper' ? 'ring-2 ring-glass-blue' : ''
                      }`}
                      style={{ backgroundColor: '#F8F4E9' }}
                    ></button>
                    <button
                      onClick={() => setPageBackground('night')}
                      className={`w-8 h-8 rounded-full ${
                        pageBackground === 'night' ? 'ring-2 ring-glass-blue' : ''
                      }`}
                      style={{ backgroundColor: '#2A2A2A' }}
                    ></button>
                    <button
                      onClick={() => setPageBackground('sepia')}
                      className={`w-8 h-8 rounded-full ${
                        pageBackground === 'sepia' ? 'ring-2 ring-glass-blue' : ''
                      }`}
                      style={{ backgroundColor: '#F4ECD8' }}
                    ></button>
                    <button
                      onClick={() => setPageBackground('green')}
                      className={`w-8 h-8 rounded-full ${
                        pageBackground === 'green' ? 'ring-2 ring-glass-blue' : ''
                      }`}
                      style={{ backgroundColor: '#E8F4EA' }}
                    ></button>
                  </div>
                </div>
                
                {/* 离线缓存 */}
                <div className="pt-2 border-t border-silk-gray">
                  <button
                    onClick={toggleOfflineCache}
                    className="w-full py-2 rounded-lg bg-silk-gray text-sm font-medium hover:bg-opacity-80 transition-colors"
                  >
                    {localStorage.getItem(`book_cached_${id}`) === 'true' 
                      ? '取消离线缓存' 
                      : '添加到离线缓存'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* 章节列表 */}
        <AnimatePresence>
          {showChapters && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="absolute top-0 right-0 bottom-0 w-72 bg-white shadow-xl border-l border-silk-gray p-4 overflow-y-auto z-40"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                  章节列表
                </h3>
                <button 
                  onClick={() => setShowChapters(false)}
                  className="p-1 rounded-full hover:bg-silk-gray transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="space-y-2">
                {book.chapters.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    onClick={() => goToChapter(chapter.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      index === book.currentChapter 
                        ? 'bg-glass-blue/10 text-glass-blue font-medium' 
                        : 'hover:bg-silk-gray'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{chapter.title}</span>
                      {bookmarkPosition && index === Math.floor(bookmarkPosition / (book.totalPages / book.chapters.length)) && (
                        <i className="fas fa-bookmark text-crabapple-red"></i>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* 批注列表 */}
        <AnimatePresence>
          {showAnnotations && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="absolute top-0 left-0 bottom-0 w-80 bg-white shadow-xl border-r border-silk-gray p-4 overflow-y-auto z-40"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                  我的批注 ({annotations.length})
                </h3>
                <button 
                  onClick={() => setShowAnnotations(false)}
                  className="p-1 rounded-full hover:bg-silk-gray transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              {annotations.length === 0 ? (
                <div className="text-center py-10 text-inkstone-gray">
                  <i className="fas fa-sticky-note text-3xl mb-2"></i>
                  <p className="text-sm">还没有批注，选中文字添加吧</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {annotations.map(annotation => (
                    <div 
                      key={annotation.id}
                      className="p-3 rounded-lg border border-silk-gray hover:bg-silk-gray/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getMoodStyle(annotation.mood)}`}>
                          {annotation.mood}
                        </span>
                        {annotation.isPrivate && (
                          <i className="fas fa-lock text-xs text-inkstone-gray"></i>
                        )}
                      </div>
                      <p className="text-sm mb-2">{annotation.text}</p>
                      {annotation.note && (
                        <p className="text-xs text-inkstone-gray bg-silk-gray p-2 rounded-md">
                          {annotation.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* 底部页码 */}
      <div className="bg-white bg-opacity-80 backdrop-blur-sm border-t border-silk-gray py-2 px-4 text-center text-sm text-inkstone-gray">
        第 {book.currentPage} / {book.totalPages} 页
      </div>
    </div>
  );
}