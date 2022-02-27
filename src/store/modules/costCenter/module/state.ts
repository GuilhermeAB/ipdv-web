/* eslint-disable camelcase, @typescript-eslint/naming-convention */
import type { DepartmentType } from '../../department/module/state';

export interface CostCenterType {
  id: string,
  description: string,
  departmentList?: DepartmentType[],
  created_at: Date,
  updated_at: Date,
}

export interface CostCenterStateType {
  list: CostCenterType[] | undefined,
}

const state = (): CostCenterStateType => ({
  list: undefined
});

export default state;
