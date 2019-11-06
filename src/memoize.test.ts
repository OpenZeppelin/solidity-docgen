import test from 'ava';

import { memoized } from './memoize';

test('no arguments', t => {
  const fn = memoized(() => 4);
  t.is(fn(), 4);
});

test('one argument', t => {
  const fn = memoized(x => x);
  t.is(fn(4), 4);
  t.is(fn(5), 5);
});

test('two arguments', t => {
  const fn = memoized((x, y) => x + y);
  t.is(fn(4, 4), 8);
  t.is(fn(4, 5), 9);
  t.is(fn(4, 4), 8);
});

test('class method', t => {
  class Klass {
    calls: number = 0;

    constructor(readonly value: number) {
    }

    foo(): number {
      this.calls += 1;
      return this.value;
    }
  }

  Klass.prototype.foo = memoized(Klass.prototype.foo);

  const inst1 = new Klass(4);

  t.is(inst1.foo(), 4);
  t.is(inst1.foo(), 4);
  t.is(inst1.calls, 1);

  const inst2 = new Klass(5);

  t.is(inst2.foo(), 5);
  t.is(inst1.foo(), 4);
});
