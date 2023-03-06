export const isServiceWorkerOnline = () =>
  typeof window !== 'undefined' &&
  'sw' in window &&
  typeof window?.sw?.messageSW === 'function'
