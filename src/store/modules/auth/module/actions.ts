/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { RootState } from '@/store';
import type { ActionContext, ActionTree } from 'vuex';
import type { AuthStateType } from './state';

const actions: ActionTree<AuthStateType, RootState> = {
  handlerAuthentication: function ({commit}: ActionContext<AuthStateType, RootState>, payload: Readonly<{ value: boolean, }>): void {
    commit('setAuthentication', payload.value);
  }
};

export default actions;
