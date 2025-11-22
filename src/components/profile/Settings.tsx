import { useState } from "react";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import { useNavigate } from "react-router-dom";

const notificationSettings = [{
    id: 1,
    name: "直播开始提醒",
    description: "预约的直播开始前15分钟提醒",
    isEnabled: true
}, {
    id: 2,
    name: "社区新动态",
    description: "关注的社区有新内容更新时提醒",
    isEnabled: true
}, {
    id: 3,
    name: "好友动态",
    description: "好友发布新内容或点赞评论时提醒",
    isEnabled: false
}, {
    id: 4,
    name: "系统通知",
    description: "平台活动、版本更新等系统消息",
    isEnabled: true
}, {
    id: 5,
    name: "阅读目标提醒",
    description: "每日阅读目标完成情况提醒",
    isEnabled: true
}];

const privacySettings = [{
    id: 1,
    name: "公开我的阅读记录",
    description: "允许他人查看我的阅读进度和已读书籍",
    isEnabled: false
}, {
    id: 2,
    name: "公开我的书评和笔记",
    description: "允许他人查看我的书评和笔记内容",
    isEnabled: true
}, {
    id: 3,
    name: "允许陌生人私信",
    description: "允许未关注的用户给我发送私信",
    isEnabled: false
}, {
    id: 4,
    name: "推荐给可能认识的人",
    description: "在推荐系统中展示给可能认识的用户",
    isEnabled: true
}, {
    id: 5,
    name: "个性化推荐",
    description: "根据我的阅读习惯推荐内容",
    isEnabled: true
}];

