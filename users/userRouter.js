const express = require('express');
const users = require("./userDb")
const posts = require("../posts/postRouter")
const postRouter = require("../posts/postRouter")

const router = express.Router();
router.use("/:id/posts", postRouter)

router.post('/', validateUser(), (req, res, next) => {
  users
    .insert(req.body)
    .then(data => res.json(data))
    .catch(err => next(err))
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res, next) => {
  const newPost = { ...req.body, user_id: req.params.id }
  posts
    .insert(newPost)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      next(err)
    })
});

router.get('/', (req, res, next) => {
  users
    .get()
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      next(err)
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.json(req.user)
});


router.get('/:id/posts', validateUserId(), (req, res, next) => {
  users
    .getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      next(err)
    })
});


router.delete('/:id', validateUserId(), (req, res, next) => {
  users
    .remove(req.params.id)
    .then(result => {
      res.json({
        message: "User succesfully deleted",
        result
      })
    })
    .catch(err => {
      next(err)
    })
});



router.put('/:id', validateUserId(), validateUser(), (req, res) => {
  users
    .update(req.params.id, req.body)
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: 'Could not update user'}))
});

//custom middleware

function validateUserId() {
  return (req, res, next) => {
    users
      .getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user
          next()
        } else {
          res.status(400).json({
            message: "Could not find user with ID"
          })
        }
      })
      .catch(err => next(err))
  }
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      res.status(404).json({ message: "Missing user data"})
    } else if (!req.body.name) {
      res.status(404).json({ message: "Missing required name field"})
    } else {
      req.user = req.body.name
      next()
    }
  }
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "Missing user data"
      })
    } else if (!req.body.text) {
      res.status(400).json({
        message: "Missing required text field"
      })
    } else {
      next()
    }
  }
}

module.exports = router;
