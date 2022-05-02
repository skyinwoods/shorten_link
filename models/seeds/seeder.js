
const Link = require('../link')

const db = require('../../config/mongoose')


db.once('open', () => {
  for (let i = 0; i < 10; i++){
    Link.create({origin_link: `origin_link-${i}`, new_link: `new_link-${i}`})
  }
})