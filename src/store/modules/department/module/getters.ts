import type { RootState } from '@/store';
import type { GetterTree } from 'vuex';
import type { DepartmentStateType } from './state';

const getters: GetterTree<DepartmentStateType, RootState> = {
  departmentList: (state: Readonly<DepartmentStateType>) => state.list
};

export default getters;
