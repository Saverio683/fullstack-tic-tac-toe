import { Fragment } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { setUserData } from '../../redux/user.js'

import './register.styles.scss'

const RegisterPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const serializeAndStringify = obj => {
        const seen = []
        JSON.stringify(
            obj,
            (key, val) => {
                if(val != null && typeof val === 'object') {
                    if(seen.indexOf(val) >= 0)
                       return
                    seen.push(val)
                }
                return val                
            }
        )
        return seen[0]
    }    

    const handleSubmit = event => {
        event.preventDefault()
        const { username, email, password } = event.target
        let userData
        let requestUrl = '/auth/'

        if(username) {
            userData = { 
                username: username.value, 
                email: email.value, 
                password: password.value 
            }
            requestUrl += 'registration'
        } else {
            userData = {  
                email: email.value,
                password: password.value
            }         
            requestUrl += 'login'   
        }
        axios.post(requestUrl, serializeAndStringify(userData))
            .then(({ data }) => {
                dispatch(setUserData(data))
            })
            .then(() => navigate('/', { replace: true }))
            .catch(err => console.error(err))
    }  

    return (
        <Fragment>
        <div className='register-page'>            
            <form className='container' onSubmit={handleSubmit}>
                <span>WELCOME BACK</span>
                <input name='email' required type='email' placeholder='Email' />
                <input name='password' required type='password' minLength='8' placeholder='Password' />
                <div className='button-wrapper'>
                    <button type='submit'>LOG IN</button>
                    <button className='google-button'>
                        <a href='http://localhost:4000/auth/google'>
                            LOG IN WITH GOOGLE
                        </a>
                    </button>
                </div>
            </form>
            <form className='container' onSubmit={handleSubmit}>
                <span>REGISTER</span>
                <input name='username' required type='text'  placeholder='Username' />
                <input name='email' required type='email' placeholder='Email' />
                <input name='password' required type='password' minLength='8' placeholder='Password' />
                <div className='button-wrapper'>
                    <button type='submit'>SIGN IN</button>
                    <button className='google-button'>
                        <a href='http://localhost:4000/auth/google'>
                            SIGN IN WITH GOOGLE
                        </a>
                    </button>
                </div>
            </form>   
        </div>
        <button onClick={() => navigate('/', {replace: true})}>Go back</button>       
        </Fragment>
    )
}

export default RegisterPage