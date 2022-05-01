const mongoose = require('mongoose') // 載入 mongoose
const Link = require('../link')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 資料庫連線狀態
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++){
    Link.create({origin_link: `origin_link-${i}`, new_link: `new_link-${i}`})
  }
})