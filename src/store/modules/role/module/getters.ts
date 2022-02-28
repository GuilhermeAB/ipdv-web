import type { RootState } from '@/store';
import type { GetterTree } from 'vuex';
import type { RoleStateType } from './state';

const getters: GetterTree<RoleStateType, RootState> = {
  roleList: (state: Readonly<RoleStateType>) => state.list
};

export default getters;
