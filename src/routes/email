var express = require('express')
var router = express.Router()
var emailController = require("../controllers/emailController");
router.post("/", function(req, res){
    emailController.sendEmail(req, res);
})

module.exports = router