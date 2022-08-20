import React,{useState} from 'react'
import Img from '../../img/list.gif'
import {Link,useNavigate} from 'react-router-dom'
import {auth} from '../../firebase/firebase.config'
import {createUserWithEmailAndPassword} from 'firebase/auth'


function Register() {
  const[email,setEmail]=useState('')
  const[senha,setSenha]=useState('')

  const navigateRegister=useNavigate()

  const registerSubmit=async(e)=>{
    e.preventDefault()
    
    if(email !== '' && senha !== ''){
      await createUserWithEmailAndPassword(auth,email,senha)
      .then(()=>{
        navigateRegister('/admin',{replace:true})
      }).catch((error)=>{
        console.log('Gerou um erro' + error)
      })
    }else{
      alert('Digite os campos')
    }
  }

  return(
    <div className='container'>
      <img src={Img} alt='tarefagif'/>
      <h2>Cadastre-se</h2>
      <p>Crie sua conta</p>

    <form className='form' onSubmit={registerSubmit}>
      <input type='email' placeholder='Digite seu E-mail'
      value={email}
      onChange={(e)=>setEmail(e.target.value)}/>

      <input type='password' placeholder='******'
      value={senha}
      onChange={(e)=>setSenha(e.target.value)}/>

      <button type='submit'>Registrar</button>
    </form>
    <Link to='/' className='link'>
      Possui uma conta? Faça Login
    </Link>
    </div>
  )
}

export default Register