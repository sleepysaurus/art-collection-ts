import { useEffect, useState, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector} from '../hooks/redux'
import { useNavigate, useParams } from 'react-router-dom'

import { getOneArtThunk, removeArt, saveArtThunk } from '../actions/art'
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

  const handleSubmit = () => {
    //e.preventDefault() // Used stop page reload to check redux action
    dispatch(saveArtThunk(formData))

    // Go to home and refresh home to get art collection from DB
    //navigate('/')
    //navigate(0)
  }

  const handleClick = (id:number) => {
    dispatch(removeArt(id))
    navigate('/')
  }

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    image: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Adds form properties
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value
    // })
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <>
      { art && <div className='center one-art'>
          <h3>{theOneArt?.title}</h3>
          <p>{theOneArt?.text}</p>
        <img className='art-image' src={theOneArt?.image} alt='square of art' />
        <form className='center' onSubmit={()=> {handleSubmit()}}>
          <label htmlFor='title'>Title: </label>
          <input type='text' name='title' defaultValue={formData.title} onChange={handleChange} />

          <label htmlFor='text'>  Text: </label>
          <input type='text' name='text' value={formData.text} onChange={handleChange} />

          <label htmlFor='image'>  Image link: </label>
          <input type='text' name='image' value={formData.image} onChange={handleChange} />

          <button onClick={()=>handleClick(id)}>Delete</button>
        </form>
      </div>
      }
      {/* { art && <div className='center one-art'>
        <div>
          <h3>{theOneArt?.title}</h3>
          <p>{theOneArt?.text}</p>
        </div>
        <img className='art-image' src={theOneArt?.image} alt='square of art' />
        <br/>
        <button onClick={()=>handleClick(id)}>Delete</button>
      </div>
      } */}
    </>
  )
}

export default OneArt
