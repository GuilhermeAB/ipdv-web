/* eslint-disable */
import Toastr from 'toastr';

const toastrOptions: typeof Toastr.options = {
  closeButton: true,
  newestOnTop: true,
  progressBar: true,
  positionClass: 'toast-bottom-left',
  preventDuplicates: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onclick: (): void => {},
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

Toastr.options = toastrOptions;

interface MessageOptions {
  title?: string,
  message: string,
  overrideOptions?: typeof Toastr.options,
}

export const showInfo = (message: Readonly<MessageOptions>): any => Toastr.info(message.message, message.title, message.overrideOptions);

export const showWarning = (message: Readonly<MessageOptions>): any => Toastr.warning(message.message, message.title, message.overrideOptions);

export const showSuccess = (message: Readonly<MessageOptions>): any => Toastr.success(message.message, message.title, message.overrideOptions);

export const showError = (message: Readonly<MessageOptions>): any => Toastr.error(message.message, message.title, message.overrideOptions);

export const remove = (toast?: any): void => {
  if (toast) {
    Toastr.remove(toast);
  } else {
    Toastr.remove();
  }
};

export const clear = (toast?: any, clearOptions?: { force: boolean, }): void => {
  Toastr.clear(toast, clearOptions);
};
