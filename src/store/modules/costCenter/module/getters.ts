import type { RootState } from '@/store';
import type { GetterTree } from 'vuex';
import type { CostCenterStateType } from './state';

const getters: GetterTree<CostCenterStateType, RootState> = {
  costCenterList: (state: Readonly<CostCenterStateType>) => state.list
};

export default getters;
