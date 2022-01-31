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

export const uploadFile = async (file: File) => {
    await instance
        .post('/file/upload', {
            file    
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
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
