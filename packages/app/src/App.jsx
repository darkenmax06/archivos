import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Suspense , lazy } from 'react'
import { Redirect } from './components/Redirect'
import ViewLoader from './components/Loaders/ViewLoader'


const Create = lazy(()=> import ('./pages/Create'))
const Index = lazy(()=> import ('./pages/Search'))
const CreateSome = lazy(()=> import ('./pages/CreateSome'))
const Login = lazy(()=> import ('./pages/Login'))
const Update = lazy(()=> import ('./pages/Update'))


function App() {
  
  return (
    <Suspense fallback={<ViewLoader/>}>
      <Routes>
        <Route path='/' element={ 
          <Navigate to="/login" /> 
        } />

        <Route path='/login' element={
          <Login/>
        } />


        <Route path='/search' element={
          <Redirect>
            <Index/>
          </Redirect>
        } />

        <Route path='/create' element={
          <Redirect>
            <Create/>
          </Redirect>
        } />


        <Route path='/update/:id' element={
          <Redirect>
            <Update/>
          </Redirect>
        } />

        <Route path='/create/some' element={ 
          <Redirect>
            <CreateSome/>
          </Redirect>
        } />
      </Routes>
    </Suspense>
  )
}

export default App
