import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import type { AuthStateType } from './modules/auth/module/state';
import costCenter from './modules/costCenter';
import type { CostCenterStateType } from './modules/costCenter/module/state';
import department from './modules/department';
import type { DepartmentStateType } from './modules/department/module/state';
import Loading from './modules/loading';
import type {LoadingStateType} from './modules/Loading/module/state';
import role from './modules/role';
import type { RoleStateType } from './modules/role/module/state';
import user from './modules/user';
import type { UserStateType } from './modules/user/module/state';

Vue.use(Vuex);

export interface RootState {
  loading: LoadingStateType,
  auth: AuthStateType,
  role: RoleStateType,
  user: UserStateType,
  department: DepartmentStateType,
  costCenter: CostCenterStateType,
}

const store = new Vuex.Store<RootState>({
  modules: {
    loading: Loading,
    auth: auth,
    role: role,
    user: user,
    department: department,
    costCenter: costCenter,
  }
});

export default store;
