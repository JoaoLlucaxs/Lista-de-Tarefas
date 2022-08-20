import {Routes,Route} from 'react-router-dom'
import Admin from '../pages/Adm'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Private from './Private'

const RoutesApp=()=>{
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/admin' element={<Private><Admin/></Private>}/>
        </Routes>
    )
}


export default RoutesApp