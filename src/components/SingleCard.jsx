import { AiFillDelete } from 'react-icons/ai'
import { GiConfirmed } from 'react-icons/gi'

const SingleCard = ({title, description, status, _id, deleteTask, handleMoveTask}) => {
   return (
      <div className="card">
         <div className="option">
            <button className="icon-btn delete-color ">
               <AiFillDelete size={'1.5rem'} onClick={() => deleteTask(_id, status)} />
            </button>
            {!(status === 'completed') && <button className="icon-btn confirmed-color" onClick={() => handleMoveTask(_id, status)}>
               <GiConfirmed size={'1.7rem'} />
            </button>}
         </div>
         <h3 className="title">{title}</h3>
         <p>{description}</p>
      </div>
   )
}

export default SingleCard