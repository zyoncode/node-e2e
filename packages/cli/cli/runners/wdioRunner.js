import { spawn } from 'child_process';
import process from 'process';

import logger from '../../utils/logger.js';
import { findWorkspaceRoot } from '../../utils/workspaceRoot.js';
const rootDir = findWorkspaceRoot(process.cwd());

export const runTests = async function(platform, testCase = process.env.SPECS) {
  const child = spawn(
    'npx',
    ['wdio', 'run', `packages/cli/confs/wdio.${platform}.conf.js`].concat(
      testCase ? ['--spec', testCase] : [],
    ),
    {
      stdio: 'inherit',
      shell: true,
      cwd: rootDir,
    },
  );

  child.on('close', code => {
    logger.info(`child process exited with code ${code}`);
  });
};
