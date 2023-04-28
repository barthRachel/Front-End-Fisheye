//global variables
const prevButton = document.querySelector('.prev-image');
const nextButton = document.querySelector('.next-image');

var headerPage = document.querySelector('#headerPage');
var main = document.querySelector('#main');
var lightbox = document.getElementById("lightbox_carousel");
var lightboxCloseButton = document.querySelector('#lightboxCloseButton');

function openLightbox(){
    lightbox.style.display = 'flex';
    headerPage.setAttribute('aria-hidden', 'true');
    main.setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxCloseButton.focus();
    document.querySelector('body').style.overflow ='hidden';
}

function closeLightbox(){
    lightbox.style.display = 'none';
    headerPage.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'false');
    lightbox.setAttribute('aria-hidden', 'true');
    document.querySelector('body').style.overflow = 'auto';
    document.querySelector('#divMedia').innerHTML = "";
}

function createSlide(article, mediaPlace, mediaTitle) {
    if(article.childNodes[0].childNodes[0].classList.contains('image')){
        const img = document.createElement('img');
        img.setAttribute('src', article.childNodes[0].childNodes[0].getAttribute('src'))
        
        mediaPlace.appendChild(img);
        mediaTitle.innerText = article.childNodes[1].childNodes[0].innerText;
        mediaPlace.appendChild(mediaTitle);

        img.setAttribute('alt', article.childNodes[0].getAttribute('aria-label'))
    } else if(article.childNodes[0].childNodes[1].classList.contains('video')){
        const video = document.createElement('video');
        const source = document.createElement('source');
        video.controls = true;
        source.setAttribute('src', article.childNodes[0].childNodes[1].childNodes[0].getAttribute('src'));
        video.appendChild(source);
        
        mediaPlace.appendChild(video);
        mediaTitle.innerText = article.childNodes[1].childNodes[0].innerText;
        mediaPlace.appendChild(mediaTitle);

        video.setAttribute('alt', article.childNodes[0].getAttribute('aria-label'))
    }
}

function getLightbox(){
    let articles = document.querySelectorAll('article');
    let position;

    let mediaPlace = document.querySelector('#divMedia');

    articles.forEach(article => {
        const buttonForLightbox = article.childNodes[0];
        buttonForLightbox.addEventListener("click", () => {
            openLightbox();
            const mediaTitle = document.createElement('p');
            createSlide(article, mediaPlace, mediaTitle);

            position = article.getAttribute('data-position');
        })
    });

    const goToNextSlide = () => {
        mediaPlace.innerHTML = "";
        const mediaTitle = document.createElement('p');

        if(position < articles.length-1){
            position = parseInt(position);
            position += 1;
            const nextSlide = articles[position];

            createSlide(nextSlide, mediaPlace, mediaTitle);
        } else if(position == articles.length-1){
            position = 0;
            const nextSlide = articles[position];

            createSlide(nextSlide, mediaPlace, mediaTitle);
        }
    }

    const goToPreviousSlide = () => {
        mediaPlace.innerHTML = "";
        const mediaTitle = document.createElement('p');

        if(position > 0){
            position -= 1;
            const previousSlide = articles[position];

            createSlide(previousSlide, mediaPlace, mediaTitle);
        } else if(position == 0){
            position = articles.length-1;
            const previousSlide = articles[position];

            createSlide(previousSlide, mediaPlace, mediaTitle);
        }
    }

    prevButton.addEventListener('click', goToPreviousSlide);
    nextButton.addEventListener('click', goToNextSlide);

    document.addEventListener('keydown', (e) => {
        const keyCode = e.keyCode ? e.keyCode : e.which;
        if (keyCode === 39) {
            goToNextSlide();
        } else if (keyCode === 37) {
            goToPreviousSlide();
        } else if(document.getElementById("lightbox_carousel").style.display === "flex" && e.keyCode === 27){
            closeLightbox();
        }

    })
}