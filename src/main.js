import { API_KEY } from './apiKey.js';
const URL = `https://api.themoviedb.org/3/`;
const api = axios.create({
    baseURL: `${URL}`,
    params: {
        api_key: API_KEY,
    }
});

const getMovie = (movies, sectionPreview) => {
    sectionPreview.innerHTML = '';
    movies.forEach(movie => {
        const movieContainer = document.createElement('picture');
        const movieElement = document.createElement('img');
        const { title, poster_path, id } = movie;
        movieContainer.classList.add('movies__movie-container');
        movieElement.classList.add('movie__img');
        movieElement.setAttribute('alt', title);
        movieElement.setAttribute('src', `https://image.tmdb.org/t/p/w300${poster_path}`);
        movieContainer.appendChild(movieElement);
        sectionPreview.appendChild(movieContainer);
        sectionPreview.scrollTo(0, 0);
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${id}`;
        })
    });
}

const getCategory = (categories, sectionPreview) => {  
    sectionPreview.innerHTML = '';  
    categories.forEach(category => {
        const categoryElement = document.createElement('p');
        const { name, id } = category;
        const newName = name.split(' ').join('+');
        categoryElement.classList.add('category__container');
        const categoryText = document.createTextNode(name); 
        categoryElement.appendChild(categoryText);
        sectionPreview.appendChild(categoryElement);
        categoryElement.addEventListener('click', () => {
            location.hash = `#category=${id}-${newName}`;
            headerTittleCategory.textContent = name;
        });
    });
}


async function getTrendingMovies() {
    // FETCH: 
    // const res = await fetch(`${URL}trending/movie/day?api_key=${API_KEY}`);
    // const data = await res.json();

    // AXIOS:
    const { data, status } = await api(`trending/movie/day`);
    const movies = data.results;
    bodyBackgroundImage.style.background = '';
    getMovie(movies, trendsMovies);

};

async function getCategories() {
    // FETCH:
    // const res = await fetch(`${URL}genre/movie/list?api_key=${API_KEY}&language=en-US`);
    // const data = await res.json();

    // AXIOS:
    const { data, status } = await api(`genre/movie/list`);
    const categories = data.genres;
    bodyBackgroundImage.style.background = '';
    getCategory(categories, categoriesList);
}

async function getUpcomingMovies() {
    // FETCH:
    // const res = await fetch(`${URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
    // const data = await res.json();

    // AXIOS:
    const { data, status } = await api(`movie/upcoming`);
    const movies = data.results;
    bodyBackgroundImage.style.background = '';
    getMovie(movies, upcomingMovies);
}

async function getMoviesByCategory(id) {
    const {data, status} = await api(`discover/movie`, {
        params: {
            with_genres: id
        }
    });
    const movies = data.results;
    bodyBackgroundImage.style.background = '';
    getMovie(movies, genericListSection);
}

async function getMoviesBySearch(query) {
    const {data, status} = await api(`search/movie`, {
        params: {
            query
        },
    });
    const movies = data.results;
    bodyBackgroundImage.style.background = '';
    getMovie(movies, genericListSection);
}

async function getAllTrendingMovies() {
    // FETCH: 
    // const res = await fetch(`${URL}trending/movie/day?api_key=${API_KEY}`);
    // const data = await res.json();

    // AXIOS:
    const { data, status } = await api(`trending/movie/day`);
    const movies = data.results;
    bodyBackgroundImage.style.background = '';
    getMovie(movies, genericListSection);
};

async function getMovieDetail(movieId) {
    const { data : movie, status } = await api(`movie/${movieId}`);
    const { title, overview, poster_path, adult, vote_average, genres } = movie;
    const movieBackground = `https://image.tmdb.org/t/p/w500${poster_path}`;
    bodyBackgroundImage.style.background = `
        linear-gradient(
            180deg, 
            rgba(0, 0, 0, 0.35) 19.27%, 
            rgba(0, 0, 0, 0) 29.17%
        ),
        url(${movieBackground})`;
    bodyBackgroundImage.style.backgroundSize = 'cover';
    bodyBackgroundImage.style.backgroundPosition = 'center';
    bodyBackgroundImage.style.backgroundRepeat = 'no-repeat';
    bodyBackgroundImage.style.backgroundAttachment = 'fixed';
    movieTittle.textContent = title;
    movieOverview.textContent = overview;
    getCategory(genres, categoriesContainer);

    ageRangeContainer.innerHTML = '';
    ratingContainer.innerHTML = '';
    
    adult ? generateDetail(ageRangeContainer, 'ageRange__tittle', '18+') : generateDetail(ageRangeContainer, 'ageRange__tittle', '0+');

    generateDetail(ratingContainer, 'rating__tittle', vote_average);
    getRelatedMoviesById(movieId);

}

function generateDetail(sectionPreview, classStyle, text) {
    const detailTittle = document.createElement('p');
    detailTittle.classList.add(classStyle);
    detailTittle.textContent = text;
    sectionPreview.appendChild(detailTittle);
}

async function getRelatedMoviesById(id) {
    const { data, status } = await api(`/movie/${id}/similar`)
    const relatedMovies = data.results;

    getMovie(relatedMovies, relatedMoviesContainer);
}
export { getTrendingMovies, getUpcomingMovies, getCategories, getMoviesBySearch, getAllTrendingMovies, getMoviesByCategory, getMovieDetail };