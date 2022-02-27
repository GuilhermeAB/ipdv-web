import type { RootState } from '@/store';
import type { GetterTree } from 'vuex';
import type { AuthStateType } from './state';

const getters: GetterTree<AuthStateType, RootState> = {
  isAuthenticated: (state: Readonly<AuthStateType>) => state.isAuthenticated
};

export default getters;
