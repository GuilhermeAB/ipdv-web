export interface LoadingStateType {
  isLoading: boolean,
}

const state = (): LoadingStateType => ({
  isLoading: false
});

export default state;
