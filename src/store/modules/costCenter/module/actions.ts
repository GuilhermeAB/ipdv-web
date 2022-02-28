import type { RootState } from '@/store';
import axios from 'axios';
import type { ActionContext, ActionTree } from 'vuex';
import type { CostCenterStateType, CostCenterType } from './state';

const actions: ActionTree<CostCenterStateType, RootState> = {
  getCostCenterList: async function ({commit}: ActionContext<CostCenterStateType, RootState>) {
    const { data } = await axios({
      url: '/cost-center',
      method: 'GET',
      withCredentials: true,
    });

    commit('setCostCenterList', data.list);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getById: async function ({commit}: ActionContext<CostCenterStateType, RootState>, payload: { id: string, }): Promise<CostCenterType | undefined> {
    const { data } = await axios({
      url: `/cost-center/${payload.id}`,
      method: 'GET',
      withCredentials: true,
    });

    return data.item as CostCenterType | undefined;
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
      url: `/cost-center/${payload.id}`,
      method: 'PATCH',
      withCredentials: true,
      data: {
        description: payload.description
      }
    });

    await dispatch('getCostCenterList');
  },
  deleteCostCenter: async function ({dispatch}: ActionContext<CostCenterStateType, RootState>, payload: { id: string, }): Promise<void> {
    await axios({
      url: `/cost-center/${payload.id}`,
      method: 'DELETE',
      withCredentials: true,
    });

    await dispatch('getCostCenterList');
  },
  deleteDepartment: async function ({dispatch}: ActionContext<CostCenterStateType, RootState>, payload: { id: string, departmentId: string, }): Promise<void> {
    await axios({
      url: `/cost-center/${payload.id}/${payload.departmentId}`,
      method: 'DELETE',
      withCredentials: true,
    });

    await dispatch('getCostCenterList');
  },
  addDepartment: async function ({dispatch}: ActionContext<CostCenterStateType, RootState>, payload: { id: string, departmentId: string, }): Promise<void> {
    await axios({
      url: `/cost-center/${payload.id}`,
      method: 'POST',
      withCredentials: true,
      data: {
        departmentId: payload.departmentId,
      }
    });

    await dispatch('getCostCenterList');
  }
};

export default actions;
