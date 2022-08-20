import React, { useState } from 'react'
import './home.css';
import Img from '../../img/list.gif'
import {Link} from 'react-router-dom'
import {auth} from '../../firebase/firebase.config'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function Home() {

  const[email,setEmail]=useState('')
  const[senha,setSenha]=useState('')


  //Navigate : 
  const navigate=useNavigate()

  const loginSubmit=async(e)=>{
    e.preventDefault()
    
    if(email !== '' && senha !== ''){
     await signInWithEmailAndPassword(auth,email,senha)
     .then(()=>{
      navigate('/admin',{replace:(true)})
     }).catch((error)=>{
      console.log('Ocorreu um erro' + error)
     })
    }else{
      alert('Digite os campos')
    }
  }

  return (
    <div className='container'>
      <img src={Img} alt='tarefagif'/>
      <h2>Login</h2>
      <p>Liste suas tarefas de forma fácil</p>

    <form className='form' onSubmit={loginSubmit}>
      <input type='email' placeholder='Digite seu E-mail'
      value={email}
      onChange={(e)=>setEmail(e.target.value)}/>

      <input type='password' placeholder='******'
      autoComplete=''
      value={senha}
      onChange={(e)=>setSenha(e.target.value)}/>

      <button type='submit'>Entrar</button>
    </form>
    <Link to='./register' className='link'>
      Não possui uma conta ? Registre-se
    </Link>
    </div>

  )
}

export default Home