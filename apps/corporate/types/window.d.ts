declare global {
  interface Window {
    sw: Record<string, WorkboxEventTarget>
  }
}

window.sw = window.sw || {}
