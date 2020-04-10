const express = require('express');
const actionDb = require("./helpers/actionModel");
const router = express.Router();

/** GET GET GET */
router.get('/', (req, res) => {
  actionDb.get().then(posts=>{
    res.status(201).json(posts);
  }).catch(err=>{
    console.log(err);
    res.status(201).json({message:"Error retriving actions"});
  })
});

router.get('/:id',validateActionId, (req, res) => {
  actionDb.get(req.params.id).then(action=>{
    res.status(201).json(action);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Error retriving actions"});
  })
});

/** DELETE DELETE DELETE */
router.delete('/:id',validateActionId, (req, res) => {
  actionDb.remove(req.params.id).then(count=>{
    res.status(201).json({message:"Succesfully removed project"})
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Error deleting post"});
  })
});
/** Update update update */
router.put('/:id',validateActionId, validateAction, (req, res) => {
  actionDb.update(req.params.id,req.body).then(count=>{
    actionDb.get(req.params.id).then(uPost=>{
      res.status(201).json(uPost);
    })
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Error updating post"});
  })
});

// custom middleware

function validateActionId(req, res, next) {
  actionDb.get(req.params.id).then(post=>{
    post?next():res.status(400).json({ message: "invalid post id" });
  })
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
