import { User, UserWithNoPassword } from './DBtypes';
export type Credentials = Pick<User, 'username' | 'password'>;

export type AuthContextType = {
  // xac dinh nhung gia tri context ma minh muon xai chung cho nhung components
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
};
