import { useEffect, useState } from "react";
import { AiOutlinePlus} from "react-icons/ai";
import { generateRandomId, getNotesFromLocalStorage, setNoteToLocalStorage } from "../utils/utils";

import SingleColumn from "../components/SingleColumn";
import SingleCard from "../components/SingleCard";
import Modal from "../components/Modal";
import Alert from "../components/Alert";


const HomePage = () => {
   const [loading, setLoading] = useState(false)
   const [showModal, setShowModal] = useState(false)
   const [showAlert, setShowAlert] = useState(false)
   const [alertText, setAlertText] = useState('')

   const [todo, setTodo] = useState([]);
   const [inprogress, setInprogress] = useState([]);
   const [completed, setCompleted] = useState([]);

   // when fetch the data from localStorage it will store it in three states based on status 
   const seprateBasedONStatus = (allList) => {
      setTodo(allList.filter(task => task.status === 'todo'))
      setInprogress(allList.filter(task => task.status === 'inprogress'))
      setCompleted(allList.filter(task => task.status === 'completed'))
   }

   // When Create New Task
   const handleSubmitForm = (event, inputTitle, inputTextArea) => {
      event.preventDefault();
      if(!inputTitle || !inputTextArea) {
         setAlertText('Please Fill All Fields')
         setShowAlert(true)
         return
      }
      const newtodo = {
         _id: generateRandomId(),
         title: inputTitle,
         description: inputTextArea,
         status: 'todo'
      }

      setTodo([newtodo, ...todo])
      setShowModal(false)
   }

   // When Move Task From Todo => InProgress
   const addToProgress = (id) => {
      const itemToAddToInprogress = todo.find(x => x._id === id);
      itemToAddToInprogress.status = 'inprogress'
      setInprogress([itemToAddToInprogress, ...inprogress]);
      const newTodo = todo.filter(x => x._id !== id);
      setTodo(newTodo);
   }

   // When Move Task From InProgress => Completed
   const addToCompleted = (id) => {
      const itemToAddToCompleted = inprogress.find(x => x._id === id);
      itemToAddToCompleted.status = 'completed'
      setCompleted([itemToAddToCompleted, ...completed]);
      const newInprogress = inprogress.filter(x => x._id !== id);
      setInprogress(newInprogress);
   }

   // Here It Will Decide Which Function To Run Based On Status "addToProgress" Or "addToCompleted"
   const handleMoveTask = (id, status) => {
      if (status === 'todo') {
         addToProgress(id)
      } else {
         addToCompleted(id)
      }
   }

   // Here It Will Remove The Task
   const deleteTask = (id, status) => {
      if(status === 'todo') {
         const newTodo = todo.filter(x => x._id !== id);
         setTodo(newTodo);
      }
      else if (status === 'inprogress') {
         console.log('clear from inprogress');
         const newInProgress = inprogress.filter(x => x._id !== id);
         setInprogress(newInProgress);
      } 
      else {
         const newCompleted = completed.filter(x => x._id !== id);
         setCompleted(newCompleted);
      }
   }


   // Here To Get The Data From LocalStorage When Open The Page
   useEffect(() => {
      setLoading(true)
      const getDataFromLocalStorage = getNotesFromLocalStorage()
      if(getDataFromLocalStorage) {
         seprateBasedONStatus(getDataFromLocalStorage)
      }
      setLoading(false)
   }, [loading])

   // Here It Will Every Time The [todo, inprogress, completed] change and set the new values to localStorage
   useEffect(() => {
      const saveToLocalStorage = [
         ...todo,
         ...inprogress,
         ...completed
      ]
      setNoteToLocalStorage(saveToLocalStorage)
   }, [todo, inprogress, completed]);

   

   if(loading) {
      return (
         <div className="loading">
            <h1>loading...</h1>
         </div>
      )
   }

   return (
      <div className="page-container"> 
         <nav className="create-task-btn">
            <h1 className="logo">Task App</h1>
            <button className="btn" onClick={() => setShowModal(!showModal)}>
               <span>Create</span>
               <AiOutlinePlus size={'1.4rem'} />
            </button>
         </nav>
         <div className="home-page">
            <div className="container">
               <SingleColumn title="To Do">
                  {todo.map(({title, description, _id, status}) => (
                     <SingleCard 
                        title={title}  
                        description={description}
                        _id = {_id}
                        status={status}
                        deleteTask={deleteTask}
                        handleMoveTask={handleMoveTask}
                     />
                  ))}
               </SingleColumn>
               <SingleColumn title="In Progress">
                  {inprogress.map(({title, description, _id, status}) => (
                     <SingleCard 
                        title={title}  
                        description={description}
                        _id = {_id}
                        status={status}
                        deleteTask={deleteTask}
                        handleMoveTask={handleMoveTask}
                     />
                  ))}
               </SingleColumn>
               <SingleColumn title="Completed">
                  {completed.map(({title, description, _id, status}) => (
                     <SingleCard 
                        title={title}  
                        description={description}
                        _id = {_id}
                        status={status}
                        deleteTask={deleteTask}
                        handleMoveTask={handleMoveTask}
                     />
                  ))}
               </SingleColumn>
            </div>
         </div>


         {/* Here The Modal When We Create New Task */}
         {showModal && 
            <Modal 
               setShowModal={setShowModal} 
               handleSubmitForm={handleSubmitForm} 
            >
               <Alert 
                  showAlert={showAlert} 
                  setShowAlert={setShowAlert} 
                  alertText={alertText}
               />
            </Modal>
         }

         
      </div>
   )
}

export default HomePage


