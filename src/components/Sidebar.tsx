import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";

interface SidebarProps {
    isOpen: boolean;
}

export function Sidebar(
    {
        isOpen
    }: SidebarProps
) {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, userRole } = authContext;

    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        "community": false,
        "creation": false
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

  // 根据用户角色获取导航项
  const getNavigationItems = () => {
    const baseItems = [{
      id: "home",
      icon: "fa-home",
      label: "首页",
      path: "/"
    }, {
      id: "bookshelf",
      icon: "fa-book",
      label: "我的书架",
      path: "/bookshelf"
    }, {
      id: "live",
      icon: "fa-video",
      label: "直播中心",
      path: "/live"
    }, {
      id: "community",
      icon: "fa-users",
      label: "社区",
      path: "/community",
      isExpandable: true
    }, {
      id: "profile",
      icon: "fa-user",
      label: "个人中心",
      path: "/profile"
    }];

    // 创作者额外显示创作中心
    if (authContext.userRole === 'creator') {
      return [...baseItems.slice(0, 4), {
        id: "creator",
        icon: "fa-pen-fancy",
        label: "创作中心",
        path: "/creator"
      }, ...baseItems.slice(4)];
    }

    return baseItems;
  };

    const communitySubItems = [{
        id: "circle-reasoning",
        label: "推理小说圈",
        path: "/community/reasoning"
    }, {
        id: "circle-poetry",
        label: "诗歌精读圈",
        path: "/community/poetry"
    }, {
        id: "circle-social",
        label: "社科讨论圈",
        path: "/community/social"
    }];

    const creationSubItems = [{
    id: "community-reasoning",
    label: "推理小说圈",
    path: "/community/reasoning"
}, {
    id: "community-poetry",
    label: "诗歌精读圈",
    path: "/community/poetry"
}, {
    id: "community-social",
    label: "社科讨论圈",
    path: "/community/social"
}];

    return (
        <aside
            className={`fixed top-0 left-0 h-full z-30 bg-white border-r border-silk-gray transition-all duration-300 ${isOpen ? "w-64" : "w-16"} flex flex-col`}>
            {}
            <div
                className="flex items-center justify-center p-4 border-b border-silk-gray ink-splash">
                <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br from-[#3A7DA8] to-[#2A6C90] flex items-center justify-center ${!isOpen ? "mx-auto" : ""}`}>
                    <span
                        className="text-white font-bold text-xl"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>墨</span>
                </div>
                {isOpen && <span
                    className="ml-3 font-semibold text-xl text-glass-blue relative"
                    style={{
                        fontFamily: "\"Noto Serif SC\", serif"
                    }}>墨刻
                                                                        <div
                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-glass-blue to-transparent"></div>
                </span>}
            </div>
            <nav
                className="flex-1 overflow-y-auto p-4"
                style={{
                    borderRadius: "64px",
                    backgroundImage: "url(https://space-static.coze.site/coze_space/7574875098542162219/upload/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20251121035345_1033x2063.jpg?sign=1766260582-8a2bcca651-0-e9e8c9c071940744cb5b161cf485df46e62e1b817e5f17e23819652e76c76762)",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 50%",
                    backgroundColor: "#FDE68A"
                }}>
                <ul className="space-y-1">
                    {getNavigationItems().map(item => (
                      <li
                        key={item.id}
                        style={{
                          backgroundColor: "#FFFFFF"
                        }}>
                        {item.isExpandable ? <div>
                            <button
                                onClick={() => toggleSection(item.id)}
                                className="w-full flex items-center p-3 rounded-lg text-left transition-colors hover:bg-silk-gray group">
                                <i
                                    className={`fas ${item.icon} w-6 text-center ${expandedSections[item.id] ? "text-glass-blue" : ""}`}></i>
                                {isOpen && <span
                                    className={`ml-3 ${expandedSections[item.id] ? "text-glass-blue font-medium" : ""}`}
                                    style={{
                                        fontFamily: "\"Noto Serif SC\", serif"
                                    }}>{item.label}</span>}
                                {isOpen && <i
                                    className={`fas fa-chevron-down ml-auto transition-transform ${expandedSections[item.id] ? "transform rotate-180" : ""}`}></i>}
                            </button>
                            {expandedSections[item.id] && isOpen && <ul className="pl-9 mt-1 space-y-1">
                                {(item.id === "community" ? communitySubItems : creationSubItems).map(subItem => <li key={subItem.id}>
                                    <NavLink
                                        to={subItem.path}
                                        className={(
                                            {
                                                isActive
                                            }
                                        ) => `block p-2 rounded-lg transition-colors ${isActive ? "bg-silk-gray text-glass-blue font-medium" : "hover:bg-silk-gray"}`}>
                                        {subItem.label}
                                    </NavLink>
                                </li>)}
                            </ul>}
                        </div> : <NavLink
                            to={item.path}
                            className={(
                                {
                                    isActive
                                }
                            ) => `flex items-center p-3 rounded-lg transition-colors ${isActive ? "bg-silk-gray text-glass-blue font-medium" : "hover:bg-silk-gray"}`}
                            style={{
                                backgroundColor: "#FFFFFF",
                                borderRadius: "32px"
                            }}>
                            <i className={`fas ${item.icon} w-6 text-center`}></i>
                            {isOpen && <span
                                className="ml-3"
                                style={{
                                    fontFamily: "\"Noto Serif SC\", serif"
                                }}>{item.label}</span>}
                        </NavLink>}
                    </li>
                  ))}
                </ul>
            </nav>
            {isOpen && <div className="p-4 border-t border-silk-gray">
                <div className="flex items-center">
                    {isAuthenticated ? <>
                        <div
                            className="w-10 h-10 rounded-full bg-inkstone-gray flex items-center justify-center text-white">
                            <i className="fas fa-user"></i>
                        </div>
                        <span className="ml-3 text-sm">用户名</span>
                    </> : <NavLink
                        to="/login"
                        className="text-glass-blue hover:underline text-sm"
                        style={{
                            fontFamily: "\"Noto Serif SC\", serif"
                        }}>登录 / 注册
                                                                                      </NavLink>}
                </div>
            </div>}
        </aside>
    );
}