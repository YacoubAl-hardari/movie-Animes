const api_url = "https://api.jikan.moe/v4/";

// define the variables 
const searchInput = document.getElementById("make-search-input");

if(searchInput != null)
{
    // addeventlistener to the search input
    searchInput.addEventListener("keyup", function () {
        // if the value is geater then 3 charts 
        if (this.value.length >= 2) 
        {
            // Call the Function that make the search 
            GetAllAnime(this.value);
    
        }
    });

}

// create the function  GetAllAnime 
async function GetAllAnime(searchValue) {
    // create the fetch api   
    const response = await fetch(`${api_url}anime?q=${searchValue}`);
    const GetAnime = await response.json();
  
    const Create_Boxes_For_Response_Data = document.querySelector("#get-result-for-search-tr-movie-active");
        // create pagination-wrap-pages  
    // const pagination_wrap_pages = document.querySelector("#pagination-wrap-pages");
    
    //create map  GetAnime.data
     GetAnime.data.map((item) => {
        // console.log(item.images.jpg.image_url);
        //append html code into Create_Boxes_For_Response_Data

        Create_Boxes_For_Response_Data.innerHTML += `
        <div class="col-xl-3 col-lg-3 col-sm-6 grid-item grid-sizer cat-two" style="max-width: 18%;">
          <div class="movie-item movie-item-three mb-50">
            <div class="movie-poster">
              <img src="${item.images.jpg.image_url}" alt="${item.title_english}">
              <ul class="overlay-btn">
                <li class="rating">
                  ${generateStarRating(item.score)}
                </li>
                <li><a href="${item.url}" target="_blank" class="popup-video btn">Watch Now</a></li>
                <li><a href="${item.url}" target="_blank" class="btn">Details</a></li>
              </ul>
            </div>
            <div class="movie-content">
              <div class="top">
                <h5 class="title"><a href="${item.url}" target="_blank">${item.title_english}</a></h5>
                <span class="date">${item.aired.prop.from.year}</span>
              </div>
              <div class="bottom">
                <ul>
                  <li><span class="quality">hd</span></li>
                  <li>
                    <span class="duration"><i class="far fa-clock"></i> ${item.duration}</span>
                    <span class="rating"><i class="fas fa-thumbs-up"></i>${item.favorites}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
      
      function generateStarRating(score) {
        const fullStars = Math.floor(score);
        const hasHalfStar = (score - fullStars) >= 0.5;
        let starRatingHTML = '';
      
        for (let i = 0; i < fullStars; i++) {
          starRatingHTML += '<i class="fas fa-star"></i>';
        }
      
        if (hasHalfStar) {
          starRatingHTML += '<i class="fas fa-star-half-alt"></i>';
        }
      
        return starRatingHTML;
      }

      
       
    //        pagination_wrap_pages.innerHTML += `
    //        <nav>
    //        <ul>
    //            <li class="active"><a href="#">1</a></li>
    //            <li><a href="#">2</a></li>
    //            <li><a href="#">3</a></li>
    //            <li><a href="#">4</a></li>
    //            <li><a href="#">Next</a></li>
    //        </ul>
    //    </nav>
    //        `;

         
    
    })

    

}



//Get The Top Anime 

async function GetTopAnime() {
    const response = await fetch(`${api_url}top/anime`);
    const result = await response.json();
    const Create_Boxes_For_Response_DataTop = document.querySelector("#top-movies-anime-section");
    
    // Iterate over the data and append the HTML code into Create_Boxes_For_Response_DataTop
  
    result.data.forEach((topAnime) => {
        const englishTitle = topAnime.titles.find((title) => title.type === "English");
        const scoreString = topAnime.favorites > 1000 ? (topAnime.favorites / 1000).toFixed(1) + "K" : topAnime.favorites.toString();
                const html = `
                    <div class="movie-item movie-item-two mb-30">
                        <div class="movie-poster">
                            <a href="${topAnime.url}"><img src="${topAnime.images.jpg.image_url}" alt="${topAnime.title_english}"></a>
                        </div>
                        <div class="movie-content">
                            <div class="rating">
                                ${generateStarRating(topAnime.score)}
                            </div>
                            <h6 class="title"><a href="${topAnime.url}" target="_blank">${topAnime.title}</a></h6>
                            <span class="rel">${topAnime.type}</span>
                            <div class="movie-content-bottom">
                                <ul>
                                    <li class="tag">
                                        <a href="#">HD</a>
                                        <a href="${topAnime.url}">${englishTitle.type}</a>
                                    </li>
                                    <li>
                                        <span class="like">${scoreString}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                Create_Boxes_For_Response_DataTop.insertAdjacentHTML('beforeend', html);

    
    });

    function generateStarRating(score) {
        const fullStars = Math.floor(score);
        const hasHalfStar = (score - fullStars) >= 0.5;
        let starRatingHTML = '';

        for (let i = 0; i < fullStars; i++) {
            starRatingHTML += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            starRatingHTML += '<i class="fas fa-star-half-alt"></i>';
        }

        return starRatingHTML;
    }

    $('.ucm-active-two').owlCarousel({
        loop: true,
        margin: 45,
        items: 5,
        autoplay: false,
        autoplayTimeout: 2500,
        autoplaySpeed: 1000,
        navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1,
                nav: false,
                margin: 30,
            },
            575: {
                items: 2,
                nav: false,
                margin: 30,
            },
            768: {
                items: 2,
                nav: false,
                margin: 30,
            },
            992: {
                items: 3,
                margin: 30,
            },
            1200: {
                items: 5
            },
        }
    });
}

GetTopAnime();


// rescent views movies  

async function RescentViews() {
    const response = await fetch(`${api_url}watch/promos/popular`);
    const result = await response.json();
    const Create_Boxes_For_Response_DataTop = document.querySelector("#movie-item-row-recent-views");
    
    // Iterate over the data and append the HTML code into Create_Boxes_For_Response_DataTop
  
    result.data.forEach((RescentViewAnime) => {
                const html = `

                    <div class="custom-col-">
                    <div class="movie-item movie-item-two">
                        <div class="movie-poster">
                        <img src="${RescentViewAnime.entry.images.jpg.image_url}" alt="${RescentViewAnime.title}">
                            <ul class="overlay-btn">
                                <li><a href="${RescentViewAnime.entry.url}" class="popup-video btn">Watch Now</a></li>
                                <li><a href="${RescentViewAnime.entry.url}"class="btn">Details</a></li>
                            </ul>
                        </div>
                        <div class="movie-content">
                           
                            <h6 class="title"><a href="${RescentViewAnime.entry.url}" target="_blank">${RescentViewAnime.title}</a></h6>
                           
                           
                        </div>
                    </div>
                </div>
                `;
                Create_Boxes_For_Response_DataTop.insertAdjacentHTML('beforeend', html);

    
    });


}

RescentViews();