import React, { useState,useEffect } from 'react'
import './admin.css'
import {AiFillEdit,AiOutlineDelete,AiOutlineCheck} from 'react-icons/ai'
import {auth,db} from '../../firebase/firebase.config'
import {signOut} from 'firebase/auth'
import {addDoc,collection,onSnapshot
,query,
orderBy,
where,
doc,deleteDoc
,updateDoc} from 'firebase/firestore'


function Admin() {
  const[tarefa,setTarefas]=useState('')
  const[user,setUser]=useState({})
  const[mostraTarefa,setMostrar]=useState([])
  const[editar,setEditar]=useState({})


  useEffect(()=>{
    async function loadTarefa(){
      const userDetails=localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetails))

      if(userDetails){
        const data=JSON.parse(userDetails)
        const tarefaRef=collection(db,"tarefas")
        const q=query(tarefaRef,orderBy("created","desc"),where("userUid","==",data?.uid))
        const unsub=onSnapshot(q,(snapshot)=>{
          let lista=[];

          snapshot.forEach((dat)=>{
            lista.push({
              id:dat.id,
              tarefa:dat.data().tarefa,
              userUid:dat.data().userUid
            })
          })
          console.log(lista)
          setMostrar(lista)
        })
      }
    }
    loadTarefa()
  },[])

  const registerTarefa=async(e)=>{
    e.preventDefault()

    if(tarefa === ''){
      alert('Digite a sua tarefa')
      return
    }
    if(editar?.id){
      editarTarefa()
      return
    }
    await addDoc(collection(db,"tarefas"),{
      tarefa:tarefa,
      created:new Date(),
      userUid:user?.uid
    }).then(()=>{
      alert('Tarefa registrada com sucesso!')
      setTarefas('')
    }).catch((error)=>{
      console.log("Erro ao registrar" + error)
    })
  }

  const sair=async()=>{
    await signOut(auth)
  }


  const editTarefa=(item)=>{
    setTarefas(item.tarefa)
    setEditar(item)
  }
  const editarTarefa=async()=>{
    const editRef=doc(db,"tarefas",editar?.id)
    await updateDoc(editRef,{
      tarefa:tarefa
    }).then(()=>{
      setTarefas('')
      setEditar({})
    }).catch((error)=>{
      console.log('Error' + error)
      setTarefas('')
      setEditar({})
    })
  }

  const concluirTarefa=async(id)=>{
    const docRef=doc(db,"tarefas",id)
    await deleteDoc(docRef)
    .then(()=>{
      alert('Tarefa Concluida com sucesso!')
    }).catch((error)=>{
      console.error(error)
    })
  }

  const deleteTarefa=async(id)=>{
    const deleteRef=doc(db,"tarefas",id)
    await deleteDoc(deleteRef)
    .then(()=>{
      alert('Tarefa Deletada!')
    }).catch((error)=>{
      console.error(error)
    })
  }

  return (
    <div className='adm_container'>
      <h2>Minhas Tarefas</h2>

      <form className='form' onSubmit={registerTarefa}>
          <textarea
          placeholder='Digite sua tarefa'
          value={tarefa}
          onChange={(e)=>setTarefas(e.target.value)}/>
         {Object.keys(editar).length > 0 ?(
            <button className='register' style={{background:' #55b42c'}} type='submit'>Atualizar Tarefa</button>
         ):(
          <button className='register' type='submit'>Adicionar Tarefa</button>
         )}
         
      </form>
      {mostraTarefa.map((item)=>(
        <article key={item.id} className='lista'>
        <p>{item.tarefa}</p>
        <div className='btn'>
          <AiFillEdit onClick={()=>editTarefa(item)}/>
          <AiOutlineDelete onClick={()=>deleteTarefa(item.id)}/>
          <AiOutlineCheck onClick={()=>concluirTarefa(item.id)}/>
        </div>
      </article>
      ))}
      <button onClick={sair} className='logout'>Sair</button>

    </div>
  )
}

export default Admin