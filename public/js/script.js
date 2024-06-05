const hamsterLoading = document.querySelector('.hamster-loading');
const astronautLoading = document.querySelector('.astronaut-loading');

const headerBackground = document.getElementById('header-background');
const header = document.getElementsByTagName('header')[0];
const mainContent = document.querySelector('.main-content');
const topAnimeList = document.getElementById('top-anime-list');
const animeSearchForm = document.getElementById('anime-search-form');
const animeResults = document.getElementById('anime-results');


document.addEventListener('DOMContentLoaded', () => {
    headerBG();
    getTopAnime();
    animeSearchForm.addEventListener('submit', searchAnime);
    globalChat();
});

async function headerBG(){
    try {
        const response = await fetch('https://api.nekosapi.com/v3/images/random');
        if (!response.ok) {
            throw new Error("No Image Found");
        }

        const data = await response.json();
        
        const imageUrl = data.items[0].image_url;

        headerBackground.style.backgroundImage = `url(${imageUrl})`;
        headerBackground.style.backgroundSize = 'cover';
        headerBackground.style.backgroundPosition = 'center';

        // hamsterLoading.style.display = 'none';
        // header.style.display = 'block';
    } 
    
    catch (error) {
        console.error('Error fetching background image:', error);
    }
}

async function getTopAnime(){
    try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime');
        if (!response.ok) {
            throw new Error("Anime Not Found");
        }

        const data = await response.json();

        const topAnime = data.data.slice(0, 5);

        topAnime.forEach(anime => {
            const animeLink = document.createElement('a');
            animeLink.href = anime.url;
            animeLink.target = '_blank';
            animeLink.rel = 'noreferrer';
            animeLink.textContent = anime.title;
            topAnimeList.appendChild(animeLink);
        });

        hamsterLoading.style.display = 'none';
        mainContent.style.display = 'block';
        header.style.display = 'block';

    } catch (error) {
        console.error('Error fetching top anime:', error);
    }
};

async function searchAnime(e) {
    e.preventDefault();

    try {
        const animeName = document.getElementById('search-field').value;


        animeResults.innerHTML = '';
        astronautLoading.style.display = 'block';

        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}&sfw`);
        if (!response.ok) {
            throw new Error("Anime Not Found");
        }

        const data = await response.json();
        
        astronautLoading.style.display = 'none';

        // Clear previous search results
        animeResults.innerHTML = '';

        data.data.forEach(anime => {
            // Create container for each anime
            const animeContainer = document.createElement('div');
            animeContainer.classList.add('anime-container');

            // Create image element
            const imgElement = document.createElement('img');
            imgElement.src = anime.images.jpg.large_image_url;
            imgElement.alt = anime.title;

            // Create title element
            const titleElement = document.createElement('h2');
            titleElement.textContent = anime.title;

            // Create link element
            const animeLink = document.createElement('a');
            animeLink.href = anime.url;
            animeLink.target = '_blank';
            animeLink.rel = 'noreferrer';

            // Append elements to anime container
            animeLink.appendChild(imgElement);
            animeLink.appendChild(titleElement);

            animeContainer.appendChild(animeLink);

            // Append anime container to the main container
            animeResults.appendChild(animeContainer);
        });

    } catch (error) {
        console.error('Error searching anime:', error);
    }
}

function globalChat(){
    const chatButton = document.getElementById('chat-button');
    const chatCard = document.querySelector('.chat-card');
    
    chatButton.addEventListener('click', () => {
        chatCard.style.display = chatCard.style.display === 'block' ? 'none' : 'block';
      });
}
