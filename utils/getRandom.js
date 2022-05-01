const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A','B','C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a','b','c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const digit_min = 0
const digit_max = 61

module.exports = (length) => {
  let char = ''
  for (let i = 0; i < length; i++){
    let random =  Math.floor(Math.random()*100)
    if (random > digit_max || random < digit_min){
      random = random - digit_max
    }
    char += digits[random]
  }  

  return char
}