export function Settings() {
    const [activeTab, setActiveTab] = useState<"account" | "privacy" | "notification">("privacy");

    const {
        logout
    } = useContext(AuthContext);

    const navigate = useNavigate();

    const userInfo = {
        username: "用户名",
        email: "user@example.com",
        avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Portrait%20Silhouette&sign=45fd7dc39ab1727c4dd3e674074b5674",
        joinDate: "2025-05-15",
        lastLogin: "2025-11-20 20:30"
    };

    const handleNotificationToggle = (id: number) => {
        toast.info("通知设置已更新");
    };

    const handlePrivacyToggle = (id: number) => {
        toast.info("隐私设置已更新");
    };

    const handlePasswordChange = () => {
        toast.info("密码修改功能暂未实现");
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
        toast.success("已成功退出登录");
    };

    return (
        <div className="space-y-6">
            {}
            <div
                className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden">
                <div
                    className="flex border-b border-silk-gray"
                    style={{
                        padding: "16px"
                    }}>
                    <button
                        className={`py-3 px-6 text-sm font-medium border-b-2 ${activeTab === "account" ? "text-glass-blue border-glass-blue" : "text-inkstone-gray border-transparent"}`}
                        onClick={() => setActiveTab("account")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>账号管理
                                  </button>
                    <button
                        className={`py-3 px-6 text-sm font-medium border-b-2 ${activeTab === "privacy" ? "text-glass-blue border-glass-blue" : "text-inkstone-gray border-transparent"}`}
                        onClick={() => setActiveTab("privacy")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>隐私设置
                                  </button>
                    <button
                        className={`py-3 px-6 text-sm font-medium border-b-2 ${activeTab === "notification" ? "text-glass-blue border-glass-blue" : "text-inkstone-gray border-transparent"}`}
                        onClick={() => setActiveTab("notification")}
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>通知设置
                                  </button>
                </div>
                {}
                {activeTab === "account" && <div className="p-6">
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div
                                className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md relative">
                                <img
                                    src={userInfo.avatar}
                                    alt="User Avatar"
                                    className="w-full h-full object-cover" />
                                <div
                                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-bamboo-green flex items-center justify-center text-white">
                                    <i className="fas fa-camera"></i>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-inkstone-gray mb-1"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>用户名
                                                                  </label>
                                        <div className="flex items-center">
                                            <input
                                                type="text"
                                                value={userInfo.username}
                                                readOnly
                                                className="flex-1 px-4 py-2 bg-silk-gray rounded-lg text-sm"
                                                style={{
                                                    fontFamily: "\"Noto Serif SC\", serif"
                                                }} />
                                            <button
                                                className="ml-2 px-3 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
                                                style={{
                                                    fontFamily: "\"Noto Serif SC\", serif"
                                                }}>修改
                                                                        </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-inkstone-gray mb-1"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>电子邮箱
                                                                  </label>
                                        <div className="flex items-center">
                                            <input
                                                type="email"
                                                value={userInfo.email}
                                                readOnly
                                                className="flex-1 px-4 py-2 bg-silk-gray rounded-lg text-sm"
                                                style={{
                                                    fontFamily: "\"Noto Serif SC\", serif"
                                                }} />
                                            <span
                                                className="ml-2 text-xs text-bamboo-green flex items-center"
                                                style={{
                                                    fontFamily: "\"Noto Serif SC\", serif"
                                                }}>
                                                <i className="fas fa-check-circle mr-1"></i>已验证
                                                                        </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-inkstone-gray mb-1"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>密码
                                                                  </label>
                                        <button
                                            onClick={handlePasswordChange}
                                            className="px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese w-full"
                                            style={{
                                                fontFamily: "\"Noto Serif SC\", serif"
                                            }}>修改密码
                                                                  </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-silk-gray">
                            <h3
                                className="text-lg font-medium mb-4"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>账号信息
                                                </h3>
                            <div className="space-y-3">
                                <div
                                    className="flex justify-between items-center p-3 bg-rice-paper rounded-lg">
                                    <span
                                        className="text-sm text-inkstone-gray"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>注册时间
                                                            </span>
                                    <span
                                        className="text-sm"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        {userInfo.joinDate}
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center p-3 bg-rice-paper rounded-lg">
                                    <span
                                        className="text-sm text-inkstone-gray"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>上次登录
                                                            </span>
                                    <span
                                        className="text-sm"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        {userInfo.lastLogin}
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center p-3 bg-rice-paper rounded-lg">
                                    <span
                                        className="text-sm text-inkstone-gray"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>账号状态
                                                            </span>
                                    <span
                                        className="text-sm text-bamboo-green"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>正常
                                                            </span>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-silk-gray">
                            <button
                                onClick={handleLogout}
                                className="w-full py-3 bg-crabapple-red text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>退出登录
                                                </button>
                        </div>
                    </div>
                </div>}
                {}
                {activeTab === "privacy" && <div className="p-6">
                    <div className="space-y-4">
                        {privacySettings.map(setting => <div
                            key={setting.id}
                            className="p-4 bg-rice-paper rounded-lg hover:bg-silk-gray/50 transition-colors">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3
                                        className="text-sm font-medium mb-1"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        {setting.name}
                                    </h3>
                                    <p
                                        className="text-xs text-inkstone-gray"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        {setting.description}
                                    </p>
                                </div>
                                <div className="relative inline-block w-10 h-5">
                                    <input
                                        type="checkbox"
                                        id={`privacy-${setting.id}`}
                                        className="opacity-0 w-0 h-0"
                                        checked={setting.isEnabled}
                                        onChange={() => handlePrivacyToggle(setting.id)} />
                                    <span
                                        className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-glass-blue rounded-full before:absolute before:content-[''] before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all checked:before:translate-x-5"></span>
                                </div>
                            </div>
                        </div>)}
                    </div>
                    <div
                        className="mt-8 p-4 bg-crabapple-red/5 border border-crabapple-red/20 rounded-lg">
                        <h3
                            className="text-sm font-medium mb-2 text-crabapple-red"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>隐私保护提示
                                          </h3>
                        <p
                            className="text-xs text-inkstone-gray"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>我们重视您的隐私保护。您可以随时调整上述设置来控制个人信息的可见性。如有任何疑问，请联系客服支持。
                                          </p>
                    </div>
                </div>}
                {}
                {activeTab === "notification" && <div className="p-6">
                    <div className="space-y-4">
                        {notificationSettings.map(setting => <div
                            key={setting.id}
                            className="p-4 bg-rice-paper rounded-lg hover:bg-silk-gray/50 transition-colors">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3
                                        className="text-sm font-medium mb-1"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        {setting.name}
                                    </h3>
                                    <p
                                        className="text-xs text-inkstone-gray"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        {setting.description}
                                    </p>
                                </div>
                                <div className="relative inline-block w-10 h-5">
                                    <input
                                        type="checkbox"
                                        id={`notification-${setting.id}`}
                                        className="opacity-0 w-0 h-0"
                                        checked={setting.isEnabled}
                                        onChange={() => handleNotificationToggle(setting.id)} />
                                    <span
                                        className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-glass-blue rounded-full before:absolute before:content-[''] before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all checked:before:translate-x-5"></span>
                                </div>
                            </div>
                        </div>)}
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-rice-paper rounded-lg border border-silk-gray">
                            <h3
                                className="text-sm font-medium mb-3"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>通知方式
                                                </h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <input type="checkbox" id="email-notification" className="mr-2" defaultChecked />
                                    <label
                                        htmlFor="email-notification"
                                        className="text-sm"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>电子邮件
                                                            </label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="push-notification" className="mr-2" defaultChecked />
                                    <label
                                        htmlFor="push-notification"
                                        className="text-sm"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>站内推送
                                                            </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-rice-paper rounded-lg border border-silk-gray">
                            <h3
                                className="text-sm font-medium mb-3"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>免打扰时间
                                                </h3>
                            <select
                                className="w-full px-3 py-2 bg-white border border-silk-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-glass-blue/30"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>
                                <option value="off">不开启免打扰</option>
                                <option value="22-07">22:00 - 07:00</option>
                                <option value="23-08">23:00 - 08:00</option>
                                <option value="custom">自定义</option>
                            </select>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}