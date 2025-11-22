import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            toast.error("请填写所有必填字段");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("请输入有效的电子邮箱");
            return;
        }

        if (password.length < 6) {
            toast.error("密码长度至少为6位");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("两次输入的密码不一致");
            return;
        }

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("注册成功，请登录");
            navigate("/login");
        } catch (error) {
            toast.error("注册失败，请稍后重试");
        } finally {
            setIsLoading(false);
        }
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
                    backgroundImage: "url(https://space-static.coze.site/coze_space/7574875098542162219/upload/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20251121070315_810x1440.jpg?sign=1766272006-c2d37b8b80-0-ea56224b711d82800637f2fd925e0bf6f64c9157c877df1c12a37bb6ae9ad80f)",
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
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>墨</span>
                    </div>
                    <h1
                        className="text-2xl font-bold text-ink"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>创建账号</h1>
                    <p className="text-sm text-inkstone-gray mt-1">加入墨刻，开启您的阅读社交之旅</p>
                </div>
                {}
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-inkstone-gray mb-2">用户名
                                        </label>
                        <div className="relative">
                            <span
                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-inkstone-gray">
                                <i className="far fa-user"></i>
                            </span>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="请设置用户名"
                                className="w-full pl-10 pr-4 py-3 bg-silk-gray/50 border border-silk-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-glass-blue/30 transition-all"
                                autoComplete="username" />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-inkstone-gray mb-2">电子邮箱
                                        </label>
                        <div className="relative">
                            <span
                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-inkstone-gray">
                                <i className="far fa-envelope"></i>
                            </span>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="请输入电子邮箱"
                                className="w-full pl-10 pr-4 py-3 bg-silk-gray/50 border border-silk-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-glass-blue/30 transition-all"
                                autoComplete="email" />
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
                                placeholder="请设置密码"
                                className="w-full pl-10 pr-10 py-3 bg-silk-gray/50 border border-silk-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-glass-blue/30 transition-all"
                                autoComplete="new-password" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-inkstone-gray hover:text-ink">
                                {showPassword ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}
                            </button>
                        </div>
                        <p className="mt-1 text-xs text-inkstone-gray">密码长度至少为6位</p>
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-inkstone-gray mb-2">确认密码
                                        </label>
                        <div className="relative">
                            <span
                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-inkstone-gray">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="请再次输入密码"
                                className="w-full pl-10 pr-10 py-3 bg-silk-gray/50 border border-silk-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-glass-blue/30 transition-all"
                                autoComplete="new-password" />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-inkstone-gray hover:text-ink">
                                {showConfirmPassword ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <input
                            type="checkbox"
                            id="terms"
                            className="w-4 h-4 mt-1 text-glass-blue bg-silk-gray rounded border-silk-gray focus:ring-glass-blue" />
                        <label htmlFor="terms" className="ml-2 block text-sm text-inkstone-gray">我已阅读并同意<a href="#" className="text-glass-blue hover:underline">《用户协议》</a>和<a href="#" className="text-glass-blue hover:underline">《隐私政策》</a>
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-glass-blue text-white rounded-xl font-medium hover:bg-glass-blue/90 focus:outline-none focus:ring-2 focus:ring-glass-blue/50 transition-all btn-chinese"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif",
                            color: "#0A0A0A",
                            backgroundColor: "#FFFFFF"
                        }}>
                        {isLoading ? <div className="flex items-center justify-center">
                            <div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>注册中...
                                          </div> : "注册"}
                    </button>
                </form>
                {}
                <div className="mt-8 text-center">
                    <p className="text-sm text-inkstone-gray">已有账号？{" "}
                        <Link
                            to="/login"
                            className="text-glass-blue hover:text-glass-blue/80 transition-colors font-medium">立即登录
                                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}