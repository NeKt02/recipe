document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "b587715be60e4e58a50b637037458d1e";

    let cards_container = document.querySelector(".cards-container");
    let recept_info = document.querySelector(".recept-info");

    async function fetchRecipes() {
        const url = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=2`;

        let response = await fetch(url);
        let data = await response.json();

        if (data.code == 402) {
            alert("API key limit reached. Please try again later.");
            return [];
        }

        return data.recipes;
    }

    async function translateText(safeText) {
        let email = "logikakyiv@gmail.com";
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(safeText)}&langpair=en|uk&de=${email}`;

        let response = await fetch(url);
        let data = await response.json();

        return data.responseData.translatedText;
    }

    async function loadJson() {
        let response = await fetch("data.json");
        let data = await response.json();
        return data.recipes;
    }



    async function LoadCards() {
        // let data = await fetchRecipes()

        let data = await loadJson()
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            data[i].translatedsummary = await translateText(data[i].summary)
            cards_container.innerHTML += `
            <div class="card">
                <img src="${data[i].image}" alt="${data[i].title}">
                <h2>${data[i].title}</h2>
                <p>${data[i].translatedsummary.slice(0, 400)}...</p>
                <button class="button">Показать</button>
            </div>`

            let button = cards_container.querySelectorAll(".button")
            for (let j = 0; j < button.length; j++) {
                button[j].addEventListener("click", () => {
                    gtag('event', 'open_button_card')
                    cards_container.classList.add("hide")
                    recept_info.classList.remove("hide")
                    recept_info.innerHTML = `<div class="recept-card">
                        <img class="card-img" src="${data[j].image}" alt="${data[j].title}">
                        <h2>${data[j].title}</h2>
                        <p>${data[j].summary}</p>
                        <button class="back-button">Назад</button>
                    </div>`
                    let card = recept_info.querySelector(".recept-card")

                    for (let k = 0; k < data[j].analyzedInstructions[0].steps.length; k++) {
                        card.innerHTML += `<div class = "step-card"></div>`
                        stepCard = card.querySelectorAll(".step-card")
                        stepCard[k].innerHTML += `<p>${data[j].analyzedInstructions[0].steps[k].step}</p>`
                        stepCard[k].innerHTML += `<div class="ingredients"></div>`
                        ingredients = card.querySelectorAll(".ingredients")
                        for (let m = 0; m < data[j].analyzedInstructions[0].steps[k].ingredients.length; m++) {
                            ingredients[k].innerHTML += `<div class = "ing-crad"></div>`
                            ingCard = ingredients[k].querySelectorAll(".ing-crad")
                            ingCard[m].innerHTML += `<img class = "ingr-img" src="https://spoonacular.com/cdn/ingredients_100x100/${data[j].analyzedInstructions[0].steps[k].ingredients[m].image}" alt="${data[j].analyzedInstructions[0].steps[k].ingredients[m].name}">`
                            ingCard[m].innerHTML += `<p> ${data[j].analyzedInstructions[0].steps[k].ingredients[m].name}</p>`
                        }
                    }

                    // Add event listener for back button
                    recept_info.querySelector(".back-button").addEventListener("click", () => {
                        recept_info.classList.add("hide")
                        cards_container.classList.remove("hide")
                    });
                })
            }
        }
    }

    LoadCards()
});