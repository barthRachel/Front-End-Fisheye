//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographersInfo(photographerId) {
    let allData = await fetch('data/photographers.json');
    let allDataJson = await allData.json();
    let allDataPhotographers = allDataJson.photographers;
    let allDataMedia = allDataJson.media;

    let photographerInfo;
    for(let i = 0 ; i < allDataPhotographers.length ; i++) {
        if(allDataPhotographers[i].id == photographerId) {
            photographerInfo = allDataPhotographers[i];
        }
    }

    let photographerMedias = [];
    for(let j = 0 ; j < allDataMedia.length ; j++) {
        if(allDataMedia[j].photographerId == photographerId) {
            photographerMedias.push(allDataMedia[j]);
        }
    }

    console.log("======")
    console.log(allDataPhotographers);
    console.log("======")
    console.log(photographerInfo);
    console.log("======")
    console.log(photographerMedias);
    console.log("======")

    return( photographerInfo )
}

async function displayDataPhotographer(photographerInfo) {
    const photographerHeader = document.querySelector('.photograph-header');
    const photographerModel = photographerFactory(photographerInfo);
    const userHeaderDOM = photographerModel.getUserHeaderDOM();
    photographerHeader.appendChild(userHeaderDOM.infosDiv);
    photographerHeader.appendChild(userHeaderDOM.buttonDiv);
    photographerHeader.appendChild(userHeaderDOM.portraitDiv);
    photographerHeader.appendChild(userHeaderDOM.likesPriceDiv);
}

async function init() {
    const url = window.location.search.split("=")[1];
    const photographersInfo = await getPhotographersInfo(url);
    displayDataPhotographer(photographersInfo)
}

init();