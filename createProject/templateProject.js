import chalk from "chalk";
import inquirer from "inquirer";
import { readdirSync } from 'fs';
import { exec } from "child_process";
import path from "path";
import shell from 'shelljs'
import ora from "ora";


/**模板项目 */
export default async function templateProject(name) {
    log(chalk.green('开始拉取模板...'))

    const templateList = [
        {
            type: 'list',
            message: '请选择项目类型',
            name: 'template',
            choices: readdirSync(path.join(__dirname, 'template')) // 通过fs模块读取tempate目录下的目录列表
        }
    ]

    try {

        const { template } = await inquirer.prompt(templateList);

        if (template) {

            let np = path.join(__dirname, 'template', template);

            shell.cp('-R', np + '/', name) // shell cp

            ora().succeed(chalk.green(`拉取 '${template}' 项目成功！`))

            shell.cd(name) // shell cd

            ora().info(chalk.yellow('设置淘宝镜像源 --- npm config set registry http://registry.npm.taobao.org'))

            shell.exec('npm config set registry http://registry.npm.taobao.org') // 执行自定义的shell命令 npm config set registry http://registry.npm.taobao.org

            const autoInstall = [
                {
                    type: 'confirm',
                    name: 'isInstall',
                    message: `是否安装依赖（node_modules）?`,
                    default: false,
                }
            ]

            let { isInstall } = await inquirer.prompt(autoInstall)

            if (isInstall) {
                log('安装模块 --- npm install')
                ora().info(`${chalk.yellow('安装耗时可能会很长，请耐心等待，您也可以通过 ctrl+c停止安装， 手动 npm install')}`)
                const spinner = ora(`${chalk.blue('安装依赖中')}`)
                spinner.start()
                exec('npm install', { encoding: 'utf- 8' }, function (err, stdout, stderr) {
                    if (err) console.log(err)
                }).on('exit', function (code) {
                    spinner.succeed('模块安装完成')
                    shell.exec("npm start");
                    spinner.succeed('项目启动成功')
                    process.exit()
                });
            } else {
                process.exit()
            }
        }
    } catch (error) {

        log(chalk.red('createProject错误:', error))

    }
};


