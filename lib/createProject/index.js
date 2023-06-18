import chalk from "chalk";
import inquirer from "inquirer";
import tempProject from "./templateProject.js";
import custormProject from "./custormProject.js";
import gitProject from "./gitProject.js";
import updateTemplate from "./updateTemplate.js";
import { existsSync } from 'fs'
import process from "process";
import shell from 'shelljs'
import ora from "ora";
import { exec } from "child_process";
import path from "path";


/**
 * 开始构建
 */
export default async function createProject() {

    log(chalk.green.bold("开始构建项目"))

    const projectTypeList = [
        {
            type: "input",
            message: "请输入项目名称",
            name: "name"
        },
        {
            type: 'list',
            message: '选择项目类型',
            name: 'projectType',
            choices: ['template', 'custom', 'git', 'updateTemplate'] // 通过fs模块读取tempate目录下的目录列表
        }
    ]


    let funcMaps = {
        template: tempProject,
        custom: custormProject,
        git: gitProject,
        updateTemplate
    }

    try {

        let { projectType, name } = await inquirer.prompt(projectTypeList);
        // 获取执行命令的路径
        let _path = process.cwd();
        // 进入
        shell.cd(_path)

        await hasFile(name)

        funcMaps?.[projectType]?.()

    } catch (error) {
        log(chalk.red('createProject错误:', error))
    }

}


async function hasFile(name) {

    if (existsSync(name)) {

        ora().warn(chalk.red(`目录下已存在${name}文件夹`))

        var questions = [
            {
                type: 'confirm',
                name: 'isRemoveDir',
                message: `是否删除 ${name} ?`,
                default: false,
            }
        ]

        try {
            const { isRemoveDir } = await inquirer.prompt(questions)
            if (isRemoveDir) {
                shell.rm('-rf', name);
                ora().succeed(chalk.green(chalk.green(`删除 ${name}成功`)))
            } else {
                ora().fail(chalk.red("项目构建失败"))
                process.exit();
            }

        } catch (error) {
            log(chalk.red('createProject错误:', error))
        }
    }

}