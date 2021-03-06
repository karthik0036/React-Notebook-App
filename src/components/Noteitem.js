import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updateNote } = props

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i onClick={() => { deleteNote(note._id) }} className="far fa-trash-alt mx-2"></i>
                    <i onClick={() => { updateNote(note) }} className="fas fa-edit mx-2"></i>

                </div>
            </div>

        </div>

    )
}

export default Noteitem

