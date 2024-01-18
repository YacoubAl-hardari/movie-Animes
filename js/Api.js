//GET Jikan API
const api_url = "https://api.jikan.moe/v4/";

// define the variables 
/**
 * Get search input element and add keyup event listener.
 * Check if input value length is >= 2, if so call GetAllAnime() with input value.
 */
const searchInput = document.getElementById("make-search-input");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    if (this.value.length >= 2) {
      GetAllAnime(this.value);
    }
  });
}
    
    /**
     * Fetches anime data from the Jikan API based on the search query,
     * and displays the results by appending generated HTML to the page.
     */
    async function GetAllAnime(searchValue) {
    const response = await fetch(`${api_url}anime?q=${searchValue}`);
    const GetAnime = await response.json();
    const Create_Boxes_For_Response_Data = document.querySelector(
        "#get-result-for-search-tr-movie-active"
    );

    GetAnime.data.forEach((item) => {
        Create_Boxes_For_Response_Data.innerHTML += generateAnimeHTML(item);
    });
    }

     function generateAnimeHTML(item)
     {
        return `
        
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
        /**
         * Generates a star rating HTML string based on the provided score value.
         * Rounds down to the nearest half star.
         */
        function generateStarRating(score) {
            const fullStars = Math.floor(score);
            const hasHalfStar = score - fullStars >= 0.5;
            let starRatingHTML = "";

            for (let i = 0; i < fullStars; i++) {
            starRatingHTML += '<i class="fas fa-star"></i>';
            }

            if (hasHalfStar) {
            starRatingHTML += '<i class="fas fa-star-half-alt"></i>';
            }

            return starRatingHTML;
        }
     }

/**
 * Fetches top anime data from API and renders HTML for each anime item.
 * Calls API endpoint to get top anime data. Iterates through response data
 * to generate HTML for each anime item using generateTopAnimeHtml().
 * Inserts generated HTML into DOM. Also initializes owl carousel widget.
 */

    async function GetTopAnime() {
    const response = await fetch(`${api_url}top/anime`);
    const result = await response.json();
    const Create_Boxes_For_Response_DataTop = document.querySelector("#top-movies-anime-section");
    
    // Iterate over the data and append the HTML code into Create_Boxes_For_Response_DataTop

    result.data.forEach((topAnime) => {
        Create_Boxes_For_Response_DataTop.insertAdjacentHTML(
        "beforeend",
        generateTopAnimeHtml(topAnime)
        );
    });

        $(".ucm-active-two").owlCarousel({
            loop: true,
            margin: 45,
            items: 5,
            autoplay: false,
            autoplayTimeout: 2500,
            autoplaySpeed: 1000,
            navText: [
            '<i class="fas fa-angle-left"></i>',
            '<i class="fas fa-angle-right"></i>',
            ],
            nav: true,
            dots: false,
            responsive: {
            0: {
                items: 2,
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
                items: 5,
            },
            },
        });
        
    }

    function generateTopAnimeHtml(topAnime) {
        const englishTitle = topAnime.titles.find((title) => title.type === "English");
        const scoreString = topAnime.favorites > 1000 ? (topAnime.favorites / 1000).toFixed(1) + "K": topAnime.favorites.toString();
    return `
            
            <div class="movie-item movie-item-two mb-30">
            <div class="movie-poster">
                <a href="${topAnime.url}"><img src="${
        topAnime.images.jpg.image_url
    }" alt="${topAnime.title_english}"></a>
            </div>
            <div class="movie-content">
                <div class="rating">
                    ${generateStarRating(topAnime.score)}
                </div>
                <h6 class="title"><a href="${topAnime.url}" target="_blank">${
        topAnime.title
    }</a></h6>
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

    function generateStarRating(score) {
        const fullStars = Math.floor(score);
        const hasHalfStar = score - fullStars >= 0.5;
        let starRatingHTML = "";

        for (let i = 0; i < fullStars; i++) {
        starRatingHTML += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
        starRatingHTML += '<i class="fas fa-star-half-alt"></i>';
        }

        return starRatingHTML;
    }
    }

    GetTopAnime();


