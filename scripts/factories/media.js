function mediaFactory(data, name) { 
    let extension;
    data.image ? extension = (data.image).split('.')[1] : extension = (data.video).split('.')[1];

    if (extension === "jpg" || extension === "png") {
        return getImageCard(data, name);
    } else if (extension === "mp4" || extension === "webm") {
        return getVideoCard(data, name);
    } else {
        console.log("Unknon type");
    }

}

function getMediaDOM(data) {
    const article = document.createElement('article');
    const aside = document.createElement('aside');
    const nameParagraph = document.createElement('p');
    const likeParagraph = document.createElement('p');
    nameParagraph.textContent = data.title;
    likeParagraph.innerHTML = `<span class='likesNumber'>${data.likes}</span> <i class='fa fa-heart likeButton notLike' aria-label="likes" ></i>`;
    aside.appendChild(nameParagraph);
    aside.appendChild(likeParagraph);
    article.appendChild(aside);

    return(article);
}

function getImageCard(data, name) {
    let firstname = name.split(' ')[0].split('-').join(' ');

    const article = getMediaDOM(data);
    const button = document.createElement('button');
    const img = document.createElement('img');

    button.setAttribute('aria-label', `${data.title} by ${name}`);
    button.classList.add('mediaLightbox');
    img.setAttribute("src", `assets/images/${firstname}/${data.image}`);
    img.setAttribute("alt", `${data.title} by ${name}`);
    img.classList.add('image');

    button.appendChild(img)
    article.insertBefore(button, article.firstChild);
    return(article);
}

function getVideoCard(data, name) {
    let firstname = name.split(' ')[0].split('-').join(' ');

    const article = getMediaDOM(data);
    const button = document.createElement('button');
    const video = document.createElement('video');
    const source = document.createElement('source');

    button.setAttribute('aria-label', `${data.title} by ${name}`);
    button.classList.add('mediaLightbox');
    source.setAttribute("src", `assets/images/${firstname}/${data.video}`);
    video.classList.add('video');
    video.controls = true;

    video.appendChild(source);
    button.appendChild(video)
    article.insertBefore(button, article.firstChild);

    return(article);
}

function likeDislike() {
    const likeButtons = document.querySelectorAll('.likeButton');
    const spanLikes = document.querySelectorAll('.likesNumber');
    let likeNumber, likeTotal;
    
    for(let i =0 ; i < likeButtons.length ; i++){
        likeButtons[i].addEventListener('click', (e) => {
            if(e.target.classList.contains('notLike')){
                e.target.classList.remove('notLike');
                e.target.classList.add('isLike');

                likeNumber = parseInt(spanLikes[i].textContent) + 1;
                likeTotal = parseInt(numberofLikes.textContent) + 1;
            } else {
                e.target.classList.remove('isLike');
                e.target.classList.add('notLike');

                likeNumber = parseInt(spanLikes[i].textContent) - 1;
                likeTotal = parseInt(numberofLikes.textContent) - 1;
            }

            numberofLikes.innerText = likeTotal;
            spanLikes[i].innerText = likeNumber;
        })
    }
}