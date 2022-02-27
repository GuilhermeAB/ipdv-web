/* eslint-disable */
import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import store from '@/store';
import { showError, showWarning, showSuccess } from '../notification';

const FORBIDDEN = 403;

const {
  VUE_APP_REQUEST_BASE_URL
} = process.env;

axios.defaults.baseURL = VUE_APP_REQUEST_BASE_URL as string;
axios.defaults.responseType = 'json';

function handleRequestResponseMessages (messages: Record<string, any>): void {
  if (messages.errors) {
    messages.errors.forEach((m: Record<string, any>) => {
      showError({ message: m.code });
    });
  }
  if (messages.warnings) {
    messages.warnings.forEach((m: Record<string, any>) => {
      showWarning({ message: m.code });
    });
  }
  if (messages.information) {
    showSuccess({ message: messages.information.code });
  }
  if (messages.error) {
    showError({ message: messages.error.code });
  }
}

axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.data?.messages) {
    handleRequestResponseMessages(response.data.messages);
  }

  return response;
}, (error: AxiosError) => {
  if (error.response?.data?.messages) {
    handleRequestResponseMessages(error.response.data.messages);
  }

  if (error.request.status === FORBIDDEN) {
    store.dispatch('auth/handlerAuthentication', { value: false });
  }

  throw new Error(error.message);
});
