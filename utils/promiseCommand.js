import { exec } from 'child_process'

/**
 * 异步创建子进程执行命令
 * @param {String} command 
 * @returns 
 */
export default function promiseCommand(command) {
    return new Promise((res, rej) => {
        exec(command, function (err, stdout,) {
            if (err) res([err, null])
        }).on('exit', (code) => {
            res([null, code])
        })
    })
};
