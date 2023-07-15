import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({handleSubmitForm, setShowModal, children}) => {
   const [inputTitle, setInputTitle] = useState('');
   const [inputTextArea, setInputTextArea] = useState('')

   return (
      <div className="modal">
         <form className="modal-form" onSubmit={(e) => handleSubmitForm(e, inputTitle, inputTextArea)}>
            <button className="icon-btn close" onClick={() => setShowModal(false)}>
               <AiOutlineClose size={'1.4rem'} />
            </button>
            <label htmlFor="name">Name:</label>
            <input 
               id="name" 
               type="text" 
               name="name"
               value={inputTitle}
               onChange={e => setInputTitle(e.target.value)}
            />
            <label htmlFor="message">Message:</label>
            <textarea 
               id="message" 
               name="message" 
               rows="6" 
               value={inputTextArea}
               onChange={e => setInputTextArea(e.target.value)}
            />
            <button className="btn" type="submit">Create</button>
         </form>
         {children}
      </div>
   )
}

export default Modal