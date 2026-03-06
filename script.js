document.addEventListener("DOMContentLoaded", () => {

    const API_KEY = "e7e39979cf9240378d334208a33ff014"

    let cards_container = document.querySelector(".cards-container")

    async function translateText(safeText) {
        let email = "bor.zdorovets28@gmail.com"
        const url = `https://api.mymemory.translated.net/get?q=${safeText}&langpair=en|uk&de=${email}`;
        let response = await fetch(url)
        let data = await response.json()
        return data.responseData.translatedText
    } 

    async function LoadCards() {
        
        const url = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=2`
        let response = await fetch(url)
        let data = await response.json()
        console.log(response)
        for (let i = 0; i < data.recipes.length; i++) {
            let translatedsummary = await translateText(data.recipes[i].summary)
            cards_container.innerHTML += `
            <div class="card">
                <img src="${data.recipes[i].image}" alt="${data.recipes[i].title}">
                <h2>${data.recipes[i].title}</h2>
                <p>${translatedsummary.slice(0, 400)}...</p>
                <button class="button">Show more</button>
            </div>`

        }
        
    }

LoadCards()

});