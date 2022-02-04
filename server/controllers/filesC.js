import { FileServices } from '../services/fileService.js'
import config from 'config'
import fs from 'fs'

import User from '../models/User.js'
import File from '../models/File.js'

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
                const parentFile = await File.findOne({ _id: parent })

                file.parent = parent
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
            const { files } = req.files
            const parentId = req.body.parent
            const userId = req.user.id
            const arrFiles = Array.isArray(files) ? files : [files]
                        
            arrFiles.map(async ({name, size, mimetype, mv}) => {
                try {
                    const userM = await User.findById(userId)
            
                    if (userM.size + size > config.get('maxUserSpace'))
                        throw 'You need more space!'
                    
                    let path = `${config.get('drivePath')}\\${userId}\\`
            
                    const fileM = new File({
                        name, 
                        size, 
                        type: mimetype, 
                        user: userId
                    })
                    
                    if(parentId) {
                        const parentFile = await File.findById(parentId)

                        fileM.parent = parentFile._id
                        fileM.path = parentFile.path
            
                        path += parentFile.path
            
                        parentFile.child.push(fileM._id)

                        parentFile.save()
                    } 
                    
                    fileM.path += `\\${name}`
                    userM.usedSpace = userM.usedSpace + size
            
                    if (fs.existsSync(`${path}\\${name}`)) {
                        throw  new Error('File already exist!')
                    }
                    
                    await userM.save()
                    await fileM.save()
                    await mv(`${path}\\${name}`) 
                } catch (e) {
                    throw e
                }       
            })
           
            res.json({ msg: 'All good'})
        } catch (e) {
            console.log('FileController upload files: ', e)
            res.status(401).json({ msg: 'Error upload files: ', e })
        }
    }

    async downloadFile(req, res) {
        try {
            const {fileId} = req.query
            const userId = req.user.id

            const file = await File.findById(fileId)
            
            if (!file) res.status(401).json({ msg: 'File doesen`t exist' })

            const path = `${config.get('drivePath')}\\${userId}\\${file.path}`

            res.setHeader('Access-Control-Expose-Headers','Content-Disposition')
            res.download(path, file.name)
                    
        } catch (e) {
            console.log('FileController download files: ', e)
            res.status(401).json({ msg: 'FileController download files: ', e })
        }
    }

    async deleteFile(req, res) {
        try {
            const { id } = req.body
            const userId = req.user.id

            const service = new FileServices()
            const fileForRm = await File.findById(id)

            if (!fileForRm) res.status(401).json({ msg: 'File doesen`t exist' })

            if (fileForRm.type !== 'dir'){

                await File.findByIdAndDelete(fileForRm)
                await service.deleteFile(fileForRm)

                const user = await User.findById(userId)
                user.usedSpace = user.usedSpace - fileForRm.size
                user.save()

                res.json({ msg: 'File deleted!' })
                return null
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
