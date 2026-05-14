/** SPA marshruti uchun to‘g‘ri URL (Vite BASE_URL bilan mos). */
export function withBasePath(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  const p = path.startsWith('/') ? path : `/${path}`
  if (base === '/' || base === './') return p
  return `${String(base).replace(/\/$/, '')}${p}`
}
