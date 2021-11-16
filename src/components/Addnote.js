import React from 'react'
import { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = () => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "default" }
    )
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description)

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (

        <div className="container my-3">
            <h2>Add notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input minLength={5} required onChange={onChange} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input minLength={5} required onChange={onChange} type="text" className="form-control" id="description" name="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input minLength={5} required onChange={onChange} type="text" className="form-control" id="tag" name="tag" />
                </div>

                <button disabled={note.description.length < 5 || note.title.length < 5} onClick={handleClick} type="submit" className="btn btn-primary">Add Note</button>
            </form>

        </div>
    )
}

export default Addnote
