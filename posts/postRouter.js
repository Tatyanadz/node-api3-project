const express = require('express');
const posts = require("./postDb")

const router = express.Router();


router.get('/', (req, res, next) => {
  posts
    .get()
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      next(err)
    })
});

router.get('/:id',validatePostId(), (req, res, next) => {
  posts
    .getById(req.params.id)
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      next(err)
    })
});

router.delete('/:id', validatePostId(), (req, res, next) => {
  posts 
    .remove(req.params.id)
    .then(response => {
      res.status(200).json({
        message: "Post has been deleted"
      })
    })
    .catch(err => {
      next(err)
    })
});

router.put('/:id', validatePostId(), (req, res, next) => {
  posts
    .update(req.params.id, req.text)
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      next(err)
    })
});

// custom middleware

function validatePostId() {
  return (req, res, next) => {
    posts
      .getById(req.params.id)
      .then(post => {
        if (post) {
          req.post = post
          next()
        } else {
          res.status(400).json({ message: "Could not find post ID"})
        }
      })
      .catch(err => 
        res.status(500).json({
          message: "Error getting post with this ID"
        })
      )
  }
}

module.exports = router;
