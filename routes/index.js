// 總路由器： routes/index.js
// 引用 Express 和 Express 路由器
const express = require('express')
const router = express.Router()

// 引入 模組程式碼
const home = require('./modules/home')
//const links = require('./modules/links')

router.use('/', home)
//router.use('/:shortenlink', links)

module.exports = router