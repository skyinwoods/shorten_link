function copyClick(){
  var copyText = document.getElementById("copyBtn");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard
  .writeText(copyText.value)
  .then(() =>{
    alert('success!')
  })
  .catch(() => {
    alert('failed')
  })
}


// copy 參考網址：https://stackoverflow.com/questions/69438702/why-does-navigator-clipboard-writetext-not-copy-text-to-clipboard-if-it-is-pro