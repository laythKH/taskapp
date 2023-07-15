
const SingleColumn = ({children, title}) => {
   return (
         <section className="column">
            <h3 className="column-title">{title}</h3>
            <div className="scroll-container">
               {children}
            </div>
         </section>
   )
}

export default SingleColumn