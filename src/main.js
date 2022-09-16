import { API_KEY } from './apiKey.js';

let lang = localStorage.getItem('lang');
let currentLanguage = document.querySelector(`#${lang}`) || document.querySelector('#en');
currentLanguage.setAttribute('selected', 'selected');
const URL = `https://api.themoviedb.org/3/`;
const api = axios.create({
    baseURL: `${URL}`,
    params: {
        api_key: API_KEY,
        language: lang || navigator.language, 
    }
});

function likedMoviesList() {
    const item = localStorage.getItem('likedMovies');
    if (item) {
        return JSON.parse(item);
    } else {
        return {};
    }
}

function likeMovie(movie) {
    const likedMovies = likedMoviesList();
    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined;
    } else {
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
}

let loadImage = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const image = entry.target;
            const src = image.getAttribute('data-src');
            if (src.includes(null)) {
                image.src =  '../assets/imgs/default-image.jpg';
                image.classList.add('default-image');
                return;
            }
            image.src = src;
            image.classList.add('visible');
            observer.unobserve(image);
        }
    })
}

const observer = new IntersectionObserver(loadImage);

const getMovie = (
    movies, 
    sectionPreview, 
    {
        clean = true,
        lazyLoad = true,
    } = {}
) => {
    if (clean) sectionPreview.innerHTML = '';  
    movies.forEach(movie => {
        const movieContainer = document.createElement('picture');
        const movieElement = document.createElement('img');
        const likeButton = document.createElement('button');
        const { title, poster_path, id } = movie;
        movieContainer.classList.add('movies__movie-container');
        movieElement.classList.add('movie__img');
        likeButton.classList.add('movie__like-button');
        movieElement.setAttribute('alt', title);
        if (lazyLoad) {
            movieElement.dataset.src = `https://image.tmdb.org/t/p/w300${poster_path}`;
            observer.observe(movieElement);
        } else {
            movieElement.src = `https://image.tmdb.org/t/p/w300${poster_path}`;
            movieElement.classList.add('visible');
        }
        if (likedMoviesList()[id]) likeButton.classList.add('movie__like-button--liked');
        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('movie__like-button--liked');
            likeMovie(movie);
            getFavoritesMovies();
        })
        movieContainer.appendChild(movieElement);
        movieContainer.appendChild(likeButton);
        sectionPreview.appendChild(movieContainer);
        sectionPreview.scrollTo(0, 0);
        movieElement.addEventListener('click', () => {
            location.hash = `#movie=${id}`;
        })
        observer.observe(movieElement);      
    });
}

const getCategory = (categories, sectionPreview) => {  
    sectionPreview.innerHTML = '';  
    categories.forEach(category => {
        const categoryElement = document.createElement('p');
        const { name, id } = category;
        const newName = name.split(' ').join('+');
        categoryElement.classList.add('category__tittle');
        const categoryText = document.createTextNode(name); 
        categoryElement.appendChild(categoryText);
        sectionPreview.appendChild(categoryElement);
        categoryElement.addEventListener('click', () => {
            location.hash = `#category=${id}-${newName}`;
            headerTittleCategory.textContent = name;
        });

    });
}

function getFavoritesMovies() {    
    likedSection.innerHTML = `
    <h1 class="likedSection__tittle">Favorite Movies</h1>
        <article class="liked__movies">
            <picture class="skeleton skeleton__img"></picture>
            <picture class="skeleton skeleton__img"></picture>
            <picture class="skeleton skeleton__img"></picture>
            <picture class="skeleton skeleton__img"></picture>
            <picture class="skeleton skeleton__img"></picture>
            <picture class="skeleton skeleton__img"></picture>
            <picture class="skeleton skeleton__img"></picture>
            <picture class="skeleton skeleton__img"></picture>
            <picture class="skeleton skeleton__img"></picture>
            <picture class="skeleton skeleton__img"></picture>
            <picture class="skeleton skeleton__img"></picture>
            <picture class="skeleton skeleton__img"></picture>
        </article> 
    `;    
    mainSection.appendChild(likedSection);
    bodyBackgroundImage.style.background = '';
    const likedMovies = likedMoviesList();
    const movies = Object.values(likedMovies);
    const likedArticle = document.querySelector('.liked__movies');
    getMovie(movies, likedArticle, {clean: true, lazyLoad: true});
}



async function getTrendingMovies() {
    const { data, status } = await api(`trending/movie/day`);
    const movies = data.results;
    bodyBackgroundImage.style.background = '';
    getMovie(movies, trendsMovies, {clean: true, lazyLoad: true});

};

