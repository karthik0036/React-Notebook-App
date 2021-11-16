const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');


// ROUTE1-get all notes of user :POST-'/api/notes/fetchallnotes' 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error.message)
        response.status(500).send("Internal server error occured")
    }
})

// ROUTE2-add notes of user :POST-'/api/notes/addnotes' 
router.post('/addnote', fetchuser, [
    body('title', 'title should be atleast 3 characters').isLength({ min: 3 }),
    body('description', 'more than 5 characters').isLength({ min: 5 })],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Notes({ title, description, tag, user: req.user.id })
            const savedNote = await note.save()
            res.json(savedNote)
        } catch (error) {
            console.error(error.message)
            response.status(500).send("Internal server error occured")
        }


    })

// ROUTE3- update notes of user :PuT-'/api/notes/updateNote' 
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body
    //crate new note object
    const newNote = {}

    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(500).send("not found") }

    if (note.user.toString() !== req.user.id) {
        return res.status(500).send("not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })


})

// ROUTE4- delete notes of user :delete-'/api/notes/deleteNote' 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    //find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(500).send("not found") }
    //allow deletion oly if user owns this
    if (note.user.toString() !== req.user.id) {
        return res.status(500).send("not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ "sucess": "note has been deletd" })


})

module.exports = router



