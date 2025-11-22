import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, UserRole } from "@/contexts/authContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function RoleSelectionPage() {
    const {
        setUserRole
    } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleRoleSelect = (role: UserRole) => {
        setUserRole(role);
        toast.success(`已选择${role === "reader" ? "读者" : "创作者"}身份`);

        setTimeout(() => {
            navigate("/");
        }, 1000);
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4"
            style={{
                backgroundImage: `url(https://lf-code-agent.coze.cn/obj/x-ai-cn/288071577858/attachment/微信图片_20251121065528_20251121065553.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed"
            }}>
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 0.5
                }}
                className="w-full max-w-lg text-center mb-12">
                <div
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-glass-blue to-bamboo-green flex items-center justify-center"
                    style={{
                        backgroundColor: "#93B4FF"
                    }}>
                    <span
                        className="text-white text-4xl font-bold"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>墨</span>
                </div>
                <h1
                    className="text-3xl font-bold text-ink mb-4"
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>选择您的身份</h1>
                <p className="text-lg text-inkstone-gray max-w-md mx-auto">请选择您在墨刻的身份，您可以随时在个人中心切换身份
                                                </p>
            </motion.div>
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
                {}
                <motion.div
                    whileHover={{
                        y: -5,
                        scale: 1.02
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300
                    }}
                    className="bg-white rounded-2xl shadow-lg border border-silk-gray p-8 cursor-pointer group"
                    onClick={() => handleRoleSelect("reader")}
                    style={{
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "50% 50%",
                        backgroundImage: "url(https://space-static.coze.site/coze_space/7574875098542162219/upload/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20251121070315_810x1440.jpg?sign=1766274219-faca1443c1-0-c7359916887684b780019fb85d93a3b1cd51c5854edb6f2eea9f159a104e4c8b)"
                    }}>
                    <></>
                    <h2
                        className="text-2xl font-bold text-ink mb-3"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>读者</h2>
                    <p
                        className="text-inkstone-gray mb-6"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>发现优质内容，参与读书讨论，记录阅读感悟，与志同道合的读者交流
                                                          </p>
                    <div className="bg-silk-gray/50 rounded-xl p-4">
                        <h3
                            className="text-sm font-medium mb-2"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>读者权益</h3>
                        <ul className="space-y-2 text-sm text-inkstone-gray">
                            <li className="flex items-start">
                                <i className="fas fa-check-circle text-bamboo-green mt-0.5 mr-2"></i>
                                <span
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>无限制阅读平台所有内容</span>
                            </li>
                            <li className="flex items-start">
                                <i className="fas fa-check-circle text-bamboo-green mt-0.5 mr-2"></i>
                                <span
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>参与读书讨论和社区互动</span>
                            </li>
                            <li className="flex items-start">
                                <i className="fas fa-check-circle text-bamboo-green mt-0.5 mr-2"></i>
                                <span
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>创建个人阅读档案和书摘</span>
                            </li>
                            <li className="flex items-start">
                                <i className="fas fa-check-circle text-bamboo-green mt-0.5 mr-2"></i>
                                <span
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>接收个性化阅读推荐</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>
                {}
                <motion.div
                    whileHover={{
                        y: -5,
                        scale: 1.02
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300
                    }}
                    className="bg-white rounded-2xl shadow-lg border border-silk-gray p-8 cursor-pointer group"
                    onClick={() => handleRoleSelect("creator")}
                    style={{
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "50% 50%",
                        backgroundSize: "100% 100%",
                        backgroundImage: "url(https://space-static.coze.site/coze_space/7574875098542162219/upload/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20251121070315_810x1440.jpg?sign=1766274245-d05bbee543-0-788c989796da198f48a50c0a605abd9adf8792ffd2a5bf14b2c4d9544ba0714c)"
                    }}>
                    <></>
                    <h2
                        className="text-2xl font-bold text-ink mb-3"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>创作者</h2>
                    <p
                        className="text-inkstone-gray mb-6"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>发布原创内容，举办线上读书会，分享创作心得，打造个人品牌
                                                          </p>
                    <div className="bg-silk-gray/50 rounded-xl p-4">
                        <h3 className="text-sm font-medium mb-2">创作者权益</h3>
                        <ul className="space-y-2 text-sm text-inkstone-gray">
                            <li className="flex items-start">
                                <i className="fas fa-check-circle text-bamboo-green mt-0.5 mr-2"></i>
                                <span
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>发布原创文章和读书心得</span>
                            </li>
                            <li className="flex items-start">
                                <i className="fas fa-check-circle text-bamboo-green mt-0.5 mr-2"></i>
                                <span
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>创建专属圈子和读书会</span>
                            </li>
                            <li className="flex items-start">
                                <i className="fas fa-check-circle text-bamboo-green mt-0.5 mr-2"></i>
                                <span
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>举办线上直播和讲座</span>
                            </li>
                            <li className="flex items-start">
                                <i className="fas fa-check-circle text-bamboo-green mt-0.5 mr-2"></i>
                                <span
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>获取创作数据和读者反馈</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </div>
            {}
            <p className="mt-12 text-sm text-inkstone-gray">您可以随时在个人中心切换读者/创作者身份
                                      </p>
        </div>
    );
}