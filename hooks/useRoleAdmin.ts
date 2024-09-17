import { useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';

export const useRoleAdmin = () => {
  const { user } = useSelector((appState: RootState) => appState.auth);
  return user?.roleId === 1;
};
