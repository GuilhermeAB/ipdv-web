/* eslint-disable @typescript-eslint/naming-convention */
import type { RootState } from '@/store';
import axios from 'axios';
import type { ActionContext, ActionTree } from 'vuex';
import type { UserStateType, UserType } from './state';

const actions: ActionTree<UserStateType, RootState> = {
  getUserList: async function ({commit}: ActionContext<UserStateType, RootState>): Promise<void> {
    const { data } = await axios({
      url: '/user',
      method: 'GET',
      withCredentials: true,
    });

    commit('setUserList', data.list);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getById: async function ({commit}: ActionContext<UserStateType, RootState>, payload: { id: string, }): Promise<UserType | undefined> {
    const { data } = await axios({
      url: `/user/${payload.id}`,
      method: 'GET',
      withCredentials: true,
    });

    return data.item as UserType | undefined;
  },
  addUser: async function ({dispatch}: ActionContext<UserStateType, RootState>, payload: { name: string, roleId: string, }): Promise<void> {
    await axios({
      url: '/user',
      method: 'POST',
      withCredentials: true,
      data: {
        name: payload.name,
        role: payload.roleId
      }
    });

    await dispatch('getUserList');
  },
  updateUser: async function ({dispatch}: ActionContext<UserStateType, RootState>, payload: { id: string, name: string, roleId: string, }): Promise<UserType> {
    const { data } = await axios({
      url: `/user/${payload.id}`,
      method: 'PUT',
      withCredentials: true,
      data: {
        name: payload.name,
        role: payload.roleId
      }
    });

    await dispatch('getUserList');

    return {
      id: data.user.id,
      name: data.user.name,
      role_id: data.user.role_id,
      created_at: data.user.created_at,
      updated_at: data.user.updated_at
    };
  },
  deleteUser: async function ({dispatch}: ActionContext<UserStateType, RootState>, payload: { id: string, }): Promise<void> {
    await axios({
      url: `/user/${payload.id}`,
      method: 'DELETE',
      withCredentials: true,
    });

    await dispatch('getUserList');
  }
};

export default actions;