/**
 * Fetches upcoming anime data from API and displays in HTML.
 * Calls API endpoint for upcoming anime seasons.
 * Iterates through response data to generate HTML for each anime.
 * Inserts generated HTML into DOM.
 * Configures owl carousel for responsive display.
 * Refreshes carousel on tab change.
 */
    async function UpcomingAnimes() {
    const response = await fetch(`${api_url}seasons/upcoming`);
    const result = await response.json();
    const Create_Boxes_For_Response_UpcomingAnimes =
        document.querySelector("#Upcoming-Animes");
    // Iterate over the data and append the HTML code into Create_Boxes_For_Response_DataTop
    result.data.forEach((UpcomingAnime) => {
        Create_Boxes_For_Response_UpcomingAnimes.insertAdjacentHTML("beforeend",generateUpcomingAnimeHtml(UpcomingAnime));
    });

    $(".ucm-activeert").owlCarousel({
        loop: true,
        margin: 30,
        items: 4,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        navText: [
        '<i class="fas fa-angle-left"></i>',
        '<i class="fas fa-angle-right"></i>',
        ],
        nav: true,
        dots: false,
        responsive: {
        0: {
            items: 1,
            nav: false,
        },
        575: {
            items: 2,
            nav: false,
        },
        768: {
            items: 2,
            nav: false,
        },
        992: {
            items: 3,
        },
        1200: {
            items: 4,
        },
        },
    });

    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
        $(".ucm-activeert").trigger("refresh.owl.carousel");
    });
    }

    function generateUpcomingAnimeHtml(UpcomingAnime) {
        const englishTitle = UpcomingAnime.titles.find((title) => title.type === "English");
        const scoreString = UpcomingAnime.favorites > 1000 ? (UpcomingAnime.favorites / 1000).toFixed(1) + "K": UpcomingAnime.favorites.toString();
    return `

                        <div class="movie-item mb-50">
                        <div class="movie-poster">
                        <a href="${UpcomingAnime.url}"><img src="${UpcomingAnime.images.jpg.image_url}" alt="${UpcomingAnime.title_english}"></a>
                        </div>
                        <div class="movie-content">
                            <div class="top">
                            <h6 class="title"><a href="${UpcomingAnime.url}" target="_blank">${UpcomingAnime.title}</a></h6>
                                <span class="date">${UpcomingAnime.aired.prop.from.year}</span>
                            </div>
                            <div class="bottom">
                                <ul>
                                    <li><span class="quality">hd</span></li>
                                    <li>
                                        <span class="duration"><i class="far fa-clock"></i> 128 min</span>
                                        <span class="rating"><i class="fas fa-thumbs-up"></i>${scoreString}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
    }

    UpcomingAnimes();


/**
 * Fetches recent anime episodes from API and displays them in a carousel.
 * Calls API endpoint to get list of recent anime episodes.
 * Iterates through data to generate HTML for each one using helper.
 * Inserts generated HTML into DOM element.
 * Initializes carousel widget on element using options.
 * Refreshes carousel on tab change.
 */

    async function RecentAnimes() {
    const response = await fetch(`${api_url}watch/episodes`);
    const result = await response.json();
    const Create_Boxes_For_Response_RecentAnimes = document.querySelector("#Recent-Animes");
    result.data.forEach((RecentAnime) => {
        Create_Boxes_For_Response_RecentAnimes.insertAdjacentHTML("beforeend",generateRecentAnimeHtml(RecentAnime));
    });

    $(".ucm-actives").owlCarousel({
        loop: true,
        margin: 30,
        items: 4,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        navText: [
        '<i class="fas fa-angle-left"></i>',
        '<i class="fas fa-angle-right"></i>',
        ],
        nav: true,
        dots: false,
        responsive: {
        0: {
            items: 1,
            nav: false,
        },
        575: {
            items: 2,
            nav: false,
        },
        768: {
            items: 2,
            nav: false,
        },
        992: {
            items: 3,
        },
        1200: {
            items: 4,
        },
        },
    });

    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
        $(".ucm-actives").trigger("refresh.owl.carousel");
    });
    }

    function generateRecentAnimeHtml(RecentAnime) {
    return `

            <div class="movie-item mb-50">
            <div class="movie-poster">
            <a href="${RecentAnime.entry.url}"><img src="${RecentAnime.entry.images.jpg.image_url}" alt="${RecentAnime.entry.title}"></a>
            </div>
            <div class="movie-content">
                <div class="top">
                <h6 class="title"><a href="${RecentAnime.entry.url}" target="_blank">${RecentAnime.entry.title}</a></h6>
                </div>
                <div class="bottom">
                    <ul>
                        <li><span class="quality">hd</span></li>
                        <li>
                            <span class="duration"><i class="far fa-clock"></i> 128 min</span>
                            <span class="rating"><i class="fas fa-thumbs-up"></i>555</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            `;
    }

    RecentAnimes();



/**
 * Fetches popular anime episodes from API and displays them in a carousel.
 * Calls API endpoint to get popular anime data.
 * Iterates over response data to generate HTML for each anime.
 * Inserts generated HTML into page.
 * Configures owl carousel widget to display anime items.
 * Refreshes carousel when tab is changed.
 */

    async function popularAnimes() {
    const response = await fetch(`${api_url}watch/episodes/popular`);
    const result = await response.json();
    const Create_Boxes_For_Response_popularAnimes =
        document.querySelector("#popular-Animes");

    result.data.forEach((popularAnime) => {
        Create_Boxes_For_Response_popularAnimes.insertAdjacentHTML(
        "beforeend",
        generatepopularAnimeHtml(popularAnime)
        );
    });

    $(".ucm-activexs").owlCarousel({
        loop: true,
        margin: 30,
        items: 4,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        navText: [
        '<i class="fas fa-angle-left"></i>',
        '<i class="fas fa-angle-right"></i>',
        ],
        nav: true,
        dots: false,
        responsive: {
        0: {
            items: 1,
            nav: false,
        },
        575: {
            items: 2,
            nav: false,
        },
        768: {
            items: 2,
            nav: false,
        },
        992: {
            items: 3,
        },
        1200: {
            items: 4,
        },
        },
    });
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
        $(".ucm-activexs").trigger("refresh.owl.carousel");
    });
    }

    function generatepopularAnimeHtml(popularAnime) {
    return `

            <div class="movie-item mb-50">
            <div class="movie-poster">
            <a href="${popularAnime.entry.url}"><img src="${popularAnime.entry.images.jpg.image_url}" alt="${popularAnime.entry.title}"></a>
            </div>
            <div class="movie-content">
                <div class="top">
                <h6 class="title"><a href="${popularAnime.entry.url}" target="_blank">${popularAnime.entry.title}</a></h6>
                </div>
                <div class="bottom">
                    <ul>
                        <li><span class="quality">hd</span></li>
                        <li>
                            <span class="duration"><i class="far fa-clock"></i> 128 min</span>
                            <span class="rating"><i class="fas fa-thumbs-up"></i>555</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    }

    popularAnimes();



