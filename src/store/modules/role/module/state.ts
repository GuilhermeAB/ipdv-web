/* eslint-disable camelcase, @typescript-eslint/naming-convention */
export interface RoleType {
  id: string,
  description: string,
  created_at: Date,
  updated_at: Date,
}

export interface RoleStateType {
  list: RoleType[] | undefined,
}

const state = (): RoleStateType => ({
  list: undefined
});

export default state;
