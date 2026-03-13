document.addEventListener("DOMContentLoaded", () => {

    const API_KEY = "e7e39979cf9240378d334208a33ff014"

    let cards_container = document.querySelector(".cards-container")
    let recept_info = document.querySelector(".recept-info")


    async function fetchRecipes() {

        const url = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=2`
        let response = await fetch(url)
        let data = await response.json()
        if (data.code == "402") {
            alert("API key limit reached. Please try again later.")
            return []
        return data.recipes.length        
        
        }
    
    }

    data = fetchRecipes()



    async function translateText(safeText) {
        let email = "bor.zdorovets28@gmail.com"
        const url = `https://api.mymemory.translated.net/get?q=${safeText}&langpair=en|uk&de=${email}`;
        let response = await fetch(url)
        let data = await response.json()
        return data.responseData.translatedText
    } 

    async function LoadCards() {
        console.log(data)
        for (let i = 0; i < data; i++) {
            let translatedsummary = await translateText(data[i].summary)
            cards_container.innerHTML += `
            <div class="card">
                <img src="${data[i].image}" alt="${data[i].title}">
                <h2>${data[i].title}</h2>
                <p>${translatedsummary.slice(0, 400)}...</p>
                <button class="button">Show more</button>
            </div>`

            buuton = cards_container.querySelectorAll(".button")
            for (let j = 0; j < buuton.length; j++) {
                buuton[j].addEventListener("click", () => {
                cards_container.classList.add("hide")
                recept_info.classList.remove("hide")
                recept_info.innerHTML = `<div class="recept-card">
                    <img src="${data[i].image}" alt="${data[i].title}">
                    <h2>${data[i].title}</h2>
                    <p>${translatedsummary}</p>
                    <button class="back-button">Back</button>
                    </div>`
                })
            }
        }
    }

LoadCards()

});