/**
 * Fetches recent popular anime from API and displays them on the page.
 * Limits initial display to first 5 items. Provides button to load more.
 */

    async function RescentViews() {
    const response = await fetch(`${api_url}watch/promos/popular`);
    const result = await response.json();
    const Create_Boxes_For_Response_DataTop = document.querySelector(
        "#movie-item-row-recent-views"
    );
    const browseAllMoviesButton = document.getElementById("BROWSEALLMOVIES");
    const elementsToShow = 5;
    let startIndex = 0;

    // Function to show elements based on the startIndex
    function showElements() {
        for (let i = startIndex; i < startIndex + elementsToShow; i++) {
        if (customColElements[i]) {
            customColElements[i].style.display = "inline-block";
        }
        }
        startIndex += elementsToShow;

        // Disable the button if all elements are shown
        if (startIndex >= customColElements.length) {
        browseAllMoviesButton.style.display = "none";
        }
    }
    // Iterate over the data and append the HTML code into Create_Boxes_For_Response_DataTop

    result.data.forEach((RescentViewAnime) => {
        Create_Boxes_For_Response_DataTop.insertAdjacentHTML(
        "beforeend",
        generateRescentViewHtml(RescentViewAnime)
        );
    });

    // Get the customColElements after adding elements
    const customColElements =
        Create_Boxes_For_Response_DataTop.querySelectorAll(".custom-col-");

    // Initially hide elements above the 10th element
    for (let i = 0; i < customColElements.length; i++) {
        if (i >= 10) {
        customColElements[i].style.display = "none";
        }
    }

    // Check if there are more than 10 elements with the class "custom-col-"
    if (customColElements.length > 10) {
        // Enable the "BROWSEALLMOVIES" button
        browseAllMoviesButton.addEventListener("click", showElements);
    } else {
        // Disable the "BROWSEALLMOVIES" button if there are not enough elements
        browseAllMoviesButton.style.display = true;
    }
    }

    function generateRescentViewHtml(RescentViewAnime) {
    return `
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
                    </div>`;
    }
    RescentViews();




    async function randomAnimeSlider()
    {
        const response = await fetch(`${api_url}random/anime`);
        const getRandomAnime = await response.json();
        const RandomSliderActive = document.querySelector("#Random-slider-active");

            RandomSliderActive.insertAdjacentHTML("beforeend",generaterandomAnimeSliderHtml(getRandomAnime.data));



    }


    function generaterandomAnimeSliderHtml(RandomAnime)
    {
        return  ` <div class="slider-item">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 order-0 order-lg-2">
                        <div class="slider-img text-center text-lg-right" data-animation="fadeInRight" data-delay="1s">
                            <img src="${RandomAnime.images.jpg.large_image_url}" alt="${RandomAnime.title}">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="banner-content">
                            <h6 class="sub-title" data-animation="fadeInUp" data-delay=".2s">MFFD</h6>
                            <h2 class="title" data-animation="fadeInUp" data-delay=".4s">${RandomAnime.title}</h2>
                            <div class="banner-meta" data-animation="fadeInUp" data-delay=".6s">
                                <ul>
                                    <li class="quality">
                                        <span>Pg 18</span>
                                        <span>${RandomAnime.score}</span>
                                    </li>
                                    <li class="category">
                                        <a href="#">Romance,</a>
                                        <a href="#">Drama</a>
                                    </li>
                                    <li class="release-time">
                                        <span><i class="far fa-calendar-alt"></i> ${RandomAnime.aired.prop.from.year}</span>
                                        <span><i class="far fa-clock"></i> ${RandomAnime.duration}</span>
                                    </li>
                                </ul>
                            </div>
                            <a href="${RandomAnime.url}" class="banner-btn btn popup-video" data-animation="fadeInUp" data-delay=".8s"><i class="fas fa-play"></i> Watch Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

    }


    randomAnimeSlider();