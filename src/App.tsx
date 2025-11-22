import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import ReadPage from "@/pages/ReadPage";
import CommunityPage from "@/pages/CommunityPage";
import CirclePage from "@/pages/CirclePage";
import BookshelfPage from "@/pages/BookshelfPage";
import ProfilePage from "@/pages/ProfilePage";
import LiveCenterPage from "@/pages/LiveCenterPage";
import LiveDetailPage from "@/pages/LiveDetailPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import RoleSelectionPage from "@/pages/RoleSelectionPage";
import CreatorDashboard from "@/pages/CreatorDashboard";
import CreatorProfilePage from "@/pages/CreatorProfilePage";
import LiveCreationPage from "@/pages/LiveCreationPage";
import RealTimeCommunityPage from "@/pages/RealTimeCommunityPage";
import { useState, useEffect, useContext } from "react";
import { AuthContext, UserRole } from '@/contexts/authContext';
import { Empty } from '@/components/Empty';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true';
  });
  
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return savedRole as UserRole || null;
  });

  // 保存身份验证状态到本地存储
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    }
  }, [isAuthenticated, userRole]);

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  // 切换用户角色
  const toggleRole = () => {
    if (userRole === 'reader') {
      setUserRole('creator');
    } else if (userRole === 'creator') {
      setUserRole('reader');
    }
  };

  // 受保护的路由组件
  const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return element;
  };

  // 需要角色选择的路由组件
  const RoleRequiredRoute = ({ element }: { element: React.ReactNode }) => {
    if (!userRole) {
      return <Navigate to="/role-selection" replace />;
    }
    return element;
  };

  // 动态个人中心组件，根据用户角色显示不同内容
  function ProfileComponent() {
    const { userRole } = useContext(AuthContext);
    
    // 根据用户角色返回不同的个人中心组件
    if (userRole === 'creator') {
      return <CreatorProfilePage />;
    }
    return <ProfilePage />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, setIsAuthenticated, setUserRole, logout, toggleRole }}
    >
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/runtime/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/role-selection" element={isAuthenticated ? <RoleSelectionPage /> : <Navigate to="/login" replace />} />
        
        {/* 根路径根据登录状态和角色重定向 */}
        <Route 
          path="/" 
          element={
            !isAuthenticated 
              ? <Navigate to="/login" replace /> 
              : userRole 
                ? <Home /> 
                : <Navigate to="/role-selection" replace />
          } 
        />
        
         {/* 受保护的路由 - 读者端 */}
        <Route path="/bookshelf" element={<ProtectedRoute element={<RoleRequiredRoute element={<BookshelfPage />} />} />} />
        <Route path="/live" element={<ProtectedRoute element={<RoleRequiredRoute element={<LiveCenterPage />} />} />} />
        <Route path="/live/:id" element={<ProtectedRoute element={<RoleRequiredRoute element={<LiveDetailPage />} />} />} />
        <Route path="/community" element={<ProtectedRoute element={<RoleRequiredRoute element={<CommunityPage />} />} />} />
        <Route path="/community/:id" element={<ProtectedRoute element={<RoleRequiredRoute element={<CirclePage />} />} />} />
        <Route path="/community/reasoning" element={<ProtectedRoute element={<RoleRequiredRoute element={<CirclePage />} />} />} />
        <Route path="/community/poetry" element={<ProtectedRoute element={<RoleRequiredRoute element={<CirclePage />} />} />} />
        <Route path="/community/social" element={<ProtectedRoute element={<RoleRequiredRoute element={<CirclePage />} />} />} />
        <Route path="/read/:id" element={<ProtectedRoute element={<RoleRequiredRoute element={<ReadPage />} />} />} />
        
        {/* 创作者端路由 - 仅对创作者角色可见 */}
        <Route 
          path="/creator" 
          element={
            <ProtectedRoute 
              element={
                <RoleRequiredRoute 
                  element={
                    <div>
                      {userRole === 'creator' ? <CreatorDashboard /> : <Navigate to="/" replace />}
                    </div>
                  } 
                />
              } 
            />
          } 
        />
        <Route 
          path="/creator/live/create" 
          element={
            <ProtectedRoute 
              element={
                <RoleRequiredRoute 
                  element={
                    <div>
                      {userRole === 'creator' ? <LiveCreationPage /> : <Navigate to="/" replace />}
                    </div>
                  } 
                />
              } 
            />
          } 
        />
        <Route 
          path="/creator/profile" 
          element={
            <ProtectedRoute 
              element={
                <RoleRequiredRoute 
                  element={
                    <div>
                      {userRole === 'creator' ? <CreatorProfilePage /> : <Navigate to="/" replace />}
                    </div>
                  } 
                />
              } 
            />
          } 
        />
        <Route 
          path="/creator/community" 
          element={
            <ProtectedRoute 
              element={
                <RoleRequiredRoute 
                  element={
                    <div>
                      {userRole === 'creator' ? <RealTimeCommunityPage /> : <Navigate to="/" replace />}
                    </div>
                  } 
                />
              } 
            />
          } 
        />
        
        {/* 个人中心路由根据角色重定向 */}
        <Route path="/profile" element={<ProtectedRoute element={<RoleRequiredRoute element={<ProfileComponent />} />} />} />
        
        {/* 其他路由 */}
        <Route path="/book/:id" element={<Empty />} />
        <Route path="/settings" element={<Empty />} />
        <Route path="/activities" element={<Empty />} />
        <Route path="/activity/:id" element={<Empty />} />
      </Routes>
    </AuthContext.Provider>
  );
}

