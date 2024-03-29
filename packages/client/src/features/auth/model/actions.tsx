import { instance } from '@configs/axios'


class Auth {
        
    async registration (email: string, password: string, name: string) {
        return await instance
            .post('/auth/registration', {
                email,
                password,
                name,
            })
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