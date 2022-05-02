// home 路由器： routes/modules/home.js

const express = require('express')
const router = express.Router()
const Link = require('../../models/link')

//route setting
router.get('/', (req,res) =>{
  res.render('index')
})

router.post('/', (req, res) => {
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



// 匯出路由模組
module.exports = router