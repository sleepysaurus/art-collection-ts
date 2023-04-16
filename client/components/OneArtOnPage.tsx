import { useEffect } from 'react'
import { useAppDispatch, useAppSelector} from '../hooks/redux'
import { useNavigate, useParams } from 'react-router-dom'

import { getOneArtThunk, removeArt } from '../actions/art'
import { DBArt } from '../../common/art'

function OneArt () {
  const id  = Number(useParams().id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const art: DBArt[] = useAppSelector(store => store.artCollection)
  const theOneArt = art.find(art => art.id === id)

  useEffect(() => {
    dispatch(getOneArtThunk(id))
  }, [dispatch, id])

  const handleClick = (id:number) => {
    dispatch(removeArt(id))
    navigate('/')
  }

  return (
    <>
      { art && <div className='center one-art'>
        <div>
          <h3>{theOneArt?.title}</h3>
          <p>{theOneArt?.text}</p>
        </div>
        <img className='art-image' src={theOneArt?.image} alt='square of art' />
        <br/>
        <button onClick={()=>handleClick(id)}>Delete</button>
      </div>}
    </>
  )
}

export default OneArt