async function getCategories() {
    const { data, status } = await api(`genre/movie/list`);
    const categories = data.genres;
    bodyBackgroundImage.style.background = '';
    getCategory(categories, categoriesList);
}

async function getUpcomingMovies() {
    const { data, status } = await api(`movie/upcoming`);
    const movies = data.results;
    bodyBackgroundImage.style.background = '';
    getMovie(movies, upcomingMovies, {clean: true, lazyLoad: true});
}

async function getMoviesByCategory(id) {
    const {data, status} = await api(`discover/movie`, {
        params: {
            with_genres: id
        }
    });
    const movies = data.results;
    maxPage = data.total_pages;
    console.log(maxPage);
    page = 1;
    bodyBackgroundImage.style.background = '';
    getMovie(movies, genericListSection, {clean: true, lazyLoad: true});
}

function getPaginatedMoviesByCategory(id) {
    return async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const isBottom = (scrollTop + clientHeight) >= (scrollHeight - 5);
        const pageIsNotMax = page < maxPage;
        if (isBottom && pageIsNotMax) {
            console.log('end scroll');  
            page++;
            const { data, status } = await api(`discover/movie`, {
                params: {
                    with_genres: id,
                    page,
                }
            });
            const movies = data.results;
            console.log('page: ' + page);  
            bodyBackgroundImage.style.background = '';
            getMovie(movies, genericListSection, {clean: false, lazyLoad: true});    
        }
    }
}

async function getMoviesBySearch(query) {
    const {data, status} = await api(`search/movie`, {
        params: {
            query
        },
    });
    const movies = data.results;
    page = 1;
    maxPage = data.total_pages;
    console.log(maxPage);
    bodyBackgroundImage.style.background = '';
    getMovie(movies, genericListSection, {clean: true, lazyLoad: true});
}

function getPaginatedMoviesBySearch(query) {
    return async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const isBottom = (scrollTop + clientHeight) >= (scrollHeight - 5);
        const pageIsNotMax = page < maxPage;
        if (isBottom && pageIsNotMax) {
            console.log('end scroll');  
            page++;
            const { data, status } = await api(`search/movie`, {
                params: {
                    query,
                    page,
                }
            });
            const movies = data.results;
            console.log('page: ' + page);  
            bodyBackgroundImage.style.background = '';
            getMovie(movies, genericListSection, {clean: false, lazyLoad: true});    
        }
    }
}


// getting all trending movies with button load more
// async function getAllTrendingMovies(page = 1) {
//     const { data, status } = await api(`trending/movie/day`, {
//         params: {
//             page,
//         }
//     });
//     const movies = data.results;
//     console.log('page: ' + page);  
//     bodyBackgroundImage.style.background = '';
//     getMovie(movies, genericListSection, {clean: page == 1, lazyLoad: true});
//     const loadMoreButton = document.createElement('button');
//     loadMoreButton.textContent = 'Load More';
//     loadMoreButton.classList.add('button__more');
//     loadMoreButton.addEventListener('click', () => {
//         loadMoreButton.style.display = 'none';
//         getAllTrendingMovies(page + 1);
//     });
//     genericListSection.appendChild(loadMoreButton);
// };


// getting all trending movies with scroll infinite

let maxPage;
async function getAllTrendingMovies() {
    const { data, status } = await api(`trending/movie/day`); 
    const movies = data.results;
    maxPage = data.total_pages;
    bodyBackgroundImage.style.background = '';
    page = 1;
    getMovie(movies, genericListSection, {clean: true, lazyLoad: true});
};

let page = 1;
async function getAllTrendingMoviesWithScroll() {  
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isBottom = (scrollTop + clientHeight) >= (scrollHeight - 5);
    const pageIsNotMax = page < maxPage;
    if (isBottom && pageIsNotMax) {
        console.log('end scroll');  
        page++;
        const { data, status } = await api(`trending/movie/day`, {
            params: {
                page,
            }
        });
        const movies = data.results;
        console.log('page: ' + page);  
        bodyBackgroundImage.style.background = '';
        getMovie(movies, genericListSection, {clean: false, lazyLoad: true});    
    }  
}


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

    getMovie(relatedMovies, relatedMoviesContainer, {clean: true, lazyLoad: true});
}


export { getTrendingMovies, getUpcomingMovies, getCategories, getMoviesBySearch, getAllTrendingMovies, getMoviesByCategory, getMovieDetail, getAllTrendingMoviesWithScroll, getPaginatedMoviesBySearch, getPaginatedMoviesByCategory, getFavoritesMovies };