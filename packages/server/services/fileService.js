import config from 'config'
import fs from 'fs'

export class FileServices {
    createDir(file) {
        const filePath = `${config.get('drivePath')}/${file.user}/${file.path}`

        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({ msg: 'File created succesfull!' })
                } else {
                    return reject({ msg: 'File already exist!' })
                }
            } catch (e) {
                console.log('createDir: ', e)
                return reject({ msg: 'Create dir: ', e })
            }
        })
    }

    deleteFile(file) {
        return new Promise((resolve, reject) => {
            try {
                const filePath = `${config.get('drivePath')}/${file.user}/${file.path}`

                fs.rmdirSync(filePath, { recursive: true, force: true })
                return resolve({ msg: 'File deleted succesfull!' })
            } catch (e) {
                console.log('deleteFile: ', e)
                return reject({ msg: e })
            }
        })
    }
}
