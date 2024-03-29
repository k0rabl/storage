import { instance } from '@configs/axios'

interface IParams {
    name: string
    type: string
    parent: string
    color: string
}


export const getFilesService = async () => {
    return await instance.get(`/file/get`, {
        headers: {
            isToken: 'true',
        },
      })
}

export const createFolder = async ({ name, type, parent, color }: IParams) => {
    await instance
        .post('/file', {
            name,
            type,
            parent,
            color
        }, {
            headers: {
                isToken: 'true',
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
                isToken: 'true',
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
                isToken: 'true',
            }
        })
}


export const downloadFile = async (id: string) => {
    await instance
        .get('file/download', {
            headers: {
                isToken: 'true'
            },
            params: {
                fileId: id
            }
        }).then(res => {          
            const url = window.URL.createObjectURL(new Blob([res.data],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))

            const link = document.createElement('a')

            link.href = url
            link.setAttribute('download',
                res.headers["content-disposition"].split("filename=")[1].replaceAll('"', ''))

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        })
}
