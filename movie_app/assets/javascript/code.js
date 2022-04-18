//using TMDB api
const apikey="api_key=c0e96bca5a483d30b686845c433e45d4"; 
const baseurl="https://api.themoviedb.org/3";
const apiurl=baseurl+"/discover/movie?sort_by=popularity.desc&"+apikey;
const imageurl="https://image.tmdb.org/t/p/w500";
const searchurl=baseurl+"/search/movie?"+apikey;
const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');

getmovies(apiurl);

function getmovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results);
        showMovie(data.results);
    })
}

function showMovie(data){
    main.innerHTML='';
    data.forEach(movie => {
        const{title,poster_path,vote_average,overview}=movie;  //object destructuring
        const movieel=document.createElement("div");
        movieel.classList.add('movie');
        movieel.innerHTML=`
        <img src="${imageurl+poster_path}" alt="${title}">
        <div class="movieinfo">
            <h3>${title}</h3>
            <span class="${getcolor(vote_average)}">${vote_average}
            </span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>`
        main.appendChild(movieel);
    })
}

function getcolor(vote){
    if(vote>=8){
        return 'green';
    }
    else if(vote>=5){
        return 'orange';
    }
    else{
        return 'red';
    }
}

form.addEventListener('keypress', (e) => {
    if(e.key === 'Enter')
    {
        const searchTerm = search.value;
        if(searchTerm) {
            console.log('object');
            getmovies(searchurl+'&query='+searchTerm)
        }
        else{
            getmovies(apiurl);
    }
}
})