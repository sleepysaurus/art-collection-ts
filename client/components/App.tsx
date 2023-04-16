import { useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'

import { useAppDispatch} from '../hooks/redux'

import Header from './Header'
import Nav from './Nav'
import ArtList from './ArtList'
import AddArt from './AddArt'
import OneArt from './OneArtOnPage'
import { getArtThunk } from '../actions/art'

function App() {
  const dispatch = useAppDispatch()

  // This will load on every page
  useEffect(() => {
    dispatch(getArtThunk())
  }, [dispatch])

  return (
    <>
      <div className='app-container'>
        <Header />
        <Nav />
        <Routes>
          <Route path='/' element={<ArtList />}></Route>
          <Route path='/add' element={<AddArt />}></Route>
          <Route path='/:id' element={<OneArt />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
