import { AuthContextType } from '@/@type/context/auth-context';
import React from 'react';
const AuthContext = React.createContext<AuthContextType | string>(
  `useAuth should be used inside AuthProvider`,
);
interface Props {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [loading] = React.useState(false);

  const value: AuthContextType = {
    loading,
  };

  return <AuthContext.Provider {...{ value, children }} />;
};
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (typeof context === `string`) {
    throw new Error(context);
  }
  return context;
};
