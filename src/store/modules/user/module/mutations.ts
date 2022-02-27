import type { MutationTree } from 'vuex';
import type { UserStateType, UserType } from './state';

const mutations: MutationTree<UserStateType> = {
  setUserList: function (state: UserStateType, list: UserType[] | undefined): void {
    state.list = list;
  }
};

export default mutations;
