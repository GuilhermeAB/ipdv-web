import type { RootState } from '@/store';
import axios from 'axios';
import type { ActionContext, ActionTree } from 'vuex';
import type { DepartmentStateType, DepartmentType } from './state';

const actions: ActionTree<DepartmentStateType, RootState> = {
  getDepartmentList: async function ({commit}: ActionContext<DepartmentStateType, RootState>): Promise<void> {
    const { data } = await axios({
      url: '/department',
      method: 'GET',
      withCredentials: true,
    });

    commit('setDepartmentList', data.list);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getById: async function ({commit}: ActionContext<DepartmentStateType, RootState>, payload: { id: string, }): Promise<DepartmentType | undefined> {
    const { data } = await axios({
      url: '/department',
      method: 'GET',
      withCredentials: true,
      params: {
        id: payload.id,
      }
    });

    return data.item as DepartmentType | undefined;
  },
  addDepartment: async function ({dispatch}: ActionContext<DepartmentStateType, RootState>, payload: { description: string, }): Promise<void> {
    await axios({
      url: '/department',
      method: 'POST',
      withCredentials: true,
      data: {
        description: payload.description
      }
    });

    await dispatch('getDepartmentList');
  },
  updateDepartment: async function ({dispatch}: ActionContext<DepartmentStateType, RootState>, payload: { id: string, description: string, }): Promise<void> {
    await axios({
      url: '/department',
      method: 'PATCH',
      withCredentials: true,
      params: {
        id: payload.id
      },
      data: {
        description: payload.description
      }
    });

    await dispatch('getDepartmentList');
  },
  deleteDepartment: async function ({dispatch}: ActionContext<DepartmentStateType, RootState>, payload: { id: string, }): Promise<void> {
    await axios({
      url: '/department',
      method: 'DELETE',
      withCredentials: true,
      params: {
        id: payload.id,
      }
    });

    await dispatch('getDepartmentList');
  },
  deleteUser: async function ({dispatch}: ActionContext<DepartmentStateType, RootState>, payload: { id: string, userId: string, }): Promise<void> {
    await axios({
      url: '/department',
      method: 'DELETE',
      withCredentials: true,
      params: {
        id: payload.id,
        userId: payload.userId,
      }
    });

    await dispatch('getDepartmentList');
  },
  addUser: async function ({dispatch}: ActionContext<DepartmentStateType, RootState>, payload: { id: string, userId: string, }): Promise<void> {
    await axios({
      url: '/department',
      method: 'POST',
      withCredentials: true,
      params: {
        id: payload.id,
      },
      data: {
        userId: payload.userId,
      }
    });

    await dispatch('getDepartmentList');
  }
};

export default actions;
