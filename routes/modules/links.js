const express = require('express')
const router = express.Router()
const Link = require('../../models/link')

router.get('/:shortenlink', (req,res)=>{
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



// 匯出路由模組
module.exports = router