// Write your "projects" router here!
const express = require('express')
const router = express.Router();
const Project = require('./projects-model')
const { validateID, validateName, validateDescription, validateCompleted } = require('./projects-middleware')

router.get('/', async(req, res, next) => {
    try{
        const allProj = await Project.get()
        res.status(200).json(allProj)
    }catch(err){
        next(err)
    }
})

router.get('/:id', validateID, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateName, validateDescription, async(req, res, next) => {
    try{
        const newProject = await Project.insert(req.body)
        res.status(201).json(newProject)
    }catch(err){
        next(err)
    }
})

router.put('/:id', validateID, validateName, validateDescription, validateCompleted, async(req, res, next) => {
    try{
        const {id} = req.params
        const updatedProject = await Project.update(id, {name: req.name, description: req.description, completed: req.body.completed})

        res.status(200).json(updatedProject)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', validateID, async (req, res, next) => {
    try{
        const deleted = await Project.remove(req.params.id)
        req.deleted = deleted
        res.status(200).json(req.project)
    }catch(err){
        next(err)
    }
})


router.get('/:id/actions', validateID, async(req, res, next) =>{
    try{
        const actions = await Project.getProjectActions(req.params.id)
        res.json(actions)
    }catch(err){
        next(err)
    }
})

module.exports = router