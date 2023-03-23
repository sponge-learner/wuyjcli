#!/usr/bin/env node
import chalk from "chalk";
import createProject from './createProject/index.js'
import path from 'path'

global.__dirname = path.resolve();
global.log = console.log

log(chalk.green.bold("欢迎使用"))

createProject()