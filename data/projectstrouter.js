const express = require('express');
const projDb = require("./helpers/projectModel");
const actionDb = require("./helpers/actionModel");
const router = express.Router();

router.get('/', (req, res) => {
  projDb.get().then(posts=>{
    res.status(201).json(posts);
  }).catch(err=>{
    console.log(err);
    res.status(201).json({message:"Error retriving posts"});
  })
});

router.get('/:id',validateProjectId, (req, res) => {
  projDb.get(req.params.id).then(post=>{
    res.status(201).json(post);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Error retriving posts"});
  })
});

router.post('/',validateProject,(req,res)=>{
    projDb.insert(req.body).then(nProj=>{
        res.status(201).json(nProj)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"Error creating project"});
      })
})

router.post('/:id/action',validateProjectId, validateAction,(req,res)=>{
    actionDb.insert({project_id:req.params.id,...req.body}).then(nProj=>{
        res.status(201).json(nProj)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"Error creating action"});
    })
})

router.delete('/:id',validateProjectId, (req, res) => {
  projDb.remove(req.params.id).then(count=>{
    res.status(201).json({message:"Succesfully removed project"})
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Error deleting post"});
  })
});

router.put('/:id',validateProjectId, validateProject, (req, res) => {
  projDb.update(req.params.id,req.body).then(count=>{
    projDb.get(req.params.id).then(uPost=>{
      res.status(201).json(uPost);
    })
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Error updating post"});
  })
});

// custom middleware
function validateProjectId(req, res, next) {
  // do your magic!
  projDb.get(req.params.id).then(post=>{
    post?next():res.status(400).json({ message: "invalid post id" });
  })
}
function validateProject(req, res, next) {
    if(!req.body){
        res.status(400).json({message:"missing post data"});
      }
      if(!req.body.description||!req.body.name){
        res.status(400).json({message:"Please provide both name and description"})
      }
      next();
      // do your magic!
}
function validateAction(req, res, next) {
    if(!req.body){
        res.status(400).json({message:"missing post data"});
      }
      if(!req.body.description||!req.body.notes){
        res.status(400).json({message:"Please provide both notes and description"})
      }
      next();
  }

module.exports = router;
