import { instance } from '../../../configs/axios'
import { getFilesThunk } from './storageMiddleware'

interface IParams {
    name: string
    type: string
    parent: string
}

export const createFolder = async ({ name, type, parent }: IParams) => {
    await instance
        .post('/file', {
            name,
            type,
            parent,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .catch((error) =>
            console.warn('Server error: ', error.message)
        )
}

export const uploadFile = async (files: FileList | null | undefined, parent: string) => {
    let formData = new FormData()
    
    for (const key in files){
        const elem = (files as any)[key]

        if (typeof elem === 'object')
            formData.append('files', elem)
    }
    
    formData.append('parent', parent)
    
    await instance
        .post('/file/upload', formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .catch((error) =>
            console.warn('Server error: ', error.message)
        )
}

export const deleteFilePost = async (id: string) => {
    await instance
        .post('file/delete', {
            id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
}
