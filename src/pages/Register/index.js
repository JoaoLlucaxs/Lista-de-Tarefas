import React,{useState} from 'react'
import Img from '../../img/list.gif'
import '../Home/home.css'
import {Link,useNavigate} from 'react-router-dom'
import {auth} from '../../firebase/firebase.config'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { toast } from 'react-toastify'


function Register() {
  const[email,setEmail]=useState('')
  const[senha,setSenha]=useState('')

  const navigateRegister=useNavigate()

  const registerSubmit=async(e)=>{
    e.preventDefault()
    if(email!== '' && senha!== ''){
      await createUserWithEmailAndPassword(auth,email,senha)
      .then(()=>{
        navigateRegister('/admin',{replace:true})
        toast.success('Bem vindo ao seu sistema de tarefas!')
      }).catch((error)=>{
        console.log('Gerou um erro' + error)
        toast.error('Algo aconteceu, verifique os campos')
      })
    }else{
      toast.error('Digite corretamente os campos')
    }

  }

  return(
    <>
    <div className='container'>
      <img src={Img} alt='tarefagif'/>
      <h2>Cadastre-se</h2>
      <span>Crie sua conta</span>

    <form className='form' onSubmit={registerSubmit}>

    <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Digite seu E-mail' />
    <input type='password' onChange={(e)=>setSenha(e.target.value)} placeholder='Digite sua senha'/>
      <button type='submit'>Registrar</button>
    </form>
    <Link to='/' className='link'>
      Possui uma conta? Faça Login
    </Link>
    </div>
    </>
  )
}

export default Register