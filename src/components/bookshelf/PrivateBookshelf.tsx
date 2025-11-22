import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Book {
    id: number;
    title: string;
    author: string;
    coverUrl: string;
}

export function PrivateBookshelf() {
    const [isLocked, setIsLocked] = useState(true);
    const [password, setPassword] = useState("");

    const privateBooks: Book[] = [{
        id: 1,
        title: "亲密关系",
        author: "克里斯多福·孟",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Relationship%20Psychology%20Book%20Cover&sign=60c857d2a5f51641ce01bdad30f9f95c"
    }, {
        id: 2,
        title: "原生家庭",
        author: "苏珊·福沃德",
        coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Family%20Psychology%20Book%20Cover&sign=0a3a3e99daf248724d4080a491db95de"
    }];

    const handleUnlock = () => {
        if (password === "1234") {
            setIsLocked(false);
            toast.success("私密书架已解锁");
        } else {
            toast.error("密码错误，请重试");
        }
    };

    const handleLock = () => {
        setIsLocked(true);
        setPassword("");
        toast.info("私密书架已锁定");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleUnlock();
        }
    };

    if (isLocked) {
        return (
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden p-6 min-h-[600px] flex flex-col items-center justify-center">
                <div
                    className="w-24 h-24 rounded-full bg-crabapple-red/10 flex items-center justify-center mb-6">
                    <i className="fas fa-lock text-crabapple-red text-3xl"></i>
                </div>
                <h2
                    className="text-2xl font-bold text-ink mb-2"
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>私密书架</h2>
                <p
                    className="text-inkstone-gray text-center mb-8 max-w-md"
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>此区域包含您标记为私密的书籍，需要密码才能访问
                            </p>
                <div className="w-full max-w-md">
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-inkstone-gray mb-2"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>请输入密码
                                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full px-4 py-3 bg-silk-gray/50 border border-silk-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-glass-blue/30"
                                placeholder="请输入4位数字密码"
                                maxLength={4} />
                            <button
                                type="button"
                                onClick={handleUnlock}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese">解锁
                                              </button>
                        </div>
                    </div>
                    <div className="text-center text-sm text-inkstone-gray">
                        <button
                            className="hover:text-glass-blue transition-colors"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>忘记密码？</button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden p-6 ink-splash">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-glass-blue flex items-center">
                    <i className="fas fa-user-shield text-crabapple-red mr-2"></i>私密书架
                            </h2>
                <button
                    onClick={handleLock}
                    className="px-3 py-1.5 bg-crabapple-red text-white rounded-full text-sm hover:bg-opacity-90 transition-colors flex items-center">
                    <i className="fas fa-lock mr-1"></i>锁定
                            </button>
            </div>
            <div className="mb-6 p-4 bg-silk-gray/30 rounded-lg border border-silk-gray">
                <div className="flex items-start">
                    <div
                        className="w-10 h-10 rounded-full bg-glass-blue/10 flex items-center justify-center flex-shrink-0 mr-3">
                        <i className="fas fa-info-circle text-glass-blue"></i>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium mb-1">私密书架说明</h3>
                        <p className="text-xs text-inkstone-gray">私密书架中的书籍仅您可见，不会在公开区域显示。您可以将个人敏感或不想被他人看到的书籍添加到此处。
                                        </p>
                    </div>
                </div>
            </div>
            {}
            <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {privateBooks.map((book, index) => <motion.div
                    key={book.id}
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        delay: index * 0.1
                    }}
                    className="relative">
                    <Link to={`/read/${book.id}`} className="block group">
                        <div className="w-32 h-44 flex-shrink-0 mx-auto chinese-corner-decoration">
                            <img
                                src={book.coverUrl}
                                alt={book.title}
                                className="w-full h-full object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow" />
                            <div
                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-crabapple-red/80 flex items-center justify-center">
                                <i className="fas fa-lock text-white"></i>
                            </div>
                        </div>
                        <div className="mt-2 text-center">
                            <h3 className="text-sm font-medium truncate max-w-32 mx-auto">{book.title}</h3>
                            <p className="text-xs text-inkstone-gray truncate max-w-32 mx-auto">{book.author}</p>
                        </div>
                    </Link>
                    {}
                    <div
                        className="absolute -right-4 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                            <i className="fas fa-ellipsis-v text-inkstone-gray"></i>
                        </button>
                    </div>
                </motion.div>)}
                {}
                <motion.div
                    whileHover={{
                        scale: 1.05
                    }}
                    whileTap={{
                        scale: 0.95
                    }}>
                    <button
                        className="w-32 h-44 mx-auto flex flex-col items-center justify-center border-2 border-dashed border-inkstone-gray/30 rounded-lg hover:border-glass-blue hover:bg-glass-blue/5 transition-colors">
                        <i className="fas fa-plus text-inkstone-gray text-xl mb-2"></i>
                        <span className="text-sm text-inkstone-gray">添加私密书籍</span>
                    </button>
                </motion.div>
            </div>
            {}
            <div className="mt-8 pt-4 border-t border-silk-gray">
                <h3 className="text-sm font-medium mb-3">安全设置</h3>
                <div className="space-y-3">
                    <button
                        className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-silk-gray transition-colors flex justify-between items-center">
                        <span className="text-sm">修改密码</span>
                        <i className="fas fa-chevron-right text-xs text-inkstone-gray"></i>
                    </button>
                    <button
                        className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-silk-gray transition-colors flex justify-between items-center">
                        <span className="text-sm">生物识别解锁</span>
                        <div className="relative inline-block w-10 h-5">
                            <input type="checkbox" id="biometric" className="opacity-0 w-0 h-0" />
                            <span
                                className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-inkstone-gray rounded-full before:absolute before:content-[''] before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all checked:before:translate-x-5 checked:bg-glass-blue"></span>
                        </div>
                    </button>
                    <button
                        className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-silk-gray transition-colors flex justify-between items-center">
                        <span className="text-sm">自动锁定时间</span>
                        <div className="flex items-center">
                            <span className="text-xs text-inkstone-gray mr-2">5分钟后</span>
                            <i className="fas fa-chevron-right text-xs text-inkstone-gray"></i>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}