function mediaFactory(data, name) { 
    let extension;
    data.image ? extension = (data.image).split('.')[1] : extension = (data.video).split('.')[1];

    if (extension === "jpg" || extension === "png") {
        return getImageCard(data, name);
    } else if (extension === "mp4" || extension === "webm") {
        return getVideoCard(data, name);
    } else {
        return("Unknon type");
    }

}

function getMediaDOM(data) {
    const article = document.createElement('article');
    const aside = document.createElement('aside');
    const nameParagraph = document.createElement('p');
    const likeParagraph = document.createElement('p');
    nameParagraph.textContent = data.title;
    nameParagraph.classList.add('titleMedia')
    let likesEl = (likesTab.filter(el => el.id === data.id))
    likeParagraph.innerHTML = `<span class='likesNumber'>${likesEl[0].likes}</span> <button><i id='${data.id}' class='fa fa-heart likeButton' aria-label="likes" ></i></button>`;
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
    video.preload="metadata";
    video.appendChild(source);
    button.appendChild(video)
    article.insertBefore(button, article.firstChild);

    return(article);
}

function likeDislike() {
    const likeButtons = document.querySelectorAll('.likeButton');
    const spanLikes = document.querySelectorAll('.likesNumber');
    let likeMedia = 0 , likeTotal = 0;

    for(let i = 0 ; i < likesTab.length ; i++){
        if(likesTab[i].isLike === true){
            document.getElementById(`${likesTab[i].id}`).classList.add('isLike');

            likeTotal += likesTab[i].likes
            
        } else {
            likeTotal += likesTab[i].likes
        }
    }
    
    for(let i =0 ; i < likeButtons.length ; i++){
        likeButtons[i].addEventListener('click', (e) => {
            if((likesTab.filter(el => el.id == e.target.getAttribute('id')))[0].isLike === false){
                e.target.classList.add('isLike');

                likeMedia = parseInt(spanLikes[i].textContent) + 1;
                likeTotal = parseInt(numberTotalOfLikes.textContent) + 1;
                
                (likesTab.filter(el => el.id == e.target.getAttribute('id')))[0].likes = likeMedia;
                (likesTab.filter(el => el.id == e.target.getAttribute('id')))[0].isLike = true;

            } else {
                e.target.classList.remove('isLike');

                likeMedia = parseInt(spanLikes[i].textContent) - 1;
                likeTotal = parseInt(numberTotalOfLikes.textContent) - 1;

                (likesTab.filter(el => el.id == e.target.getAttribute('id')))[0].likes = likeMedia;
                (likesTab.filter(el => el.id == e.target.getAttribute('id')))[0].isLike = false;
            }

            numberTotalOfLikes.innerText = likeTotal;
            spanLikes[i].innerText = (likesTab.filter(el => el.id == e.target.getAttribute('id')))[0].likes;
        })
    }

    numberTotalOfLikes.innerText = likeTotal;
}