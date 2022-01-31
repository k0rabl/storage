import { FileServices } from '../services/fileService.js'

import User from '../models/User.js'
import File from '../models/File.js'

export class FileController {

    async getFiles(req, res) {
        try {
            const user = await User.findById(req.user.id)
            const files = await File.find({user: user._id})

            res.json(files)
        } catch (e) {
            console.log('FileController get files: ', e)
            res.status(401).json({ msg: 'FileController get files: ', e })
        }
    }

    async createDir(req, res) {
        try {
            const { name, type, parent } = req.body

            const file = new File({ name, type, user: req.user.id })
            const service = new FileServices()

            if (!parent.length) {
                file.path = name
            } else {
                file.parent = parent
                const parentFile = await File.findOne({ _id: parent })

                file.path = `${parentFile.path}\\${name}`

                parentFile.child.push(file._id)
                await parentFile.save()
            }

            await service.createDir(file)
            await file.save()
            
            res.json(file)
        } catch (e) {
            console.log('FileController create dir: ', e)
            res.status(401).json({ msg: 'FileController create dir: ', e })
        }
    }

    async uploadFiles(req, res) {
        try {
            const {file} = req.body
            console.log('files: ', file);
            // files.forEach(file => {
            //     const file = new File({ name, type, user: req.user.id })
            //     const parentFile = await File.findOne({ _id: parent })

            // })
            res.json({ msg: 'Good!'})

        } catch (error) {
            console.log('FileController upload files: ', e)
            res.status(401).json({ msg: 'FileController upload files: ', e })
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
