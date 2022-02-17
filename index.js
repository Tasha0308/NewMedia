const url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f75fc51530ca67e526e19d565252db66";


getPosters(url);

async function getPosters(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const respData = await resp.json();
    showPosters(respData);
   /*console.log(respData);*/
    
}

function getClassByRate(e) {
    if(e > 7.5) {
        return "green";
    } else if (e > 5.5) {
        return "orange";
    } else {
        return "red";
    }
}


function showPosters(data) {
    const posters = document.querySelector(".posters");
    
    // Очищаем предыдущие фильмы
    document.querySelector(".posters").innerHTML = "";


    data.results.forEach(poster => {
        const posterEl = document.createElement("div")
        posterEl.classList.add("poster")
        posterEl.innerHTML = `
           <div class="poster-inner">
            <img src="https://image.tmdb.org/t/p/w1280${poster.poster_path}" alt="${poster.title}" class="poster-cover">
           </div>
          
          <div class="poster-info">
           <div class="poster-title">${poster.title}</div>
           <div class="poster-rating rating-average--${getClassByRate(poster.vote_average)}">${poster.vote_average}</div>
           <p class="poster-about"> Overview </p>
           <p class="poster-overview">${poster.overview}</p>
          </div>
       `;
       posters.appendChild(posterEl)
       

    });
 }

const form = document.querySelector("form");
const search = document.querySelector(".search");


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${search.value}&api_key=f75fc51530ca67e526e19d565252db66`;
    if(search.value) {
        getPosters(searchUrl);
       
        
        /*search.value = "";*/
    
    }
})

// Информация о фильме - не работает

/*const posterAbout = document.querySelector('.poster-about');
const posterOverview = document.querySelector('.poster-overview');

posterAbout.addEventListener('click', (e) => {
   alert("asasd");
  
}
)*/




/*document.posterOverview.classList.add('adsad');*/


// Очистка поиска

const searchClever = document.querySelector('.search-clever');

searchClever.addEventListener('click', (e) => {
    search.value = "";
})



