import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        setIsAuthenticated
    } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const savedAuth = localStorage.getItem("isAuthenticated");

        if (savedAuth === "true") {
            navigate("/role-selection", {
                replace: true
            });
        }
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            toast.error("请输入用户名和密码");
            return;
        }

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if ((username === "reader" || username === "creator") && password === "123456") {
                localStorage.setItem("userRole", username);
                setIsAuthenticated(true);
                toast.success(`登录成功，欢迎 ${username === "reader" ? "读者" : "创作者"}`);

                navigate("/", {
                    replace: true
                });
            } else {
                toast.error("用户名或密码错误，请使用测试账号: reader/123456 或 creator/123456");
            }
        } catch (error) {
            console.error("登录错误:", error);
            toast.error("登录失败，请稍后重试");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && e.ctrlKey) {
                setUsername("reader");
                setPassword("123456");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const clearAuthData = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userRole");
        toast.info("已清除登录数据");
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: `url(https://lf-code-agent.coze.cn/obj/x-ai-cn/288071577858/attachment/微信图片_20251121065528_20251121065553.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed"
            }}>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.5
                }}
                className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-silk-gray p-8 relative overflow-hidden"
                style={{
                    backgroundColor: "#FDE68A",
                    backgroundImage: "url(https://space-static.coze.site/coze_space/7574875098542162219/upload/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20251121070315_810x1440.jpg?sign=1766271822-5187f5898a-0-6af386e79753dffac34622ca0d4ccaabcc88e53e7640bfcefbca37339c7adbeb)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 50%"
                }}>
                {}
                <div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-glass-blue to-bamboo-green"></div>
                {}
                <div className="text-center mb-8">
                    <div
                        className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-glass-blue to-bamboo-green flex items-center justify-center"
                        style={{
                            backgroundColor: "#93B4FF"
                        }}>
                        <span
                            className="text-white text-3xl font-bold"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif",
                                backgroundColor: "#93B4FF",
                                color: "#FFFFFF"
                            }}>墨</span>
                    </div>
                    <h1
                        className="text-2xl font-bold text-ink"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>墨刻阅读</h1>
                    <p className="text-sm text-inkstone-gray mt-1">欢迎回来，继续您的阅读之旅</p>
                </div>
                {}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-inkstone-gray mb-2">用户名
                                                                    </label>
                        <div
                            className="relative"
                            style={{
                                backgroundColor: "#FFFFFF"
                            }}>
                            <span
                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-inkstone-gray">
                                <i className="far fa-user"></i>
                            </span>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="请输入用户名 (reader/creator)"
                                className="w-full pl-10 pr-4 py-3 bg-silk-gray/50 border border-silk-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-glass-blue/30 transition-all"
                                autoComplete="username" />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-inkstone-gray mb-2">密码
                                                                    </label>
                        <div className="relative">
                            <span
                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-inkstone-gray">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="请输入密码 (123456)"
                                className="w-full pl-10 pr-10 py-3 bg-silk-gray/50 border border-silk-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-glass-blue/30 transition-all"
                                autoComplete="current-password" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-inkstone-gray hover:text-ink">
                                {showPassword ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 text-glass-blue bg-silk-gray rounded border-silk-gray focus:ring-glass-blue" />
                            <label htmlFor="remember" className="ml-2 block text-sm text-inkstone-gray">记住我
                                                                              </label>
                        </div>
                        <button
                            type="button"
                            onClick={clearAuthData}
                            className="text-sm text-crabapple-red hover:text-crabapple-red/80 transition-colors">清除登录状态
                                                                    </button>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-glass-blue text-white rounded-xl font-medium hover:bg-glass-blue/90 focus:outline-none focus:ring-2 focus:ring-glass-blue/50 transition-all btn-chinese"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif",
                            backgroundColor: "#FFFFFF",
                            color: "#0A0A0A"
                        }}>
                        {isLoading ? <div className="flex items-center justify-center">
                            <div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>登录中...
                                                                      </div> : "登录"}
                    </button>
                </form>
                {}
                <div className="mt-8 text-center">
                    <p className="text-sm text-inkstone-gray">还没有账号？{" "}
                        <Link
                            to="/register"
                            className="text-glass-blue hover:text-glass-blue/80 transition-colors font-medium">立即注册
                                                                    </Link>
                    </p>
                </div>
                {}
                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-silk-gray"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-inkstone-gray">其他登录方式</span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <button
                            className="flex items-center justify-center py-2 border border-silk-gray rounded-xl bg-white text-inkstone-gray hover:bg-silk-gray/50 transition-colors">
                            <i className="fab fa-weixin text-xl"></i>
                        </button>
                        <button
                            className="flex items-center justify-center py-2 border border-silk-gray rounded-xl bg-white text-inkstone-gray hover:bg-silk-gray/50 transition-colors">
                            <i className="fab fa-qq text-xl"></i>
                        </button>
                        <button
                            className="flex items-center justify-center py-2 border border-silk-gray rounded-xl bg-white text-inkstone-gray hover:bg-silk-gray/50 transition-colors">
                            <i className="fab fa-weibo text-xl"></i>
                        </button>
                    </div>
                </div>
                {}
                <div className="mt-4 text-center">
                    <p className="text-xs text-inkstone-gray">测试账号: reader/123456 或 creator/123456
                                                          </p>
                </div>
            </motion.div>
        </div>
    );
}