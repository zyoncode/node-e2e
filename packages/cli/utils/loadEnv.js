import path from 'path';
import dotenv from 'dotenv';
import process from 'process';
import { findWorkspaceRoot } from './workspaceRoot.js';

const newDirectory = findWorkspaceRoot(process.cwd());

dotenv.config();

export const loadEnv = (platform) => {
  dotenv.config({
    path: path.join(newDirectory, `.env.${platform.toLocaleLowerCase()}`),
  });
};
