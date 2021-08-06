// add middlewares here related to actions
// add middlewares here related to projects
const Action = require('./actions-model')
const Project = require('../projects/projects-model')

async function validateProjectID(req, res, next){
    const {id} = req.params
    try{
        const action = await Action.get(id)
        if(!action){
            res.status(404).json({message: 'project not found'})
        }else{
            req.action=action
            next()
        }
    }catch(err){
        next(err)
    }
}

async function validateTheActualProjectID(req, res, next){
    const projectID = req.body.project_id
    try{
        const isValid = await Project.get(projectID)
        if(!isValid){
            res.status(404).json({message: 'project not found'})
        }else{
            req.projectID = projectID
            next()
        }

    }catch(err){
        next(err)
    }
}

function validateNotes(req, res, next){
    const {notes} = req.body
    if(!notes){
      res.status(400).json({ message: "missing required notes field", })
    }else{
      req.notes = notes
      next()
    }
}

function validateDescription(req, res, next){
    const {description} = req.body
    if(!description){
      res.status(400).json({message: "missing required description field"})
    }else{
      req.description = description
      next()
    }
}

module.exports = {
    validateProjectID,
    validateNotes,
    validateDescription,
    validateTheActualProjectID
}