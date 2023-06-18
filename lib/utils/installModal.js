import inquirer from "inquirer";
import promiseCommand from "./promiseCommand.js";
import ora from "ora";


/**
 * 安装模块
 * @param {*} params 
 */
export default async function installModal(params) {

    const question = [
        {
            type: 'confirm',
            name: 'isInstall',
            message: `是否安装依赖（node_modules）?`,
            default: false,
        }
    ]

    let { isInstall } = await inquirer.prompt(question);

    if (isInstall) {

        let loading = ora('依赖安装中');

        loading.start();

        let [err, code] = await promiseCommand('npm install');
        loading.stop()
        if (err) return console.log('依赖安装错误')
        loading.succeed('依赖安装成功')

    }


};
