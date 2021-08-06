// Write your "actions" router here!
const express = require('express')
const router = express.Router();
const Action = require('./actions-model')

// const { validateID, validateName, validateDescription } = require('../projects/projects-middleware')

const { validateProjectID, validateNotes, validateDescription, validateTheActualProjectID } = require('./actions-middlware')

router.get('/', async(req, res, next) => {
    try{
        const allActions = await Action.get()
        res.status(200).json(allActions)
    }catch(err){
        next(err)
    }
})

router.get('/:id', validateProjectID, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', validateNotes, validateDescription, validateTheActualProjectID, async(req, res, next) => {
    try{
        const newProject = await Action.insert(req.body)
        res.status(201).json(newProject)
    }catch(err){
        next(err)
    }
})

router.put('/:id', validateProjectID, validateNotes, validateDescription, async(req, res, next) => {
    try{
        const {id} = req.params
        const updatedAction = await Action.update(id, {notes: req.notes, description: req.description, completed: req.body.completed})

        res.status(200).json(updatedAction)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', validateProjectID, async(req, res, next) => {
    try{
        const deleted = await Action.remove(req.params.id)
        req.deleted = deleted
        res.status(200).json(req.action)
    }catch(err){
        next(err)
    }
})

module.exports = router