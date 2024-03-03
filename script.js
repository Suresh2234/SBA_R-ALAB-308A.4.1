const baseURL = 'https://api.thecatapi.com/v1';

async function initialLoad() {
    const breedSelect = document.getElementById('breedSelect');

    try {
        const response = await fetch(`${baseURL}/breeds`);
        const data = await response.json();

        data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });

        breedSelect.addEventListener('change', breedSelectHandler);
    } catch (error) {
        console.error('Error loading breeds:', error);
    }
}

async function breedSelectHandler() {
    const selectedBreedId = this.value;
    const carousel = document.getElementById('carousel');
    const infoDump = document.getElementById('infoDump');
    carousel.innerHTML = '';
    infoDump.innerHTML = '';

    try {
        const response = await fetch(`${baseURL}/images/search?breed_ids=${selectedBreedId}&limit=5`);
        const data = await response.json();

        data.forEach(cat => {
            const img = document.createElement('img');
            img.src = cat.url;
            carousel.appendChild(img);
        });

        const responseBreed = await fetch(`${baseURL}/breeds/${selectedBreedId}`);
        const breedInfo = await responseBreed.json();

        const infoHeader = document.createElement('h2');
        infoHeader.textContent = `Breed Info: ${breedInfo.name}`;
        infoDump.appendChild(infoHeader);

        const infoList = document.createElement('ul');
        const temperamentItem = document.createElement('li');
        temperamentItem.textContent = `Temperament: ${breedInfo.temperament}`;
        infoList.appendChild(temperamentItem);

        const originItem = document.createElement('li');
        originItem.textContent = `Origin: ${breedInfo.origin}`;
        infoList.appendChild(originItem);

        infoDump.appendChild(infoList);
    } catch (error) {
        console.error('Error fetching breed information:', error);
    }
}

document.getElementById('getFavouritesBtn').addEventListener('click', getFavourites);

async function getFavourites() {
    const carousel = document.getElementById('carousel');
    const infoDump = document.getElementById('infoDump');
    carousel.innerHTML = '';
    infoDump.innerHTML = '';

    try {
        const response = await fetch(`${baseURL}/favourites`);
        const data = await response.json();

        data.forEach(favourite => {
            const img = document.createElement('img');
            img.src = favourite.image.url;
            carousel.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching favourites:', error);
    }
}

initialLoad();

