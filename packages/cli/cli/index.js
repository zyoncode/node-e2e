#!/usr/bin/env node --loader ts-node/esm

import '../utils/loadEnv.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import process from 'process';

import * as testCommand from './commands/test.js';
import * as webCommand from './commands/web.js';
import * as versionCommand from './commands/version.js';
import * as debugCommand from './commands/debug.js';

const terminalWidth = process.stdout.columns;

yargs(hideBin(process.argv))
  .scriptName('node-e2e')
  .command(
    testCommand.command,
    testCommand.desc,
    testCommand.builder,
    testCommand.handler,
  )
  .command(
    debugCommand.command,
    debugCommand.desc,
    debugCommand.builder,
    debugCommand.handler,
  )
  .command(
    webCommand.command,
    webCommand.desc,
    webCommand.builder,
    webCommand.handler,
  )
  .command(
    versionCommand.command,
    versionCommand.desc,
    versionCommand.builder,
    versionCommand.handler,
  )
  .demandCommand()
  .recommendCommands()
  .help()
  .wrap(terminalWidth * 0.9)
  .parse();
