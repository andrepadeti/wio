async function main() {
  const addSentenceButton = document.getElementById('add-sentence')
  addSentenceButton.addEventListener('click', async () => {
    // GET next sentence number
    let response = await fetch('add')
    let sentenceNumber = await response.json()
    
    let inputComment = document.getElementById(`comment${sentenceNumber}`).value
    let inputSentence = document.getElementById(`sentence${sentenceNumber}`).value
    
    let body = JSON.stringify({ sentenceNumber, inputComment, inputSentence })
    console.log(body)
    let resp = await fetch('add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body,
    })
    location.reload()
  })
}
  
document.addEventListener('DOMContentLoaded', () => {
  main()
})