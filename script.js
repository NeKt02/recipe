document.addEventListener("DOMContentLoaded", () => {

    let cards_container = document.querySelector(".cards-container")
    async function LoadCards() {
        
        const url = 'https://api.spoonacular.com/recipes/random?apiKey=b587715be60e4e58a50b637037458d1e&number=2'
        let response = await fetch(url)
        let data = await response.json()
        console.log(response)
        cards_container.innerHTML = data.recipes
    }

LoadCards()

});