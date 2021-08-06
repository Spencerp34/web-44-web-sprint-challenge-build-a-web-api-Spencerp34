// add middlewares here related to projects
const Project = require('./projects-model')

async function validateID(req, res, next){
    const {id} = req.params
    try{
        const project = await Project.get(id)
        if(!project){
            res.status(404).json({message: 'project not found' })
        }else{
            req.project=project
            next()
        }
    }catch(err){
        next(err)
    }
}

function validateName(req, res, next){
    const {name} = req.body
    if(!name){
      res.status(400).json({ message: "missing required name field"})
    }else{
      req.name = name
      next()
    }
}

function validateCompleted(req, res, next){
    const {completed} = req.body
    console.log('COMPLETED', completed)
    if(completed ===undefined){
        res.status(400).json({message: "Missing required completed value. It doesn't have to be true, but it needs a value."})
    }
    else{
        req.completed = completed
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
    validateID,
    validateName,
    validateDescription,
    validateCompleted
}