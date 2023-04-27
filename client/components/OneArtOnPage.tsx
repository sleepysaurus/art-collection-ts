import { useEffect, useState, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector} from '../hooks/redux'
import { useNavigate, useParams } from 'react-router-dom'

import { getOneArtThunk, removeArt, updateArtThunk } from '../actions/art'
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

  const handleUpdate = (id: number) => {
    //e.preventDefault() // Used stop page reload to check redux action
    dispatch(updateArtThunk(id, formData))

    // Go to home and refresh home to get art collection from DB
    //navigate('/')
    //navigate(0)
  }

  const handleDelete = (id:number) => {
    dispatch(removeArt(id))
    navigate('/')
  }

  // having the || '' here is what enabled the <input> value and placeholder properties to work
  const [formData, setFormData] = useState({
    title: theOneArt?.title || '',
    text: theOneArt?.text || '',
    image: theOneArt?.image || ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
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
      { art && <div className='form-container'>
        <h3 className='form-row'>Edit art</h3>
        <img className='art-image' src={theOneArt?.image} alt='square of art' />
        <form onSubmit={()=> {handleUpdate(id)}}>

          <div className='form-row'>
            <label htmlFor='title'>Title:</label>
            <input type='text' name='title' value={formData.title} onChange={handleChange} />
          </div>

          <div className='form-row'>
            <label htmlFor='text'>Text:</label>
            <input name='text' value={formData.text} onChange={handleChange} />
          </div>
          
          <div className='form-row'>
            <label htmlFor='image'>Image link:</label>
            <input type='text' name='image' value={formData.image} onChange={handleChange} />
          </div>

          <div className='form-row'>
            <button onClick={()=>handleUpdate(id)}>update</button>
            <button onClick={()=>handleDelete(id)}>delete</button>
          </div>
          
        </form>
      </div>
      }
    </>
  )
}

export default OneArt
