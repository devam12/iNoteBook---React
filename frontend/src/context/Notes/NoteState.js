// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const [notes, setNotes] = useState([]);

    //Get All Notes
    const getNotes = async () => {
        try {
            let url = "http://localhost:4000/api/notes/getAllNotes";
            let response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token'),
                }
            });
            if (response.status === 200) {
                let notesJson = await response.json();
                setNotes(notesJson);
            }
        } catch (error) {
            console.log("Notes not found");
        }
    }

    //Add Notes
    const addNote = async (title, description, tag , alert) => {
        try {
            let url = "http://localhost:4000/api/notes/addnote";
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    "title": title,
                    "description": description,
                    "tag": tag,
                }),
            });
            if (response.status === 200) {
                let notesJson = await response.json();
                let newarr = notes.concat(notesJson);
                setNotes(newarr);
                alert("Note added successfully","success");
            }
            else{
                alert("Invalid note","danger");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    //Delete Note
    const deleteNote = async (id) => {
        let url = `http://localhost:4000/api/notes/deletenote/${id}`;
        await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token'),
            }
        });
        const newNotes = notes.filter((note) => {
            return note._id !== id.toString();
        })
        setNotes(newNotes);
    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {

        let url = `http://localhost:4000/api/notes/updateNote/${id}`;
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token'),
            },
            body: JSON.stringify({
                "title": title,
                "description": description,
                "tag": tag,
            }),
        });
        getNotes();
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
