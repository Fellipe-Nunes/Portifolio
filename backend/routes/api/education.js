const express = require('express');
const Profile = require('../../models/profile');
const User = require('../../models/user');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleaware/auth')


// @route    POST /education
// @desc     CREATE education
// @access   Private
router.post('/', auth, async (req, res, next) => {
  try {

    const id = req.user.id
    const profile = await Profile.findOneAndUpdate({ user: id }, { $push: { education: req.body } }, { new: true })
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

// @route    DELETE /education
// @desc     DELETE education
// @access   Private
router.delete('/', auth, async (req, res, next) => {
  try {
    const id = req.user.id
    const profile = await Profile.findOneAndUpdate({ user: id }, { $pull: { education: req.body } }, { new: true })
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

module.exports = router;