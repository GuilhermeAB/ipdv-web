import type { RootState } from '@/store';
import type { GetterTree } from 'vuex';
import type { UserStateType } from './state';

const getters: GetterTree<UserStateType, RootState> = {
  userList: (state: Readonly<UserStateType>) => state.list
};

export default getters;
