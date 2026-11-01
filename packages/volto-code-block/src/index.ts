import type { ConfigType } from '@plone/registry';
import installBlocks from './config/blocks';
import installSettings, { languages } from './config/settings';

import './theme/main.less';
import './theme/theme-dark.less';
import './theme/theme-light.less';

function applyConfig(config: ConfigType) {
  installSettings(config);
  installBlocks(config);

  return config;
}

export { languages };
export default applyConfig;
