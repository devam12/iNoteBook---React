import {React , useContext} from 'react'
import noteContext from '../context/Notes/noteContext';

const NoteItems = (props) => {
    const { note , updateNote , showAlert} = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className="col-md-3 my-4">
            <div className="card">
                {/* <img className="card-img-top" src="https://unsplash.com/photos/xG8IQMqMITM" alt="Card image cap" /> */}
                    <div className="card-body">
                    <div className="d-flex justify-content-between text-">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa fa-trash " aria-hidden="true" onClick={()=>{deleteNote(note._id) ; showAlert("Note Deleted Successfully", "success")}}></i>
                        <i className="fa fa-pencil-square-o " aria-hidden="true" onClick={()=>{updateNote(note)}}></i>
                    </div>
                        <p className="card-text">{note.description}</p>
                    </div>
            </div>
        </div>
    )
}

export default NoteItems
