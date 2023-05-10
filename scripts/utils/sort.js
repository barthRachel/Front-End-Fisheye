var dropButton = document.querySelector('.dropbtn');
var actualTitle = document.querySelector('#dropdown-title');
var sortName = document.querySelectorAll('.sort-name');
var liDropdown = document.querySelectorAll('.li-dropdown');

dropButton.addEventListener('click', toggleSorter)

function toggleSorter() {

    if(dropButton.classList.contains('close')){
        document.querySelector('.dropdown-arrow').style.transform = "rotate(-360deg)";
        dropButton.classList.remove('close');
        dropButton.classList.add('open');

        document.querySelector('.dropdown-menu').style.display = 'block';
    } else if(dropButton.classList.contains('open')){
        document.querySelector('.dropdown-arrow').style.transform = "rotate(-180deg)";
        dropButton.classList.remove('open');
        dropButton.classList.add('close');

        document.querySelector('.dropdown-menu').style.display = 'none';
    }

    for(let i = 0 ; i < sortName.length ; i++){
        if(actualTitle.innerText === sortName[i].innerText) {
            liDropdown[i].style.display = 'none';
        } else {
            liDropdown[i].style.display = 'block';
        }
    }
}

async function sort(filter){
    const mediaSection = document.querySelector('.photograph-media');
    actualTitle.innerText = filter;
    mediaSection.innerHTML = "";

    const infos = await getPhotographersInfo(idInUrl);
    const mediaSorted = getUserMedia(infos);
    toggleSorter();
    likeDislike();
    return mediaSorted;
}

function getMediaSorted(photographerMedias, filter){
    if(filter === "Popularité") {
        return(photographerMedias.sort((a,b) => b.likes - a.likes));
    } else if(filter === "Titre") {
        return(photographerMedias.sort((a,b) => a.title.toString().localeCompare(b.title.toString())));
    } else if(filter === "Date"){
        return(photographerMedias.sort((a,b) => a.date.toString().localeCompare(b.date.toString())));
    }
}

