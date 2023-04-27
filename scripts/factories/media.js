function mediaFactory(data, name) {
    //const { id, title, likes, date, price } = data;
    let extension;
    data.image ? extension = (data.image).split('.')[1] : extension = (data.video).split('.')[1];

    if (extension === "jpg" || extension === "png") {
        return getImageCard(data, name);
        //getMediaDOM(data);
    } else if (extension === "mp4" || extension === "webm") {
        return getVideoCard(data, name);
        //getMediaDOM(data);
    } else {
        console.log("Unknon type");
    }

}

function getMediaDOM(data) {
    //console.log("Youhou");

    const article = document.createElement('article');
    const aside = document.createElement('aside');
    const nameParagraph = document.createElement('p');
    const likeParagraph = document.createElement('p');
    nameParagraph.textContent = data.title;
    likeParagraph.innerHTML = data.likes + ` <i class='fa fa-heart' aria-label="likes"></i>`;
    aside.appendChild(nameParagraph);
    aside.appendChild(likeParagraph);
    article.appendChild(aside);

    return(article);

}

function getImageCard(data, name) {
    //console.log("Image");

    let firstname = name.split(' ')[0].split('-').join(' ');

    const article = getMediaDOM(data);
    const button = document.createElement('button');
    const img = document.createElement('img');

    button.setAttribute('aria-label', `${data.title} by ${name}`);
    img.setAttribute("src", `assets/images/${firstname}/${data.image}`);
    img.setAttribute("alt", `${data.title} by ${name}`);
    img.classList.add('image');

    button.appendChild(img)
    article.insertBefore(button, article.firstChild);
    return(article);
}

function getVideoCard(data, name) {
    //console.log("Video");

    let firstname = name.split(' ')[0].split('-').join(' ');

    const article = getMediaDOM(data);
    const button = document.createElement('button');
    const video = document.createElement('video');
    const source = document.createElement('source');

    button.setAttribute('aria-label', `${data.title} by ${name}`);
    source.setAttribute("src", `assets/images/${firstname}/${data.video}`);
    video.classList.add('video');
    video.controls = true;

    video.appendChild(source);
    button.appendChild(video)
    article.insertBefore(button, article.firstChild);

    return(article);
}