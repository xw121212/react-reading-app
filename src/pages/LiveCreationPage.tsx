import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const liveTemplates = [{
    id: 1,
    title: "创作分享",
    icon: "fa-book",
    color: "#3A7DA8"
}, {
    id: 2,
    title: "新书预告",
    icon: "fa-lightbulb",
    color: "#D15A5A"
}, {
    id: 3,
    title: "读者问答",
    icon: "fa-comments",
    color: "#6BA86B"
}, {
    id: 4,
    title: "写作教程",
    icon: "fa-pen-fancy",
    color: "#B9A16A"
}];

const recommendedTopics = [{
    id: 1,
    title: "如何构建引人入胜的故事情节",
    count: 128
}, {
    id: 2,
    title: "人物塑造的秘诀与技巧",
    count: 96
}, {
    id: 3,
    title: "创作灵感从何而来",
    count: 85
}, {
    id: 4,
    title: "如何处理写作瓶颈",
    count: 72
}, {
    id: 5,
    title: "网络文学的发展趋势",
    count: 64
}];

const audienceData = [{
    name: "学生",
    value: 35
}, {
    name: "职场人士",
    value: 40
}, {
    name: "自由职业",
    value: 15
}, {
    name: "其他",
    value: 10
}];

const COLORS = ["#3A7DA8", "#D15A5A", "#6BA86B", "#B9A16A"];

