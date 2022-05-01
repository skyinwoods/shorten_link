// Include express from node_modules
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const app = express()
const Link = require('./models/link')
const shortenLink = require("./utils/getRandom") 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

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


// 資料庫連線狀態
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//route setting
app.get('/', (req,res) =>{
  res.render('index')
})


app.post('/', (req, res) => {
  const url = req.body.url
  const newLink = shortenLink(5)
  console.log(newLink)
  console.log(url)
  // 使用者輸入為空白則為 error
  if (url == ''){
    let errMsg = "Invalid input!"
    res.render('error', {errMsg})
  }
  
  Link.findOne({ origin_link: url})
    .then((data) => {
      if(data){
        // 如果輸入相同網址，會回傳之前做過的網址
        console.log('URL exists')
        res.render('index', {
        new_link: data.new_link})
      }else{
        console.log('URL not exists')
        Link.create({origin_link: url, new_link:  newLink})
        .then(() => res.render('index', {
            origin_link: url,
            new_link: newLink}))
         .catch(error => console.log(error)) 
        
      }
    })
    .catch(error => console.log(error)) 
 
})

app.get('/:shortenlink', (req,res)=>{
  const shortenLink = req.params.shortenlink
  Link.findOne({new_link: shortenLink})
    .lean()
    .then((data) => {
      if (!data){
        let errMsg = "Can't find the URI!"
        res.render('error', {errMsg})
      }
      res.redirect(data.origin_link)
    })
    .catch(error => console.log(error)) 
})


//Start and listen the server 
app.listen(port, () =>{
  console.log(`Express is running on http://localhost:${port}`)
})