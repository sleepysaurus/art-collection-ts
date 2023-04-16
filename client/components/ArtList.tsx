import { useEffect} from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector} from '../hooks/redux'
import { getArtThunk } from '../actions/art'
import SingleArt from './OneArtInList'
import { DBArt } from '../../common/art'

function ArtList () {

  const dispatch = useAppDispatch()
  const artList: DBArt[] = useAppSelector((store) => store.artCollection)

  useEffect(() => {
    dispatch(getArtThunk())
  }, [dispatch])

  return (
    <div className='container'>
      {artList && artList.map(oneArt =>{
          // #1 way putting all the props into an 'art' object
          // return <Link to={`/${oneArt.id}`} className='container-item' key={oneArt.id}><SingleArt art={oneArt} /></Link>
          // #2 way putting the props individually in the spread operator
          // TAB INDEX: add for a specific order tabIndex={oneArt.id} - this is bad practice here as link is already focusable
          return <Link to={`/${oneArt.id}`} className='container-item' key={oneArt.id} ><SingleArt {...oneArt} /></Link>
        }
      )}
    </div>
  )
}

export default ArtList