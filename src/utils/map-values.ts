export function mapValues<V, W>(obj: Record<string, V>, fn: (value: V) => W): Record<string, W> {
  const res: Record<string, W> = {};
  for (const k in obj) {
    res[k] = fn(obj[k]!);
  }
  return res;
}

