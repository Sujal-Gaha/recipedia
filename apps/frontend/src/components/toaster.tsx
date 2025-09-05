import { toast, ExternalToast } from 'sonner';

const toastData: ExternalToast = {
  position: 'top-right',
  dismissible: true,
  duration: 3000,
  closeButton: true,
  richColors: true,
};

export const toastSuccess = (message: string) => {
  toast.success(message, toastData);
};

export const toastError = (message: string) => {
  toast.error(message, toastData);
};

export const toastInfo = (message: string) => {
  toast.info(message, toastData);
};
