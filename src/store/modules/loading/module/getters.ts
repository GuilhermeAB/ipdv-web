import type { RootState } from '@/store';
import type {GetterTree} from 'vuex';
import type {LoadingStateType} from './state';

const getters: GetterTree<LoadingStateType, RootState> = {
  isLoading: (state: Readonly<LoadingStateType>) => state.isLoading
};

export default getters;
