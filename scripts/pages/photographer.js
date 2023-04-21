//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographersInfo(photographerId) {
    let allData = await fetch('data/photographers.json');
    let allDataJson = await allData.json();
    let allDataPhotographers = allDataJson.photographers;
    let allDataMedia = allDataJson.media;

    const photographerInfo = allDataPhotographers.filter(photographers => photographers.id == photographerId )[0];

    const photographerMedias = allDataMedia.filter(el =>  el.photographerId == photographerId)

    return( { photographerInfo, photographerMedias} )
}

function getUserHeaderDOM(data) {
    const { name, portrait, city, country, tagline } = data;

    const picture = `assets/photographers/${portrait}`;
    // creation of DOM elements
    //const heart = document.createElement('i');
    const infosDiv = document.createElement('div');
    const h1 = document.createElement('h1');
    const localisationParagraph = document.createElement('p');
    const taglineParagraph = document.createElement('p');
    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    const portraitDiv = document.createElement('div');
    const img = document.createElement('img');

    // text modification of DOM's elements
    h1.textContent = name;
    localisationParagraph.textContent = city + ", " + country;
    taglineParagraph.textContent = tagline;
    button.textContent = "Contactez-moi";

    // add attributes of the different elements
    localisationParagraph.setAttribute('id', 'localisation');
    taglineParagraph.setAttribute('id', 'tagline');
    button.classList.add('contact_button');
    button.setAttribute('aria-label', "Contact me");
    img.setAttribute("src", picture);
    img.setAttribute('aria-label', name);
        
    // add children to the parent (article)
    infosDiv.appendChild(h1);
    infosDiv.appendChild(localisationParagraph);
    infosDiv.appendChild(taglineParagraph);
    buttonDiv.appendChild(button);
    portraitDiv.appendChild(img);

    // add button event listener
    button.addEventListener('click', displayModal);

    let res = {infosDiv, buttonDiv, portraitDiv};
    return res;
}

function getUserMedia(photographerData) {
    const mediaSection = document.querySelector('.photograph-media');

    const photographerInfo = photographerData.photographerInfo;
    const photographerMedias = photographerData.photographerMedias;

    photographerMedias.forEach((media) => {
        const mediaModel = mediaFactory(media, photographerInfo.name);
        mediaSection.appendChild(mediaModel);
    })
}

function getUserLikesPrice(data) {
    const { price } = data;

    const numberofLikes = document.querySelector('#numberOfLikes');
    const priceSpan = document.querySelector('.price');

    numberofLikes.textContent = "297 081 ";
    priceSpan.textContent = price + "€ / jour";
}

async function displayDataPhotographer(photographerData) {
    console.log(photographerData.photographerMedias)
    const photographerHeader = document.querySelector('.photograph-header');
    const userHeaderDOM = getUserHeaderDOM(photographerData.photographerInfo);
    photographerHeader.appendChild(userHeaderDOM.infosDiv);
    photographerHeader.appendChild(userHeaderDOM.buttonDiv);
    photographerHeader.appendChild(userHeaderDOM.portraitDiv);

    getUserMedia(photographerData)

    getUserLikesPrice(photographerData.photographerInfo);
}

async function init() {
    const idInUrl = window.location.search.split("=")[1];
    const photographersInfo = await getPhotographersInfo(idInUrl);
    displayDataPhotographer(photographersInfo)
}

init();