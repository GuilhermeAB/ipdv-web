import type { RootState } from '@/store';
import axios from 'axios';
import type { ActionContext, ActionTree } from 'vuex';
import type { RoleStateType } from './state';

const actions: ActionTree<RoleStateType, RootState> = {
  getRoleList: async function ({commit}: ActionContext<RoleStateType, RootState>): Promise<void> {
    const { data } = await axios({
      url: '/role',
      method: 'GET',
      withCredentials: true,
    });

    commit('setRoleList', data.list);
  },
  addRole: async function ({dispatch}: ActionContext<RoleStateType, RootState>, payload: { description: string, }): Promise<void> {
    await axios({
      url: '/role',
      method: 'POST',
      withCredentials: true,
      data: {
        description: payload.description
      }
    });

    await dispatch('getRoleList');
  }
};

export default actions;
