// Include express from node_modules
const express = require('express')
const app = express()
const Link = require('./models/link')
const shortenLink = require("./utils/getRandom")
// 引用路由器
const routes = require('./routes') 
require('./config/mongoose')


app. use(routes)

const port = 3000
//require express-handlebars here
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用 body-parser
app.use(bodyParser.urlencoded({extended: true}))// 用 app.use 規定每筆請求都要透過 body-parser 進行前置處理


// 樣版引擎交給 express-handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
//setting static files
app.use(express.static('public'))







app.get('/:shortenlink', (req,res)=>{
  const shortenLink = req.params.shortenlink
  Link.findOne({new_link: shortenLink})
    .lean()
    .then((data) => {
      if (!data){
        let errMsg = "Can't find the URI!"
        res.render('error', {errMsg})
      }else{
        res.redirect(data.origin_link)
      }
    })
    .catch(error => console.log(error)) 
})



//Start and listen the server 
app.listen(port, () =>{
  console.log(`Express is running on http://localhost:${port}`)
})