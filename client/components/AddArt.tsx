import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch} from '../hooks/redux'
import { saveArtThunk } from '../actions/art'

function AddArt () {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    image: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Adds form properties
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    //e.preventDefault() // Used stop page reload to check redux action
    dispatch(saveArtThunk(formData))

    // Go to home and refresh home to get art collection from DB
    navigate('/')
    //navigate(0)
  }

  return (
    <div className='form-container'>
      <h3 className='form-row'>Add art</h3>
      <form onSubmit={()=> {handleSubmit()}}>
        <div className='form-row'>
          <label htmlFor='title'>Title:</label>
          <input type='text' name='title' onChange={handleChange} />
        </div>
        <div className='form-row'>
          <label htmlFor='text'>Text:</label>
          <input type='text' name='text' onChange={handleChange} />
        </div>
        <div className='form-row'>
          <label htmlFor='image'>Image link:</label>
          <input type='text' name='image' onChange={handleChange} />
        </div>
        <div className='form-row'>
          <button>submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddArt
