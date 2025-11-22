import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Device {
    id: string;
    name: string;
    type: "mobile" | "tablet" | "desktop";
    lastActive: string;
    isSynced: boolean;
    syncProgress?: number;
}

export function DeviceSync() {
    const [devices, setDevices] = useState<Device[]>([{
        id: "1",
        name: "我的手机",
        type: "mobile",
        lastActive: "5分钟前",
        isSynced: true
    }, {
        id: "2",
        name: "我的平板",
        type: "tablet",
        lastActive: "2小时前",
        isSynced: true
    }, {
        id: "3",
        name: "办公电脑",
        type: "desktop",
        lastActive: "昨天",
        isSynced: false,
        syncProgress: 0
    }]);

    const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
    const [lastSyncTime, setLastSyncTime] = useState("今天 14:30");

    const handleSync = (deviceId: string) => {
        setDevices(prevDevices => prevDevices.map(device => device.id === deviceId ? {
            ...device,
            isSynced: false,
            syncProgress: 0
        } : device));

        simulateSyncProgress(deviceId);
        toast.info("开始同步...");
    };

    const simulateSyncProgress = (deviceId: string) => {
        let progress = 0;

        const interval = setInterval(() => {
            progress += 10;

            setDevices(prevDevices => prevDevices.map(device => device.id === deviceId ? {
                ...device,
                syncProgress: progress
            } : device));

            if (progress >= 100) {
                clearInterval(interval);

                setDevices(prevDevices => prevDevices.map(device => device.id === deviceId ? {
                    ...device,
                    isSynced: true,
                    syncProgress: undefined
                } : device));

                setLastSyncTime("刚刚");
                toast.success("同步完成");
            }
        }, 500);
    };

    const getDeviceIcon = (type: string) => {
        switch (type) {
        case "mobile":
            return "fa-mobile-alt";
        case "tablet":
            return "fa-tablet-alt";
        case "desktop":
            return "fa-desktop";
        default:
            return "fa-mobile-alt";
        }
    };

    const toggleAutoSync = () => {
        setAutoSyncEnabled(!autoSyncEnabled);
        toast.info(autoSyncEnabled ? "已关闭自动同步" : "已开启自动同步");
    };

    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden p-6 ink-splash">
            <div className="flex justify-between items-center mb-6">
                <h2
                    className="text-xl font-bold text-glass-blue flex items-center"
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>
                    <i className="fas fa-sync-alt text-bamboo-green mr-2"></i>多设备同步
                            </h2>
                <button
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${autoSyncEnabled ? "bg-bamboo-green text-white" : "bg-silk-gray text-inkstone-gray"}`}
                    onClick={toggleAutoSync}>
                    {autoSyncEnabled ? "自动同步 已开启" : "自动同步 已关闭"}
                </button>
            </div>
            {}
            <div className="mb-6 p-4 bg-rice-paper rounded-lg border border-silk-gray">
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div
                            className="w-10 h-10 rounded-full bg-glass-blue/10 flex items-center justify-center flex-shrink-0 mr-3">
                            <i className="fas fa-cloud-upload-alt text-glass-blue"></i>
                        </div>
                        <div>
                            <h3
                                className="text-sm font-medium mb-1"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>云端备份状态</h3>
                            <p
                                className="text-xs text-inkstone-gray"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>上次同步时间：{lastSyncTime}
                            </p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{
                            scale: 1.05
                        }}
                        whileTap={{
                            scale: 0.95
                        }}
                        onClick={() => {
                            setLastSyncTime("同步中...");

                            setTimeout(() => {
                                setLastSyncTime("刚刚");
                                toast.success("全部设备同步完成");
                            }, 2000);
                        }}
                        className="px-4 py-2 bg-glass-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors btn-chinese"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>立即同步全部
                                  </motion.button>
                </div>
            </div>
            {}
            <h3
                className="text-lg font-medium mb-4 flex items-center"
                style={{
                    fontFamily: "\"Noto Serif SC\", serif"
                }}>
                <span className="w-2 h-6 bg-glass-blue inline-block mr-2"></span>已连接设备
                      </h3>
            <div className="space-y-4">
                {devices.map(device => <div
                    key={device.id}
                    className="bg-rice-paper rounded-lg p-4 border border-silk-gray">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 
                  ${device.isSynced ? "bg-bamboo-green/10 text-bamboo-green" : "bg-silk-gray text-inkstone-gray"}`}>
                                <i className={`fas ${getDeviceIcon(device.type)}`}></i>
                            </div>
                            <div>
                                <h4
                                    className="font-medium"
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>{device.name}</h4>
                                <div className="flex items-center mt-1">
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full mr-2 
                      ${device.isSynced ? "bg-bamboo-green/10 text-bamboo-green" : "bg-crabapple-red/10 text-crabapple-red"}`}
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>
                                        {device.isSynced ? "已同步" : "未同步"}
                                    </span>
                                    <span
                                        className="text-xs text-inkstone-gray"
                                        style={{
                                            fontFamily: "\"Noto Serif SC\", serif"
                                        }}>上次活跃：{device.lastActive}</span>
                                </div>
                            </div>
                        </div>
                        {device.isSynced ? <button
                            onClick={() => handleSync(device.id)}
                            className="px-3 py-1.5 border border-glass-blue text-glass-blue rounded-lg text-sm hover:bg-glass-blue/5 transition-colors"
                            style={{
                                fontFamily: "\"Noto Serif SC\", serif"
                            }}>重新同步
                                            </button> : <button
                            disabled
                            className="px-3 py-1.5 border border-silk-gray text-inkstone-gray rounded-lg text-sm cursor-not-allowed">同步中...
                                            </button>}
                    </div>
                    {}
                    {!device.isSynced && device.syncProgress !== undefined && <div className="mt-3">
                        <div className="flex justify-between text-xs text-inkstone-gray mb-1">
                            <span>同步中</span>
                            <span>{device.syncProgress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-silk-gray rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-glass-blue rounded-full"
                                initial={{
                                    width: "0%"
                                }}
                                animate={{
                                    width: `${device.syncProgress}%`
                                }}
                                transition={{
                                    duration: 0.5
                                }}></motion.div>
                        </div>
                    </div>}
                </div>)}
                {}
                <motion.button
                    whileHover={{
                        y: -2
                    }}
                    className="w-full p-4 border-2 border-dashed border-inkstone-gray/30 rounded-lg flex items-center justify-center hover:border-glass-blue hover:bg-glass-blue/5 transition-colors">
                    <i className="fas fa-plus text-inkstone-gray mr-2"></i>
                    <span
                        className="text-sm text-inkstone-gray"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>添加新设备</span>
                </motion.button>
            </div>
            {}
            <div className="mt-8 pt-4 border-t border-silk-gray">
                <h3
                    className="text-sm font-medium mb-3"
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>同步设置</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm">阅读进度</span>
                            <p
                                className="text-xs text-inkstone-gray mt-0.5"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>自动同步您在各设备上的阅读进度</p>
                        </div>
                        <div className="relative inline-block w-10 h-5">
                            <input
                                type="checkbox"
                                id="syncProgress"
                                className="opacity-0 w-0 h-0"
                                defaultChecked />
                            <span
                                className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-glass-blue rounded-full before:absolute before:content-[''] before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all checked:before:translate-x-5 checked:bg-glass-blue"></span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm">笔记和批注</span>
                            <p
                                className="text-xs text-inkstone-gray mt-0.5"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>自动同步您的阅读笔记和批注</p>
                        </div>
                        <div className="relative inline-block w-10 h-5">
                            <input
                                type="checkbox"
                                id="syncNotes"
                                className="opacity-0 w-0 h-0"
                                defaultChecked />
                            <span
                                className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-glass-blue rounded-full before:absolute before:content-[''] before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all checked:before:translate-x-5 checked:bg-glass-blue"></span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm">书签</span>
                            <p className="text-xs text-inkstone-gray mt-0.5">自动同步您添加的书签</p>
                        </div>
                        <div className="relative inline-block w-10 h-5">
                            <input
                                type="checkbox"
                                id="syncBookmarks"
                                className="opacity-0 w-0 h-0"
                                defaultChecked />
                            <span
                                className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-glass-blue rounded-full before:absolute before:content-[''] before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all checked:before:translate-x-5 checked:bg-glass-blue"></span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm">离线缓存</span>
                            <p
                                className="text-xs text-inkstone-gray mt-0.5"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>自动缓存您正在阅读的书籍</p>
                        </div>
                        <div className="relative inline-block w-10 h-5">
                            <input type="checkbox" id="offlineCache" className="opacity-0 w-0 h-0" />
                            <span
                                className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-inkstone-gray rounded-full before:absolute before:content-[''] before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all checked:before:translate-x-5 checked:bg-glass-blue"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}