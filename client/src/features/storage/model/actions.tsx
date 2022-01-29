import { instance } from '../../../configs/axios'

interface IParams {
    name: string
    type: string
    parent: string
}

export const createFolder = ({ name, type, parent }: IParams) => {
  instance
      .post('/file', {
          name,
          type,
          parent,
      })
      .then((data) => console.log(data))
      .catch((error) =>
          console.warn('Server error: ', error.response.data.msg)
      )
}