export default function LiveCreationPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"setup" | "audience" | "preview">("setup");
    const [liveTitle, setLiveTitle] = useState("");
    const [liveDescription, setLiveDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [liveDescription]);

    useEffect(() => {
        if (selectedTopic && !liveTitle) {
            const topic = recommendedTopics.find(t => t.id === selectedTopic);

            if (topic) {
                setLiveTitle(`关于「${topic.title}」的创作分享`);
            }
        }
    }, [selectedTopic, liveTitle]);

    const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("文件大小不能超过5MB");
                return;
            }

            if (!file.type.startsWith("image/")) {
                toast.error("请上传图片文件");
                return;
            }

            const reader = new FileReader();

            reader.onload = event => {
                setCoverImage(event.target?.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleStartLive = () => {
        if (!coverImage) {
            toast.error("请上传直播封面");
            return;
        }

        if (!liveTitle || !liveDescription || !startTime) {
            toast.error("请填写完整的直播信息");
            return;
        }

        setShowConfirmModal(true);
    };

    const confirmStartLive = () => {
        setShowConfirmModal(false);
        toast.success("直播即将开始，正在进入直播间...");

        setTimeout(() => {
            navigate("/live/1");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-rice-paper text-ink flex flex-col">
            {}
            <div
                className="bg-white border-b border-silk-gray p-4 sticky top-16 z-10 ink-splash">
                <div className="container mx-auto flex justify-between items-center">
                     <div className="flex items-center">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 rounded-full hover:bg-silk-gray transition-colors mr-2">
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <h1
                            className="text-2xl font-bold text-glass-blue flex items-center"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>
                            <i className="fas fa-video mr-2"></i>创建直播</h1>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 border border-silk-gray text-inkstone-gray rounded-lg text-sm hover:bg-silk-gray transition-colors">取消
                                        </button>
                        <button
                            onClick={handleStartLive}
                            className="px-4 py-2 bg-crabapple-red text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors">开始直播
                                        </button>
                    </div>
                </div>
            </div>
            {}
            <div className="bg-white border-b border-silk-gray sticky top-[7.5rem] z-10">
                <div className="container mx-auto flex overflow-x-auto hide-scrollbar">
                    <button
                        className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "setup" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("setup")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>基本设置
                                    {activeTab === "setup" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                    <button
                        className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "audience" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("audience")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>观众画像
                                    {activeTab === "audience" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                    <button
                        className={`py-4 px-6 whitespace-nowrap font-medium relative ${activeTab === "preview" ? "text-glass-blue" : "text-inkstone-gray"}`}
                        onClick={() => setActiveTab("preview")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>预览效果
                                    {activeTab === "preview" && <div
                            className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>}
                    </button>
                </div>
            </div>
            {}
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
                        className="mt-4">
                        {}
                        {activeTab === "setup" && <div
                            className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                            <h3
                                className="text-lg font-medium mb-5"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>直播基本信息
                                                </h3>
                            <div className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="liveCover"
                                        className="block text-sm font-medium text-inkstone-gray mb-2"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>直播封面
                                                            </label>
                                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                                        <div
                                            className="relative w-full sm:w-48 h-32 bg-silk-gray rounded-xl overflow-hidden border-2 border-dashed border-silk-gray hover:border-glass-blue transition-colors flex items-center justify-center cursor-pointer">
                                            {coverImage ? <>
                                                <img
                                                    src={coverImage}
                                                    alt="直播封面预览"
                                                    className="absolute inset-0 w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setCoverImage(null)}
                                                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </> : <>
                                                <input
                                                    type="file"
                                                    id="liveCover"
                                                    accept="image/*"
                                                    onChange={handleCoverUpload}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                <div className="text-center">
                                                    <i className="fas fa-cloud-upload-alt text-2xl text-inkstone-gray mb-1"></i>
                                                    <p className="text-xs text-inkstone-gray">点击上传封面图</p>
                                                    <p className="text-xs text-inkstone-gray mt-1">建议尺寸: 16:9</p>
                                                </div>
                                            </>}
                                        </div>
                                        <div className="text-xs text-inkstone-gray">
                                            <p>• 图片格式支持 JPG、PNG、WEBP</p>
                                            <p>• 最佳尺寸 1920x1080 像素</p>
                                            <p>• 文件大小不超过 5MB</p>
                                            <p>• 封面图将展示在直播列表和直播间</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="liveTitle"
                                        className="block text-sm font-medium text-inkstone-gray mb-2"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>直播标题
                                                            </label>
                                    <input
                                        type="text"
                                        id="liveTitle"
                                        value={liveTitle}
                                        onChange={e => setLiveTitle(e.target.value)}
                                        placeholder="请输入直播标题（20-50字）"
                                        className="w-full px-4 py-3 bg-silk-gray/50 border border-silk-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-glass-blue/30 transition-all"
                                        maxLength={50} />
                                    <p className="mt-1 text-xs text-inkstone-gray">标题应简洁明了，吸引目标观众</p>
                                </div>
                                <div>
                                    <label
                                        htmlFor="liveDescription"
                                        className="block text-sm font-medium text-inkstone-gray mb-2"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>直播简介
                                                            </label>
                                    <textarea
                                        ref={textareaRef}
                                        id="liveDescription"
                                        value={liveDescription}
                                        onChange={e => setLiveDescription(e.target.value)}
                                        placeholder="请详细介绍直播内容，让观众了解您将分享什么（100-300字）"
                                        className="w-full px-4 py-3 bg-silk-gray/50 border border-silk-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-glass-blue/30 transition-all resize-none min-h-[120px]"
                                        maxLength={300} />
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs text-inkstone-gray">详细的介绍能吸引更多感兴趣的观众</p>
                                        <span className="text-xs text-inkstone-gray">{liveDescription.length}/300</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="startTime"
                                            className="block text-sm font-medium text-inkstone-gray mb-2"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>开始时间
                                                                  </label>
                                        <input
                                            type="datetime-local"
                                            id="startTime"
                                            value={startTime}
                                            onChange={e => setStartTime(e.target.value)}
                                            className="w-full px-4 py-3 bg-silk-gray/50 border border-silk-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-glass-blue/30 transition-all"
                                            min={new Date().toISOString().slice(0, 16)} />
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-inkstone-gray mb-2"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>预计时长
                                                                  </label>
                                        <select
                                            className="w-full px-4 py-3 bg-silk-gray/50 border border-silk-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-glass-blue/30 transition-all appearance-none">
                                            <option value="30">30分钟</option>
                                            <option value="60" selected>1小时</option>
                                            <option value="90">1.5小时</option>
                                            <option value="120">2小时</option>
                                            <option value="180">3小时</option>
                                            <option value="custom">自定义</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-inkstone-gray mb-3"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>选择直播模板
                                                            </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {liveTemplates.map(template => <button
                                            key={template.id}
                                            onClick={() => setSelectedTemplate(prev => prev === template.id ? null : template.id)}
                                            className={`p-3 rounded-xl border text-center transition-all ${selectedTemplate === template.id ? `border-${template.color} bg-${template.color}/10 text-${template.color}` : "border-silk-gray hover:border-glass-blue hover:bg-glass-blue/5"}`}
                                            style={{
                                                borderColor: selectedTemplate === template.id ? template.color : "#E8E4D9",
                                                backgroundColor: selectedTemplate === template.id ? `${template.color}10` : "transparent",
                                                color: selectedTemplate === template.id ? template.color : "#2A2A2A"
                                            }}>
                                            <div className="flex justify-center mb-2">
                                                <i
                                                    className={`fas ${template.icon} text-xl`}
                                                    style={{
                                                        color: selectedTemplate === template.id ? template.color : "#A9A395"
                                                    }}></i>
                                            </div>
                                            <span className="text-sm">{template.title}</span>
                                        </button>)}
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-inkstone-gray mb-3"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>推荐话题
                                                            </label>
                                    <div className="flex flex-wrap gap-2">
                                        {recommendedTopics.map(topic => <button
                                            key={topic.id}
                                            onClick={() => setSelectedTopic(prev => prev === topic.id ? null : topic.id)}
                                            className={`px-3 py-1.5 rounded-full text-sm flex items-center transition-all ${selectedTopic === topic.id ? "bg-glass-blue text-white" : "bg-silk-gray text-inkstone-gray hover:bg-glass-blue/10 hover:text-glass-blue"}`}>
                                            {topic.title}
                                            <span className="ml-2 text-xs opacity-70">{topic.count}</span>
                                        </button>)}
                                    </div>
                                </div>
                                <div>
                                    <label className="flex items-center mb-3">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-glass-blue bg-silk-gray rounded border-silk-gray focus:ring-glass-blue mr-2"
                                            defaultChecked />
                                        <span
                                            className="text-sm font-medium text-inkstone-gray"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>自动保存直播内容为文章
                                                                  </span>
                                    </label>
                                    <label className="flex items-center mb-3">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-glass-blue bg-silk-gray rounded border-silk-gray focus:ring-glass-blue mr-2"
                                            defaultChecked />
                                        <span
                                            className="text-sm font-medium text-inkstone-gray"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>开播前提醒已预约观众
                                                                  </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-glass-blue bg-silk-gray rounded border-silk-gray focus:ring-glass-blue mr-2" />
                                        <span
                                            className="text-sm font-medium text-inkstone-gray"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>允许观众录制直播内容
                                                                  </span>
                                    </label>
                                </div>
                            </div>
                        </div>}
                        {}
                        {activeTab === "audience" && <div
                            className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                            <h3
                                className="text-lg font-medium mb-5"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>观众画像分析
                                                </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4
                                        className="font-medium mb-4"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>观众职业分布
                                                            </h4>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={audienceData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    label={(
                                                        {
                                                            name,
                                                            percent
                                                        }
                                                    ) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    labelLine={false}>
                                                    {audienceData.map(
                                                        (entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    )}
                                                </Pie>
                                                <Tooltip
                                                    formatter={value => [`${value}%`, "占比"]}
                                                    contentStyle={{
                                                        backgroundColor: "white",
                                                        borderColor: "#E8E4D9",
                                                        borderRadius: "8px",
                                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                                    }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div>
                                    <h4
                                        className="font-medium mb-4"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>观众兴趣标签
                                                            </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm">文学创作</span>
                                                <span className="text-sm text-glass-blue">85%</span>
                                            </div>
                                            <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-glass-blue rounded-full"
                                                    style={{
                                                        width: "85%"
                                                    }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm">推理小说</span>
                                                <span className="text-sm text-crabapple-red">72%</span>
                                            </div>
                                            <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-crabapple-red rounded-full"
                                                    style={{
                                                        width: "72%"
                                                    }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm">科幻文学</span>
                                                <span className="text-sm text-bamboo-green">64%</span>
                                            </div>
                                            <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-bamboo-green rounded-full"
                                                    style={{
                                                        width: "64%"
                                                    }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm">职场故事</span>
                                                <span className="text-sm text-autumn-yellow">58%</span>
                                            </div>
                                            <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-autumn-yellow rounded-full"
                                                    style={{
                                                        width: "58%"
                                                    }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm">历史传奇</span>
                                                <span className="text-sm text-glass-blue">45%</span>
                                            </div>
                                            <div className="h-2 w-full bg-silk-gray rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-glass-blue rounded-full"
                                                    style={{
                                                        width: "45%"
                                                    }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-rice-paper rounded-lg">
                                <h4
                                    className="font-medium mb-3"
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>直播建议
                                                      </h4>
                                <ul className="space-y-2 text-sm text-inkstone-gray">
                                    <li className="flex items-start">
                                        <i className="fas fa-lightbulb text-autumn-yellow mt-0.5 mr-2"></i>
                                        <span>根据观众画像，您的粉丝主要是文学创作爱好者和推理小说迷，可以多分享相关创作经验</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-lightbulb text-autumn-yellow mt-0.5 mr-2"></i>
                                        <span>建议在直播中增加互动环节，如创作问答、案例分析等，提高观众参与度</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-lightbulb text-autumn-yellow mt-0.5 mr-2"></i>
                                        <span>可以考虑设置直播预告，提前收集观众感兴趣的话题，提高直播针对性</span>
                                    </li>
                                </ul>
                            </div>
                        </div>}
                        {}
                        {activeTab === "preview" && <div
                            className="bg-white rounded-xl shadow-sm border border-silk-gray p-5 ink-splash">
                            <h3
                                className="text-lg font-medium mb-5"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>直播效果预览
                                                </h3>
                            <div className="border border-silk-gray rounded-xl overflow-hidden">
                                {}
                                <div
                                    className="bg-gradient-to-r from-glass-blue to-bamboo-green p-5 text-white">
                                    <div className="flex items-center mb-3">
                                        <div
                                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                                            <i className="fas fa-video text-xl"></i>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-medium">{liveTitle || "直播标题预览"}</h4>
                                            <p className="text-white/80 text-sm">{startTime ? new Date(startTime).toLocaleString("zh-CN") : "2025-11-22 20:00"}</p>
                                        </div>
                                    </div>
                                    <p className="text-white/90">{liveDescription || "这是直播简介的预览内容，将向观众展示直播的主要内容和亮点。详细的介绍能吸引更多感兴趣的观众参与直播互动。"}</p>
                                </div>
                                {}
                                <div className="p-5">
                                    <div className="flex items-center mb-4">
                                        <div
                                            className="w-10 h-10 rounded-full bg-silk-gray flex items-center justify-center text-inkstone-gray mr-3">
                                            <i className="fas fa-user"></i>
                                        </div>
                                        <div>
                                            <div className="flex items-center">
                                                <span className="font-medium">您的昵称</span>
                                                <span
                                                    className="ml-2 text-xs px-2 py-0.5 bg-glass-blue/10 text-glass-blue rounded-full">主播</span>
                                            </div>
                                            <p className="text-xs text-inkstone-gray mt-0.5">创作者 · 文学爱好者</p>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h5 className="font-medium">直播内容安排</h5>
                                            <span className="text-xs text-inkstone-gray">预计时长：1小时</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="p-3 bg-silk-gray/30 rounded-lg">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm">开场介绍</span>
                                                    <span className="text-xs text-inkstone-gray">10分钟</span>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-silk-gray/30 rounded-lg">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm">主题分享</span>
                                                    <span className="text-xs text-inkstone-gray">30分钟</span>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-silk-gray/30 rounded-lg">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm">观众问答</span>
                                                    <span className="text-xs text-inkstone-gray">20分钟</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center text-inkstone-gray">
                                            <span className="flex items-center mr-3">
                                                <i className="fas fa-eye mr-1"></i>预计观看：258人
                                                                        </span>
                                            <span className="flex items-center">
                                                <i className="fas fa-bell mr-1"></i>已预约：126人
                                                                        </span>
                                        </div>
                                        <button
                                            className="px-4 py-2 bg-crabapple-red text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors">进入直播
                                                                  </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h4
                                    className="font-medium mb-3"
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>直播提示
                                                      </h4>
                                <div
                                    className="p-4 bg-crabapple-red/5 border border-crabapple-red/20 rounded-lg">
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start">
                                            <i className="fas fa-exclamation-circle text-crabapple-red mt-0.5 mr-2"></i>
                                            <span>请确保网络连接稳定，建议使用有线网络或信号良好的Wi-Fi</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fas fa-exclamation-circle text-crabapple-red mt-0.5 mr-2"></i>
                                            <span>直播前建议测试设备和麦克风，确保直播质量</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fas fa-exclamation-circle text-crabapple-red mt-0.5 mr-2"></i>
                                            <span>建议提前准备好直播大纲和相关素材，确保直播流畅进行</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>}
                    </motion.div>
                </AnimatePresence>
            </main>
            {}
            <AnimatePresence>
                {showConfirmModal && <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0
                    }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowConfirmModal(false)}>
                    <motion.div
                        initial={{
                            scale: 0.9,
                            y: 20
                        }}
                        animate={{
                            scale: 1,
                            y: 0
                        }}
                        exit={{
                            scale: 0.9,
                            y: 20
                        }}
                        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
                        onClick={e => e.stopPropagation()}>
                        <div className="text-center mb-4">
                            <div
                                className="w-16 h-16 mx-auto mb-3 rounded-full bg-crabapple-red/10 flex items-center justify-center text-crabapple-red">
                                <i className="fas fa-video text-2xl"></i>
                            </div>
                            <h3
                                className="text-xl font-medium"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>确认开始直播
                                                </h3>
                            <p className="text-sm text-inkstone-gray mt-1">直播开始后将无法修改直播信息，确定要立即开始吗？
                                                </p>
                        </div>
                        <div className="p-4 bg-rice-paper rounded-lg mb-4">
                            <h4
                                className="font-medium mb-2"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>直播信息确认
                                                </h4>
                            <div className="space-y-3">
                                {coverImage && <div className="flex justify-center">
                                    <img
                                        src={coverImage}
                                        alt="直播封面"
                                        className="w-48 h-27 object-cover rounded-lg mb-2" />
                                </div>}
                                <div className="flex justify-between text-sm">
                                    <span className="text-inkstone-gray">直播标题：</span>
                                    <span>{liveTitle}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-inkstone-gray">开始时间：</span>
                                    <span>{startTime ? new Date(startTime).toLocaleString("zh-CN") : "立即开始"}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-inkstone-gray">预计时长：</span>
                                    <span>1小时</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="flex-1 py-2.5 border border-silk-gray text-inkstone-gray rounded-lg text-sm font-medium hover:bg-silk-gray transition-colors"
                                onClick={() => setShowConfirmModal(false)}>返回修改
                                                </button>
                            <button
                                className="flex-1 py-2.5 bg-crabapple-red text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
                                onClick={confirmStartLive}>确认开始
                                                </button>
                        </div>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
        </div>
    );
}