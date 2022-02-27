/* eslint-disable camelcase, @typescript-eslint/naming-convention */
export interface UserType {
  id: string,
  name: string,
  role_id: string,
  created_at: Date,
  updated_at: Date,
}

export interface UserStateType {
  list: UserType[] | undefined,
}

const state = (): UserStateType => ({
  list: undefined
});

export default state;
