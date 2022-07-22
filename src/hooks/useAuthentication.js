import {db} from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import {useState, useEffect} from 'react'

export const useAuthentication = () => {
    let [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled) {
            return
        }
    }

    // cadastrar
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let sytemErrorMessage 

            if(error.message.includes('Password')) {
                sytemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres.'
                
            } else if(error.message.includes('email-already')) {
                sytemErrorMessage = 'E-mail já cadastrado.'
            } else {
                sytemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
            }
            setError(sytemErrorMessage)
        }

        setLoading(false)
    }

    // logout - sign out
    const logout = () => {

        checkIfIsCancelled()
        signOut(auth)
    }

    // login - sign in
    const login = async(data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch(error) {
            console.log(error.message)
            console.log(typeof error.message)

            let sytemErrorMessage 

            if(error.message.includes('user-not-found')) {
                sytemErrorMessage = 'Usuário não encontrado.'
            } else if(error.message.includes('wrong-password')) {
                sytemErrorMessage = 'Senha incorreta'
            } else {
                sytemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
            }

            setError(sytemErrorMessage)

            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }






}

