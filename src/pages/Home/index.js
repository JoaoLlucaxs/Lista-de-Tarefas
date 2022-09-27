import React, { useState } from 'react'
import './home.css';
import Img from '../../img/list.gif'
import {Link} from 'react-router-dom'
import {auth} from '../../firebase/firebase.config'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

function Home() {
  const[email,setEmail]=useState('')
  const[senha,setSenha]=useState('')
  const[load,setLoad]=useState(false)


  //Navigate : 
  const navigate=useNavigate()

  const loginSubmit=async(e)=>{
    e.preventDefault()

    if(email !== '' && senha !== ''){
      setLoad(true)
     await signInWithEmailAndPassword(auth,email,senha)
     .then(()=>{
      navigate('/admin',{replace:(true)})
      toast.success('Bem vindo de volta')
      setLoad(false)
     }).catch((error)=>{
      console.log('Ocorreu um erro' + error)
     })
    }else{
      toast.error('Digite os campos')
    }
  }


  return (
    <div className='container'>
      <img src={Img} alt='tarefagif'/>
      <h2>Login</h2>
      <p>Liste suas tarefas de forma fácil</p>

    <form className='form' onSubmit={loginSubmit}>
    
    <input type='email'
    label='Email'
    id='email'
    placeholder='Digite seu email'
    onChange={(e)=>setEmail(e.target.value)}/>
     <input
     label='Senha'
     id='senha'
     type='password'
     placeholder='Digite sua senha'
    onChange={(e)=>setSenha(e.target.value)}/>
    
      <button type='submit'> {load ? 'Carregando...': 'Entrar'}</button>
    </form>
    <Link to='./register' className='link'>
      Não possui uma conta ? Registre-se
    </Link>
    </div>

  )
}

export default Home