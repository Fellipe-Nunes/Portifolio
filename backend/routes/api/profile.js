const express = require('express');
const Profile = require('../../models/profile');
const User = require('../../models/user');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleaware/auth')


// @route    GET /profile/me
// @desc     DETAIL profile by user authenticated
// @access   Private
router.get('/me/', auth, async (req, res, next) => {
  try {
    const id = req.user.id
    const profile = await Profile.findOne({ user: id })
    if (profile) {
      res.json(profile)
    } else {
      res.status(404).send({ "error": "user not found" })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})

// @route    GET /profile/:userId
// @desc     DETAIL profile by userId
// @access   Public
router.get('/:userId', auth, async (req, res, next) => {
  try {
    const id = req.params.userId
    const profile = await Profile.findOne({ user: id })
    if (profile) {
      res.json(profile)
    } else {
      res.status(404).send({ "error": "profile not found" })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})

// @route    GET /profile/
// @desc     get all profiles
// @access   Private
router.get('/', auth, async (req, res, next) => {
  try {
    let profiles = null
    query = {}
    for (const [key, value] of Object.entries(req.query)) {
      if (key == 'skills') {
        query[key] = { "$in": value.split(',') }
      }
      else if (key.includes('social')) {
        query[key] = { $exists: true }
      }
      else {
        query[key] = value
      }
    }
    profiles = await Profile.find(query)
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})


// @route    PATCH /profile/:profileId
// @desc     UPDATE profile
// @access   Private
router.patch('/:profileId', auth, async (req, res, next) => {
  try {
    const id = req.params.profileId
    const update = { $set: req.body }
    const profile = await Profile.findByIdAndUpdate(id, update, { new: true })
    if (profile) {
      res.send(profile)
    } else {
      res.status(404).send({ error: "Profile doesn't exist" })
    }
  }catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
});

// @route    DELETE /profile/:profileId
// @desc     DELETE profile
// @access   Private
router.delete('/:profileId', auth, async (req, res, next) => {
  try {
    const id = req.params.profileId
    const profile = await Profile.findOneAndDelete({_id : id})
    if (profile) {
      res.json(profile)
    } else {
      res.status(404).send({ "error": "profile not found" })
    }
  }catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
});

// @route    POST /profile
// @desc     CREATE profile
// @access   Public
router.post('/', auth, async (req, res, next) => {
  try {
    let { user, company, website, minibio, social, skills, education } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    } else {
      let user_model = await User.findOne({ _id: user })
      if (user_model) {
        let profile_model = await Profile.findOne({ user: user_model.id })
        if (profile_model) {
          res.status(400).send({ "error": "profile already exist" })
        }
        else{
          let profile = new Profile({ user, company, website, minibio, social, skills, education })
          await profile.save()
          if (profile.id) {
            res.json(profile);
          }
        }
      }
      else {
        res.status(404).send({ "error": "user not found" })
      }

    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})

module.exports = router;