import type { RootState } from '@/store';
import axios from 'axios';
import type { ActionContext, ActionTree } from 'vuex';
import type { CostCenterStateType } from './state';

const actions: ActionTree<CostCenterStateType, RootState> = {
  getCostCenterList: async function ({commit}: ActionContext<CostCenterStateType, RootState>) {
    const { data } = await axios({
      url: '/cost-center',
      method: 'GET',
      withCredentials: true,
    });

    commit('setCostCenterList', data.list);
  },
  addCostCenter: async function ({dispatch}: ActionContext<CostCenterStateType, RootState>, payload: { description: string, }): Promise<void> {
    await axios({
      url: '/cost-center',
      method: 'POST',
      withCredentials: true,
      data: {
        description: payload.description
      }
    });

    await dispatch('getCostCenterList');
  },
  updateCostCenter: async function ({dispatch}: ActionContext<CostCenterStateType, RootState>, payload: { id: string, description: string, }): Promise<void> {
    await axios({
      url: '/cost-center',
      method: 'PATCH',
      withCredentials: true,
      params: {
        id: payload.id,
      },
      data: {
        description: payload.description
      }
    });

    await dispatch('getCostCenterList');
  },
  deleteCostCenter: async function ({dispatch}: ActionContext<CostCenterStateType, RootState>, payload: { id: string, }): Promise<void> {
    await axios({
      url: '/cost-center',
      method: 'DELETE',
      withCredentials: true,
      params: {
        id: payload.id,
      },
    });

    await dispatch('getCostCenterList');
  },
  deleteDepartment: async function ({dispatch}: ActionContext<CostCenterStateType, RootState>, payload: { id: string, departmentId: string, }): Promise<void> {
    await axios({
      url: '/cost-center',
      method: 'DELETE',
      withCredentials: true,
      params: {
        id: payload.id,
        departmentId: payload.departmentId,
      },
    });

    await dispatch('getCostCenterList');
  },
  addDepartment: async function ({dispatch}: ActionContext<CostCenterStateType, RootState>, payload: { id: string, departmentId: string, }): Promise<void> {
    await axios({
      url: '/cost-center',
      method: 'POST',
      withCredentials: true,
      params: {
        id: payload.id,
      },
      data: {
        departmentId: payload.departmentId,
      }
    });

    await dispatch('getCostCenterList');
  }
};

export default actions;
