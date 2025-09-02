import { toast, ExternalToast } from 'sonner';

const toastData: ExternalToast = {
  position: 'top-right',
  dismissible: true,
  duration: 5000,
};

export const toastSuccess = (message: string) => {
  toast.success(message, toastData);
};

export const toastError = (message: string) => {
  toast.error(message, toastData);
};

export const toastInfo = (message: string) => {
  toast(message, toastData);
};
