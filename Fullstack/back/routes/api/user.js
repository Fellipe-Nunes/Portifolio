const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const User = require('../../models/user')

router.get('/', async(req, res, next) =>{
    try{
      const user = await User.find({})
      res.json(user)
    }catch(err){
      console.error(err.message)
      res.status(500).send({"error":"Server error"})
    }
})


router.get('/:email', [],async(req, res, next) => {
   try{

    let email_param = req.params["email"]
    const user = await User.findOne({email: email_param})
    if(user){
      res.json(user)
    }else{
      res.status(404).send({"error":"User not found"})
    }
   }catch(err){
      console.error(err.message)
      res.status(500).send({"error":"Server"})
   }
})


router.post('/', [
  check('nome').not().isEmpty(),
  check('telefone').not().isEmpty(),
  check('email', 'email not valid').isEmail(),
  check('endereco').not().isEmpty(),
  check('descricao').not().isEmpty()
], async(req, res, next) =>{
    try{
      let {nome, telefone, email, endereco, descricao} = req.body

      const errors = validationResult(req)
      
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
      }else{
        let usuario = new User({nome, telefone, email, endereco, descricao})

        await usuario.save()

        if(usuario.id){
          res.json(usuario)
        }
      }
    }catch(err){
      console.log(err.message)
      res.status(500).send({"error": "Server Error"})
    }
})


module.exports = router