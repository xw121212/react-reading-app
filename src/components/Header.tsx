import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface HeaderProps {
    onThemeToggle: () => void;
    currentTheme: "light" | "dark";
    onSidebarToggle: () => void;
    userRole: 'reader' | 'creator' | null;
    toggleRole: () => void;
}

export function Header(
    {
        onThemeToggle,
        currentTheme,
        onSidebarToggle,
        userRole,
        toggleRole
    }: HeaderProps
) {
    const {
        isAuthenticated,
        logout
    } = useContext(AuthContext);

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (searchQuery.trim()) {
            toast(`搜索: ${searchQuery}`);
        }
    };

    return (
        <header
            className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-silk-gray z-20 px-4 flex items-center justify-between">
            <div className="flex items-center">
                <button
                    onClick={onSidebarToggle}
                    className="mr-4 p-2 rounded-full hover:bg-silk-gray transition-colors">
                    <i className="fas fa-bars text-ink"></i>
                </button>
                <form
                    onSubmit={handleSearch}
                    className="relative w-64">
                    <input
                        type="text"
                        placeholder="搜索书籍、作者、话题..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-silk-gray text-sm focus:outline-none focus:ring-2 focus:ring-glass-blue/30" />
                    <i
                        className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-inkstone-gray"></i>
                </form>
            </div>
            <div className="flex items-center space-x-4">
                {/* 角色切换按钮 - 仅在登录后显示 */}
                {isAuthenticated && userRole && (
                    <button
                        onClick={toggleRole}
                        className="px-3 py-1 bg-silk-gray/50 text-sm rounded-full hover:bg-silk-gray transition-colors flex items-center"
                        title="切换身份"
                    >
                        <i className={`fas ${userRole === 'reader' ? 'fa-book-open' : 'fa-pen-fancy'} mr-1 text-sm`}></i>
                        <span>{userRole === 'reader' ? '读者' : '创作者'}</span>
                    </button>
                )}
                
                <button
                    onClick={onThemeToggle}
                    className="p-2 rounded-full hover:bg-silk-gray transition-colors">
                    <i
                        className={`fas ${currentTheme === "light" ? "fa-moon" : "fa-sun"} text-ink`}></i>
                </button>
                <button
                    className="p-2 rounded-full hover:bg-silk-gray transition-colors relative">
                    <i className="fas fa-bell text-ink"></i>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-crabapple-red rounded-full"></span>
                </button>
                {isAuthenticated ? <div className="relative group">
                    <button
                        className="w-10 h-10 rounded-full bg-inkstone-gray flex items-center justify-center text-white overflow-hidden">
                        <img
                            src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20Avatar%20Portrait%20Silhouette&sign=45fd7dc39ab1727c4dd3e674074b5674"
                            alt="User Avatar"
                            className="w-full h-full object-cover" />
                    </button>
                    <div
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-silk-gray opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="p-4 border-b border-silk-gray">
                            <p className="font-medium">用户名</p>
                            <p className="text-sm text-inkstone-gray">{userRole === 'reader' ? '读者' : userRole === 'creator' ? '创作者' : '普通用户'}</p>
                        </div>
                        <nav className="py-2">
                            <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-silk-gray">个人中心</Link>
                            <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-silk-gray">设置</Link>
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-silk-gray text-crabapple-red">退出登录</button>
                        </nav>
                    </div>
                </div> : <Link
                    to="/login"
                    className="px-4 py-2 rounded-full bg-glass-blue text-white hover:bg-opacity-90 transition-colors text-sm font-medium">登录
                                                                       </Link>}
            </div>
        </header>
    );
}