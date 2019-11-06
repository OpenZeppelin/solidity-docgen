export function memoize<T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> {

  if (descriptor.value instanceof Function) {
    const func = descriptor.value;
    // Did not find a way to avoid this cast to any.
    // See https://github.com/microsoft/TypeScript/issues/34540.
    descriptor.value = memoized(func as any) as any;

  } else if (descriptor.get instanceof Function) {
    const func = descriptor.get;
    descriptor.get = memoized(func);
  }

  return descriptor;
}

type Fn = (...args: any[]) => any;

export function memoized<F extends Fn>(fn: F): F {
  type R = ReturnType<F>;

  const thisCache = new WeakMap<object, Map<string, R>>();
  const defaultCache = new Map<string, R>();

  function getCache(that: unknown): Map<string, R> {
    if (typeof that === 'object') {
      return getOrSet(thisCache, that, () => new Map());
    } else {
      return defaultCache;
    }
  }

  return function (this: unknown, ...args: any[]): R {
    const cache = getCache(this);
    const key = JSON.stringify(args);
    return getOrSet(cache, key, () => fn.apply(this, args));
  } as F;
}

type AnyMap<K, V> = Map<K, V> | (K extends object ? WeakMap<K, V> : never);

function getOrSet<K, V>(map: AnyMap<K, V>, key: K, gen: () => V): V {
  if (map.has(key)) {
    return map.get(key)!; // Non-null assertion because we check map.has(key) before.
  } else {
    const val = gen();
    map.set(key, val);
    return val;
  }
}
