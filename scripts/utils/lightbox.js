// Global var
const $prevBtn = $('.prev-image');
const $nextBtn = $('.next-image');

function openLightbox(){
    const headerPage = document.querySelector('#headerPage');
    const main = document.querySelector('#main');
    const lightbox = document.getElementById("lightbox_carousel");
    const lightboxCloseButton = document.querySelector('#lightboxCloseButton');

    lightbox.style.display = 'flex';
    headerPage.setAttribute('aria-hidden', 'true');
    main.setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxCloseButton.focus();
    document.querySelector('body').style.overflow ='hidden';
}

function closeLightbox(){
    const headerPage = document.querySelector('#headerPage');
    const main = document.querySelector('#main');
    const lightbox = document.getElementById("lightbox_carousel");

    lightbox.style.display = 'none';
    headerPage.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'false');
    lightbox.setAttribute('aria-hidden', 'true');
    document.querySelector('body').style.overflow = 'auto';
    document.querySelector('#divMedia').innerHTML = "";
}

function getImageSlide(src){
    const img = document.createElement('img');
    img.setAttribute('src', src);

    return img;
}

function getVideoSlide(src) {
    const video = document.createElement('video');
    const source = document.createElement('source');
    video.controls = true;
    source.setAttribute('src', src);
    video.appendChild(source)

    return video
}

function getSlideForBox(slide, mediaPlace){
    mediaPlace.innerHTML = "";
    const mediaTitle = document.createElement('p');
    if(slide.childNodes[0].childNodes[0].classList.contains('image')){
        const img = getImageSlide(slide.childNodes[0].childNodes[0].getAttribute('src'));
        mediaPlace.appendChild(img);

        mediaTitle.innerText = slide.childNodes[1].childNodes[0].innerText;
        mediaPlace.appendChild(mediaTitle);

        img.setAttribute('alt', slide.childNodes[0].getAttribute('aria-label'))

    } else if(slide.childNodes[0].childNodes[1].classList.contains('video')){
        const video = getVideoSlide(slide.childNodes[0].childNodes[1].childNodes[0].getAttribute('src'));
        mediaPlace.appendChild(video);

        mediaTitle.innerText = slide.childNodes[1].childNodes[0].innerText;
        mediaPlace.appendChild(mediaTitle);

        video.setAttribute('alt', slide.childNodes[0].getAttribute('aria-label'))
    }
}

function getLightbox(){
    let articles = document.querySelectorAll('article');
    let position;

    let mediaPlace = document.querySelector('#divMedia');

    articles.forEach(article => {
        const buttonForLightbox = article.childNodes[0];
        buttonForLightbox.addEventListener("click", () => {
            openLightbox()
            const mediaTitle = document.createElement('p');
            if(article.childNodes[0].childNodes[0].classList.contains('image')){
                const img = getImageSlide(article.childNodes[0].childNodes[0].getAttribute('src'));
                mediaPlace.appendChild(img);
                mediaTitle.innerText = article.childNodes[1].childNodes[0].innerText;
                mediaPlace.appendChild(mediaTitle);

                img.setAttribute('alt', article.childNodes[0].getAttribute('aria-label'))
                
                position = article.getAttribute('data-position');
            } else if(article.childNodes[0].childNodes[1].classList.contains('video')){
                const video = getVideoSlide(article.childNodes[0].childNodes[1].childNodes[0].getAttribute('src'));
                mediaPlace.appendChild(video);

                mediaTitle.innerText = article.childNodes[1].childNodes[0].innerText;
                
                mediaPlace.appendChild(mediaTitle);
                video.setAttribute('alt', article.childNodes[0].getAttribute('aria-label'))

                position = article.getAttribute('data-position');
            }

        })
    });

    const goToNextSlide = () => {
        if(position < articles.length-1){
            position = parseInt(position);
            position += 1;
            const nextSlide = articles[position];

            getSlideForBox(nextSlide, mediaPlace);
        } else if(position == articles.length-1){
            position = 0;
            const nextSlide = articles[position];

            getSlideForBox(nextSlide, mediaPlace);
        }
    }

    const goToPreviousSlide = () => {
        if(position > 0){
            position -= 1;
            const previousSlide = articles[position];
            getSlideForBox(previousSlide, mediaPlace);
        } else if(position == 0){
            position = articles.length-1;
            const previousSlide = articles[position];
            getSlideForBox(previousSlide, mediaPlace);
        }
    }

    $prevBtn.click(function() {
        goToPreviousSlide();
    })
      
    $nextBtn.click(function() {
        goToNextSlide();
    })

    $(document).keydown(function(e) {
        const keyCode = e.keyCode ? e.keyCode : e.which
      
        if (keyCode === 39) {
            goToNextSlide();
        } else if (keyCode === 37) {
            goToPreviousSlide();
        } else if(document.getElementById("lightbox_carousel").style.display === "flex" && e.keyCode === 27){
            closeLightbox();
        }
    })
}