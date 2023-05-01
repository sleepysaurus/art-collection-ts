import { DBArt } from "../../common/art"

// For #1 way in ArtList.tsx
// interface Props {
//   art: DBArt
// }

function SingleArt (props: DBArt) {

  // #1 way with props in 'art' object
  //const { title, text, image } = props.art

  // #2 way with the individual props
  const { title, text, image } = props

  return (
    <div>
      <h3>{title}</h3>
      <p>{text}</p>

      <img className='art-image' src={image} alt='square of art' />

    </div>
  )
}

export default SingleArt
