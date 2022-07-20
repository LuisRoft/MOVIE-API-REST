import { getTrendingMovies, getUpcomingMovies, getCategories } from './main.js';

searchButton.addEventListener('click', () =>  location.hash = '#search=');
arrowBack.addEventListener('click', () =>  location.hash = '#home');
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
    console.log('trends');
    

    headerArrow.classList.remove('fixed');
    bodyBackgroundImage.classList.remove('bodyImage');
    headerArrow.classList.remove('inactive');
    genericListSection.classList.remove('inactive');
    

    headerTittleCategory.classList.add('inactive');
    headerSearch.classList.add('inactive');
    headerWelcome.classList.add('inactive');
    trendingSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    movieDetailsSection.classList.add('inactive');
    footerSection.classList.add('inactive');
}

function searchPage() {
    console.log('search');

    headerArrow.classList.remove('fixed');
    bodyBackgroundImage.classList.remove('bodyImage');
    headerArrow.classList.remove('inactive');
    headerTittleCategory.classList.remove('inactive');
    genericListSection.classList.remove('inactive');
    headerSearch.classList.remove('inactive');
    
    headerWelcome.classList.add('inactive');
    trendingSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    movieDetailsSection.classList.add('inactive');
    footerSection.classList.add('inactive');
}

function movieDetailsPage() {
    console.log('movies');
    headerArrow.classList.remove('inactive');
    movieDetailsSection.classList.remove('inactive');

    headerArrow.classList.add('fixed');
    bodyBackgroundImage.classList.add('bodyImage');
    headerTittleCategory.classList.add('inactive');
    headerWelcome.classList.add('inactive');
    headerSearch.classList.add('inactive');
    trendingSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    genericListSection.classList.add('inactive');
    footerSection.classList.add('inactive');
}

function categoriesPage() {
    console.log('categories');
    
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
}

function homePage() {
    console.log('home');

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



