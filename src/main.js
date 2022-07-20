import { API_KEY } from './apiKey.js';
const URL = `https://api.themoviedb.org/3/`;
const api = axios.create({
    baseURL: `${URL}`,
    params: {
        api_key: API_KEY,
        language: 'en-US'
    }
});


async function getTrendingMovies() {
    // FETCH: 
    // const res = await fetch(`${URL}trending/movie/day?api_key=${API_KEY}`);
    // const data = await res.json();

    // AXIOS:
    const { data, status } = await api(`trending/movie/day`);
    const movies = data.results;

    movies.forEach(movie => {
        const trendsMovies = document.querySelector('#trendingPreview .trends__movies');
        const movieContainer = document.createElement('picture');
        const movieElement = document.createElement('img');
        const { title, poster_path } = movie;
        movieContainer.classList.add('movies__movie-container');
        movieElement.classList.add('movie__img');
        movieElement.setAttribute('alt', title);
        movieElement.setAttribute('src', `https://image.tmdb.org/t/p/w300${poster_path}`);
        movieContainer.appendChild(movieElement);
        trendsMovies.appendChild(movieContainer);
    });

};

async function getCategories() {
    // FETCH:
    // const res = await fetch(`${URL}genre/movie/list?api_key=${API_KEY}&language=en-US`);
    // const data = await res.json();

    // AXIOS:
    const { data, status } = await api(`genre/movie/list`);
    const categories = data.genres;

    categories.forEach(category => {
        const categoriesList = document.querySelector('#categoriesPreview .categories__list');
        const categoryContainer = document.createElement('div');
        const categoryElement = document.createElement('h3');
        const { name } = category;
        categoryContainer.classList.add('category__container');
        categoryElement.classList.add('category__tittle');
        const categoryText = document.createTextNode(name); 
        categoryElement.appendChild(categoryText);
        categoryContainer.appendChild(categoryElement);
        categoriesList.appendChild(categoryContainer);
    }
    );
}

async function getUpcomingMovies() {
    // FETCH:
    // const res = await fetch(`${URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
    // const data = await res.json();

    // AXIOS:
    const { data, status } = await api(`movie/upcoming`);
    const movies = data.results;

    movies.forEach(movie => {
        const trendsMovies = document.querySelector('#upcomingPreview .trends__movies');
        const movieContainer = document.createElement('picture');
        const movieElement = document.createElement('img');
        const { title, poster_path } = movie;
        movieContainer.classList.add('movies__movie-container');
        movieElement.classList.add('movie__img');
        movieElement.setAttribute('alt', title);
        movieElement.setAttribute('src', `https://image.tmdb.org/t/p/w300${poster_path}`);
        movieContainer.appendChild(movieElement);
        trendsMovies.appendChild(movieContainer);
    }
    );
}

export { getTrendingMovies, getUpcomingMovies, getCategories };