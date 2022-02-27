export interface AuthStateType {
  isAuthenticated: boolean,
}

const state = (): AuthStateType => ({
  isAuthenticated: true
});

export default state;
