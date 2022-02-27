import type { MutationTree } from 'vuex';
import type { CostCenterStateType, CostCenterType } from './state';

const mutations: MutationTree<CostCenterStateType> = {
  setCostCenterList: function (state: CostCenterStateType, list: CostCenterType[] | undefined): void {
    state.list = list;
  }
};

export default mutations;
