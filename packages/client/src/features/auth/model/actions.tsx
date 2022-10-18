import { instance } from '@configs/axios'


class Auth {
        
    async registration (email: string, password: string, name: string) {
        await instance
            .post('/auth/registration', {
                email,
                password,
                name,
            })
            .catch((error) =>
                console.warn('Server error: ', error.response.data.msg)
            )
    }


    async logIn (email: string, password: string ) {
        return await instance
            .post('/auth/login', {
                email,
                password,
            })
    }

    async auth (token: string ) {
        return await instance
            .get(`/auth/auth`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
    }
}

const authService = new Auth()
export default authService