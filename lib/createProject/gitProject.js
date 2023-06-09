import inquirer from "inquirer";
import promiseCommand from "../utils/promiseCommand.js";
import ora from "ora";
import shell from 'shelljs'
import installModal from "../utils/installModal.js";


/**
 * git创建项目
 * */
export default async function gitProject(name) {

    const question = [
        {
            type: "list",
            message: "请选择镜像源（国内建议选择gitee）",
            name: "gitType",
            choices: ['git', 'gitee']
        }
    ]

    // git仓库映射
    const gitMap = {
        gitee: "https://gitee.com/w992133722/react-ts.git"
    }

    let { gitType } = await inquirer.prompt((question));

    if (gitMap[gitType]) {
        let loading = ora('正在克隆仓库')
        loading.start()

        let [err, code] = await promiseCommand(`git clone ${gitMap[gitType]} ${name}`)
        if (err) {
            console.log('仓库克隆错误:', err)
        } else {
            loading.succeed('仓库克隆成功')
            shell.cd(name)
            await installModal()
        }
    } else {
        ora().fail("镜像资源正在开发中")
    }

};
