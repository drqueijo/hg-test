import { env } from "@/env";

const { NEXT_PUBLIC_LOCAL_STORAGE_PREFIX } = env;

const setValue = (key: string, value: string) => {
  localStorage.setItem(`${NEXT_PUBLIC_LOCAL_STORAGE_PREFIX}${key}`, value);
};

const getValue = (key: string) => {
  return localStorage.getItem(`${NEXT_PUBLIC_LOCAL_STORAGE_PREFIX}${key}`);
};

const removeValue = (key: string) => {
  localStorage.removeItem(`${NEXT_PUBLIC_LOCAL_STORAGE_PREFIX}${key}`);
};

export { setValue, getValue, removeValue };
