export function buildCropUrl(file: string, opts: { width?: number; height?: number } = {}) {
  const base = 'https://arhiiv-img.err.ee/resize';
  const params = new URLSearchParams();
  params.set('type', 'optimize');
  if (opts.width) params.set('width', String(opts.width));
  if (opts.height) params.set('height', String(opts.height));
  params.set('file', file);
  return `${base}?${params.toString()}`;
}
