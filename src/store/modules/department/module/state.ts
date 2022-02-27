/* eslint-disable camelcase, @typescript-eslint/naming-convention */
import type { UserType } from '../../user/module/state';

export interface DepartmentType {
  id: string,
  description: string,
  userList?: UserType[],
  created_at: Date,
  updated_at: Date,
}

export interface DepartmentStateType {
  list: DepartmentType[] | undefined,
}

const state = (): DepartmentStateType => ({
  list: undefined
});

export default state;
