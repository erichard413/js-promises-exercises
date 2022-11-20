// Part 1: Number Facts
// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

// Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

// (Note: You’ll need to make multiple requests for this.)

let numInput = document.querySelector('#favNum')
let btn = document.querySelector('#button')
let results = document.querySelector('.results')
let resDiv = document.querySelector('.res-div')
function make_li(res) {
        if (Object.keys(res.data).length > 1) {
            for (let i of Object.keys(res.data)) {
            newLi = document.createElement('li')
            console.log(i)
            newLi.innerText = res.data[`${i}`]
            results.append(newLi)
            }
        } else {
            newLi = document.createElement('li')
            newLi.innerText = res.data.text
            results.append(newLi)
        }
        
    }
// function make_li(res) {
//     for (let i in res.data) {
//         newLi = document.createElement('li')
//         newLi.innerText = res.data.text
//         results.append(newLi)   
//     }}


// btn.addEventListener("click", function(e) {
//     e.preventDefault()
//     let favNum = numInput.value
//     let baseURL = `http://numbersapi.com/${favNum}?json`
//     console.log(baseURL)
//     axios.get(`${baseURL}`)
//     .then (res => {
//         console.log(res.data)
//         make_li(res)
//         return axios.get(`${baseURL}`)
//     })
//     .then (res => {
//         make_li(res)
//         return axios.get(`${baseURL}`)
//     })
//     .then (res => {
//         make_li(res)
//         return axios.get(`${baseURL}`)
//     })
//     .then (res => {
//         make_li(res)
//         return axios.get(`${baseURL}`)
//     })
//     .catch(err => {
//         resDiv.append("Error, bad request")
//         console.log(`ERROR ${err}`)
//     })
//     })

    // ################# Using Promise.all#######################



btn.addEventListener("click", function(e) {
    e.preventDefault()
    let favNum = numInput.value
    let baseURL = `http://numbersapi.com/${favNum}?json`
    
    let factsArr = []
    let url = "http://numbersapi.com/"

    for (let i = 1; i <5; i++) {
    factsArr.push(
        axios.get(`${baseURL}`)
    )}

    Promise.all(factsArr)
        .then(arr => (
        arr.forEach(p => make_li(p))
        ))
        .catch(err => console.log(err));
})



