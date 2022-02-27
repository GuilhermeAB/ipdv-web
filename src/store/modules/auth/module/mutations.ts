import type { MutationTree } from 'vuex';
import type { AuthStateType } from './state';

const mutations: MutationTree<AuthStateType> = {
  setAuthentication: function (state: AuthStateType, value: boolean): void {
    state.isAuthenticated = value;
  }
};

export default mutations;
