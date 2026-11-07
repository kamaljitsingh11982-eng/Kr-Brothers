const runtimeEnv = import.meta.env ?? {}

export const SITE_ORIGIN = (
  runtimeEnv.VITE_SITE_ORIGIN || 'https://www.krbrothers.in'
).replace(/\/+$/, '')

export default SITE_ORIGIN
