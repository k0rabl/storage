import { instance } from '../../../configs/axios'

interface IParams {
    email: string
    password: string
    name: string
}

export const registrationPost = ({ email, password, name }: IParams) => {
    instance
        .post('/auth/registration', {
            email,
            password,
            name,
        })
        .catch((error) =>
            console.warn('Server error: ', error.response.data.msg)
        )
}
