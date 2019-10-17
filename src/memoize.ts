import mem from 'mem';

export function memoize<T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> {

  if (descriptor.value instanceof Function) {
    const func = descriptor.value;
    // Did not find a way to avoid this cast to any.
    // See https://github.com/microsoft/TypeScript/issues/34540.
    descriptor.value = mem(func as any) as any;

  } else if (descriptor.get instanceof Function) {
    const func = descriptor.get;
    descriptor.get = mem(func);
  }

  return descriptor;
}
