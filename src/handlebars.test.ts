import test from 'ava';
import { compile, registerHelpers } from './handlebars';

test('registerHelpers', t => {
  const helper = 'q5MXwZ7rd9Bp'; // random name to avoid interference due to global state
  registerHelpers({
    [helper]: (str: string) => str.toUpperCase(),
  });
  const render = compile(`{{${helper} "test"}}`);
  t.is(render({}), 'TEST');
});
