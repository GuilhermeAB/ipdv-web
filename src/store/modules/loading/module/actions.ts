/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { RootState } from '@/store';
import type {ActionContext, ActionTree} from 'vuex';
import type {LoadingStateType} from './state';

const actions: ActionTree<LoadingStateType, RootState> = {
  toggleLoading: function ({commit, getters}: ActionContext<LoadingStateType, RootState>, payload?: Readonly<{value: boolean, }>): void {
    commit('setLoading', payload ? payload.value : !(getters.isLoading as boolean));
  }
};

export default actions;
