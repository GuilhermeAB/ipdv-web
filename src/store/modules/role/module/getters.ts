import type { RootState } from '@/store';
import type { GetterTree } from 'vuex';
import type { RoleStateType } from './state';

const getters: GetterTree<RoleStateType, RootState> = {
  getList: (state: Readonly<RoleStateType>) => state.list
};

export default getters;
