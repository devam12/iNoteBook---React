import React, { useContext, useState } from 'react'
import noteContext from '../context/Notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const {showAlert} = props;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag , showAlert);
        setNote({ title: "", description: "", tag: "" })
        
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h2 className='my-3'>Add Note</h2>
            <div className='container'>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="title" placeholder="Enter title" value={note.title} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name="description" placeholder="Enter Description" value={note.description} onChange={onChange}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Description</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter Tag" value={note.tag} onChange={onChange}  />
                    </div>

                    <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
