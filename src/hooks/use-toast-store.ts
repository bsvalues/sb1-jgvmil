import { create } from 'zustand';
import { type ToastActionElement } from '@/components/ui/toast';

type ToasterToast = {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
  variant?: 'default' | 'destructive';
};

type ToastStore = {
  toasts: ToasterToast[];
  addToast: (toast: Omit<ToasterToast, 'id'>) => void;
  dismissToast: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: Math.random().toString() }],
    })),
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

export function toast(props: Omit<ToasterToast, 'id'>) {
  useToastStore.getState().addToast(props);
}

export function useToast() {
  const addToast = useToastStore((state) => state.addToast);
  const dismissToast = useToastStore((state) => state.dismissToast);

  return {
    toast: (props: Omit<ToasterToast, 'id'>) => addToast(props),
    dismiss: (id: string) => dismissToast(id),
  };
}