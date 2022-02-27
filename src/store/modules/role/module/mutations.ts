import type { MutationTree } from 'vuex';
import type { RoleStateType, RoleType } from './state';

const mutations: MutationTree<RoleStateType> = {
  setRoleList: function (state: RoleStateType, list: RoleType[] | undefined): void {
    state.list = list;
  }
};

export default mutations;
