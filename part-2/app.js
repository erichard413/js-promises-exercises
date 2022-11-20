let deckId
let newDeckURL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
let gimmeCardBtn = document.getElementById('getCard')
let cardsDiv = document.getElementById('cards')
let drawCardURL

gimmeCardBtn.addEventListener("click", function(e){
    e.preventDefault()
    axios.get(`${drawCardURL}`)
        .then(res => {
            if (res.data.remaining == 0) {
                gimmeCardBtn.remove()
            }
            cardimg = document.createElement("img")
            cardimg.src = `${res.data.cards[0].image}`
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            cardimg.style.transform= `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
            cardsDiv.append(cardimg)
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
})

window.onload = function(){ 
    axios.get(`${newDeckURL}`)
    .then(res => {
        deckId = res.data.deck_id
        drawCardURL = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        console.log(res)
        return drawCardURL
    })
    .catch(err => {
        console.log(err)
    }) 
}



// axios.get(`${newDeckURL}`)
//     .then(res => {
//         deckId = res.data.deck_id
//         let drawCardURL = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
//         console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
//         return axios.get(drawCardURL)
//     })
//     .then(res => {
//         console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
//     })
//     .catch(err => {
//         console.log(err)
//     }) 


