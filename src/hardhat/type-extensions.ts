import "hardhat/types/config";
import "hardhat/types/runtime";

import type { Config } from '../config';

declare module "hardhat/types/config" {
  export interface HardhatUserConfig {
    docgen: Omit<Config, 'root'>;
  }

  export interface HardhatConfig {
    docgen: Config;
  }
}
