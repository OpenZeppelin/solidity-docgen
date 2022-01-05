import { promises as fs, constants } from 'fs';

export async function exists(path: string, mode: number = constants.R_OK): Promise<boolean> {
  try {
    await fs.access(path, mode);
    return true;
  } catch {
    return false;
  }
}

export async function findExists(...paths: string[]): Promise<string | undefined> {
  for (const p of paths) {
    if (await exists(p)) {
      return p;
    }
  }
}
