// home 路由器： routes/modules/home.js

const express = require('express')
const router = express.Router()
const Link = require('../../models/link')
const shortenLink = require("../../utils/getRandom")

//route setting
router.get('/', (req,res) =>{
  res.render('index')
})







// 匯出路由模組
module.exports = router