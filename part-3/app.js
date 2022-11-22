let pokeBtn = document.getElementById("pokeBtn")
let allPokeURL = "https://pokeapi.co/api/v2/pokemon?limit=1000"
let getPokeURL = "https://pokeapi.co/api/v2/pokemon/"
let pokemonResults = document.getElementById("pokemon")


pokeBtn.addEventListener("click", function(e) {
    e.preventDefault()
        getPokemon()
    }
)

function makeUI(name, imgSrc, description) {
    let pokeDiv = document.createElement("div")
    pokeDiv.classList.add("pokeDiv")
    let pokeName = document.createElement("p")
    pokeName.classList.add("pokeName")
    pokeName.innerText = name
    let pokeSprite = document.createElement("img")
    pokeSprite.src = imgSrc
    pokeDiv.append(pokeName)
    pokeDiv.append(pokeSprite)
    let pokeText = document.createElement("p")
    pokeText.innerText = description
    pokeDiv.append(pokeText)
    pokemonResults.append(pokeDiv)
}

function getPokemon(){
    let pokeURLs = []
    let namesAndImages = [];
    axios.get(`${allPokeURL}`)
    .then(res => {
        for (i = 0; i<3; i++){
            let pokeIdx = Math.floor(Math.random() * res.data.results.length)
            let url = res.data.results.splice(pokeIdx, 1)[0].url;
            pokeURLs.push(url)
        }
    return Promise.all(pokeURLs.map(url => axios.get(`${url}`)));    
    })
    .then(pokemonRes => {
        namesAndImages = pokemonRes.map(p => ({
            name : p.data.name,
            img : p.data.sprites.front_default,
        }
        ));
        return Promise.all(pokemonRes.map(p => axios.get(`${p.data.species.url}`)));
    })
    .then(speciesData => {
        speciesData.forEach((d, i) => {
            console.log(d, i)
            let descriptionObj = d.data.flavor_text_entries.find(function(entry) {
                return entry.language.name === "en";
            });
            let description = descriptionObj ? descriptionObj.flavor_text : "";
            let { name, img } = namesAndImages[i];
            makeUI(name, img, description)
        })
     })
    .catch(err=> {
        console.log("FAIL", err)
    })
}






