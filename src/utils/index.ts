export { default as ToastControl } from './ToastControl';

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const millisToMinutes = (millis: number) => {
  const minutes = Math.floor(millis / 60000);

  return `${minutes}`;
};
