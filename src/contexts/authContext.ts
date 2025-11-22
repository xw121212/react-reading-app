import { createContext, useContext } from "react";

export type UserRole = 'reader' | 'creator' | null;

export interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  setIsAuthenticated: (value: boolean) => void;
  setUserRole: (role: UserRole) => void;
  logout: () => void;
  toggleRole: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  setIsAuthenticated: (value: boolean) => {},
  setUserRole: (role: UserRole) => {},
  logout: () => {},
  toggleRole: () => {},
});

// 自定义Hook，方便组件使用认证上下文
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};