import { getTrendingMovies, getUpcomingMovies, getCategories, getMoviesBySearch, getAllTrendingMovies, getMoviesByCategory, getMovieDetail } from './main.js';

searchButton.addEventListener('click', event =>  {
    const query = searchInput.value;
    const queryFormatted = query.split(' ').join('+');
    query !== '' ? location.hash = `#search=${queryFormatted}` : event.preventDefault();
});

arrowBack.addEventListener('click', () =>  {
    document.domain !== '127.0.0.1' ? location.hash = '#home' : history.back();
});

trendingButton.addEventListener('click', () =>  location.hash = '#trends');

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    location.hash.startsWith('#trends')    ? trendsPage()       :
    location.hash.startsWith('#search=')   ? searchPage()       :
    location.hash.startsWith('#movie=')    ? movieDetailsPage() :
    location.hash.startsWith('#category=') ? categoriesPage()   :
    homePage()
};

function trendsPage() {    
    window.scrollTo(0, 0);

    headerTittleCategory.innerHTML = 'Trending';
    headerArrow.classList.remove('fixed');
    bodyBackgroundImage.classList.remove('bodyImage');
    headerArrow.classList.remove('inactive');
    genericListSection.classList.remove('inactive');
    headerTittleCategory.classList.remove('inactive');
    

    headerSearch.classList.add('inactive');
    headerWelcome.classList.add('inactive');
    trendingSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    movieDetailsSection.classList.add('inactive');
    footerSection.classList.add('inactive');

    getAllTrendingMovies();
}

function searchPage() {
    window.scrollTo(0, 0);

    headerArrow.classList.remove('fixed');
    bodyBackgroundImage.classList.remove('bodyImage');
    headerArrow.classList.remove('inactive');
    genericListSection.classList.remove('inactive');
    headerSearch.classList.remove('inactive');
    
    headerTittleCategory.classList.add('inactive');
    headerWelcome.classList.add('inactive');
    trendingSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    movieDetailsSection.classList.add('inactive');
    footerSection.classList.add('inactive');
    const query = location.hash.split("=")[1];
    const newQuery = query.split('+').join(' ');
    getMoviesBySearch(newQuery);
}

function movieDetailsPage() {
    window.scrollTo(0, 0);

    headerArrow.classList.remove('inactive');
    movieDetailsSection.classList.remove('inactive');

    headerArrow.classList.add('fixed');
    headerTittleCategory.classList.add('inactive');
    headerWelcome.classList.add('inactive');
    headerSearch.classList.add('inactive');
    trendingSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    genericListSection.classList.add('inactive');
    footerSection.classList.add('inactive');
    
    const movieId = location.hash.split("=")[1];
    getMovieDetail(movieId);
    
}

function categoriesPage() {
    window.scrollTo(0, 0);
    
    headerArrow.classList.remove('fixed');
    bodyBackgroundImage.classList.remove('bodyImage');
    headerArrow.classList.remove('inactive');
    headerTittleCategory.classList.remove('inactive');
    genericListSection.classList.remove('inactive');
    
    headerWelcome.classList.add('inactive');
    headerSearch.classList.add('inactive');
    trendingSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    movieDetailsSection.classList.add('inactive');
    footerSection.classList.add('inactive');

    const id = location.hash.split("=")[1].split('-')[0];
    getMoviesByCategory(id);    
}

function homePage() {
    window.scrollTo(0, 0);

    bodyBackgroundImage.classList.remove('bodyImage');
    headerWelcome.classList.remove('inactive');
    headerSearch.classList.remove('inactive');
    trendingSection.classList.remove('inactive');
    categoriesSection.classList.remove('inactive');
    upcomingSection.classList.remove('inactive');
    footerSection.classList.remove('inactive');

    headerArrow.classList.add('inactive');
    headerTittleCategory.classList.add('inactive');
    genericListSection.classList.add('inactive');
    movieDetailsSection.classList.add('inactive');
    getTrendingMovies();    
    getUpcomingMovies();
    getCategories();
}



