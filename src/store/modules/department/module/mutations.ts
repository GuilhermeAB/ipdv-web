import type { MutationTree } from 'vuex';
import type { DepartmentStateType, DepartmentType } from './state';

const mutations: MutationTree<DepartmentStateType> = {
  setDepartmentList: function (state: DepartmentStateType, list: DepartmentType[] | undefined): void {
    state.list = list;
  }
};

export default mutations;
