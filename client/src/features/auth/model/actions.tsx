import { instance } from "../../../configs/axios"

interface IParams {
  email: string
  password: string
  name: string
}

export const  registrationPost = async ({email, password, name}: IParams) => {
  await instance.post('/auth/registration', {
    email,
    password,
    name
  })
  .then(data => console.log(data))
  .catch(error => console.warn('Server error: ', error.response.data.msg))
}
