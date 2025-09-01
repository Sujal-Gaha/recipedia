import { toast, ExternalToast } from 'sonner';

const toastData: ExternalToast = {
  position: 'bottom-center',
  dismissible: true,
  duration: 3000,
  className: 'bg-green-500 text-white',
};

export function toastSuccess(message: string) {
  toast.success(message, toastData);
}

export function toastError(message: string) {
  toast.error(message, toastData);
}

export function toastInfo(message: string) {
  toast(message, toastData);
}
