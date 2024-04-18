import fs from 'fs';
import { runTests as runWdioTests } from '../runners/wdioRunner.js';
import logger from '../../utils/logger.js';
import { FRAMEWORKS, PLATFORMS } from '../../utils/constants.js';
import { loadEnv } from '../../utils/loadEnv.js';
export const command = 'test';
export const desc = 'This is test command';

export const builder = {
  platform: {
    describe: 'Specify the platform',
    choices: Object.keys(PLATFORMS),
    type: 'string',
    demandOption: true,
  },
  framework: {
    describe: 'Specify the framework',
    choices: Object.keys(FRAMEWORKS),
    type: 'string',
    demandOption: true,
  },
  testCase: {
    describe: 'Specify test case',
    type: 'string',
  },
};

export const handler = async function (props) {
  const { platform, framework, testCase } = props;
  logger.debug('Receive parameters', JSON.stringify(props));

  process.env['NODE_E2E_PLATFORM'] = platform;
  process.env['NODE_E2E_FRAMEWORK'] = framework;

  loadEnv(platform);

  if (framework === FRAMEWORKS.wdio) {
    await runWdioTests(platform, testCase);
  } else {
    throw new Error('Only support wdio');
  }
};
