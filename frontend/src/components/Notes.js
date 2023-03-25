import { React, useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/Notes/noteContext'
import NoteItems from './NoteItems';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'


const Notes = (props) => {
    const navigate = useNavigate()
    const context = useContext(noteContext);
    const { notes, getNotes, editNote , tempfn } = context;
    const openToggle = useRef(null);
    const closeToggle = useRef(null);
    const {showAlert} = props;

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate("/");
        }
        else{
            navigate("/login");
        }
        getNotes();
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "General" })
    const handleSubmit = (e) => {
        e.preventDefault();
        closeToggle.current.click();
        showAlert("Note Updated successfully", "success");
        editNote(note.id, note.etitle, note.edescription, note.etag);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNote = (editNote) => {
        openToggle.current.click();
        setNote({ id: editNote._id, etitle: editNote.title, edescription: editNote.description, etag: editNote.tag });
    }

    return (
        <div className="container">
            <AddNote showAlert={showAlert}/>

            {/* Button for open toggle */}
            <button ref={openToggle} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Model  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="title" value={note.etitle} placeholder="Enter title" minLength={5} required onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} placeholder="Enter Description" minLength={5} required onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Description</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} placeholder="Enter Tag" minLength={5} required onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={closeToggle}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <h2 className='my-4'>Your Notes</h2>
            <div className="row">
                <div className="container mx-3">
                    {notes.length === 0 && "Notes Empty"}
                </div>
                {notes.map((note, index) => {
                    return <NoteItems note={note} key={index} updateNote={updateNote} showAlert={showAlert}/>
                })}
            </div>
        </div>
    )
}

export default Notes