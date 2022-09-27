import {BrowserRouter} from 'react-router-dom'
import Rotas from './routes'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App=()=> {
  return (
    <BrowserRouter>
        <Rotas/>
        <ToastContainer autoClose={1000}/>
    </BrowserRouter>
  );
}

export default App;
