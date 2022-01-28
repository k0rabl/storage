import { FileServices } from '../services/fileService.js'

import User from '../models/User.js'
import File from '../models/File.js'

export class FileController {
    async createDir(req, res) {
        try {
            const { name, type, parent } = req.body
            const file = new File({ name, type, parent, user: req.user.id })
            const parentFile = await File.findOne({ _id: parent })
            const service = new FileServices()

            if (!parentFile) {
                file.path = name
                await service.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${name}`
                await service.createDir(file)

                parentFile.child.push(file._id)
                await parentFile.save()
            }

            await file.save()
            res.json(file)
        } catch (e) {
            console.log('FileController create dir: ', e)
            res.status(401).json({ msg: 'FileController create dir: ', e })
        }
    }

    async deleteFile(req, res) {
        try {
            const { id } = req.body
            const service = new FileServices()
            const fileForRm = await File.findById(id)

            if (!fileForRm) res.status(401).json({ msg: 'File doesen`t exist' })

            async function recursiveDel(files) {
                if (!files.length) return null

                const children = await files.reduce(async (accum, elem) => {
                    const file = await File.findById(elem)

                    if (!file) return await accum

                    const arr = [...(await accum), ...file.child]

                    await File.findByIdAndDelete(elem)
                    return arr
                }, [])

                return recursiveDel(children)
            }

            await recursiveDel(fileForRm.child)
            await File.findByIdAndDelete(id)

            if (fileForRm.parent) {
                const parent = File.findById(fileForRm.parent)
                parent.child = parent.child.filter((elem) => elem !== id)
                parent.save()
            }

            await service.deleteFile(fileForRm)
            res.json({ msg: 'File deleted!' })
        } catch (e) {
            console.log('Delete file controll: ', e)
            res.status(401).json({ msg: 'Delete file controll: ', e })
        }
    }
}
