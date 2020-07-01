// Test helper that runs SolcAdapter.compile in a separate process to avoid blocking.

import proc from 'child_process';
import events from 'events'
import assert from 'assert';
import util from 'util';

import { SolcAdapter } from './solc';

export async function solcCompile(solcModule: string, input: object): Promise<any> {
  const child = proc.fork(__filename);
  child.send({ solcModule, input });
  const [{ error, output }] = await events.once(child, 'message');
  assert.ifError(error);
  return output;
}

// When forked:
if (process.send !== undefined) {
  process.once('message', async ({ solcModule, input }) => {
    try {
      const adapter = await SolcAdapter.require(solcModule);
      const output = adapter.compile(input);
      process.send!({ output });
    } catch (error) {
      process.send!({ error: util.inspect(error) });
    }
  });
}
