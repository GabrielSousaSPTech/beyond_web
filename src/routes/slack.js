var express = require('express')
var router = express.Router()
var slackController = require('../controllers/slackController')

router.get('/:idEmpresa', function(req, res){
    slackController.selectStatusSlack(req, res)
})

router.put('/:idEmpresa', function(req, res){
    slackController.updateStatusSlack(req, res)
})

router.get('/canal/:idEmpresa', function(req, res){
    slackController.selectByIdSlack(req, res)
})

router.put('/canal/:idEmpresa', function(req, res){
    slackController.updateByIdSlack(req, res)
})

module.exports = router