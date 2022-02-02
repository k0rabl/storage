import { FileServices } from '../services/fileService.js'
import config from 'config'

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

const addFileToModel = async ({name, mimetype, size, mv}, parent = null, user) => {

   try {
        const userM = await User.findById(user)
        
        if (userM.size + size > config.get('maxUserSpace'))
            return res.status(401).json({ msg: 'You need more space!' })
        
        let path = `${config.get('drivePath')}\\${user}\\`

        const model = new File({
            name, 
            type: mimetype, 
            size, 
            user
        })
        
        if(parent) {
            model.parent = parent._id
            model.path = parent.path

            path += parent.path

            parent.child.push(model._id)
        } 
        
        model.path += `\\${name}`

        
        model.save()
        mv(`${path}\\${name}`)
   } catch (e) {
       return 'Problem in helper: ' + e
   }
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
            const { files } = req.files
            const { parent } = req.body
            const userId = req.user.id
            
            let parentFile

            if(parent)
                parentFile = await File.findById(parent)
            
            if (Array.isArray(files)){
                files.map(file => 
                    addFileToModel(file, parentFile, userId)  
                )
            } else{ 
                addFileToModel(files, parentFile, userId)
            }
           
            res.json({ msg: 'Files is uploaded!'})

        } catch (e) {
            console.log('FileController upload files: ', e)
            res.status(401).json({ msg: 'FileController upload files: ', e })
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
            const service = new FileServices()
            const fileForRm = await File.findById(id)

            if (!fileForRm) res.status(401).json({ msg: 'File doesen`t exist' })

            if (fileForRm.type !== 'dir'){
                await File.findByIdAndDelete(fileForRm)
                await service.deleteFile(fileForRm)
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
