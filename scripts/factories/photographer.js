function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const a = document.createElement('a');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        a.setAttribute('href', `photographer.html?id=${id}`)
        a.setAttribute('aria-label', name);
        img.setAttribute("src", picture);
        img.setAttribute("alt", " ");
        h2.textContent = name;
        a.appendChild(img);
        a.appendChild(h2)
        const div = document.createElement('div');
        const localisationParagraph = document.createElement('p');
        localisationParagraph.setAttribute('id', 'localisation');
        const taglineParagraph = document.createElement('p');
        taglineParagraph.setAttribute('id', 'tagline');
        const priceParagraph = document.createElement('p');
        priceParagraph.setAttribute('id', 'price')
        localisationParagraph.textContent = city + ", " + country;
        taglineParagraph.textContent = tagline;
        priceParagraph.textContent = price + "€/jour";
        div.appendChild(localisationParagraph);
        div.appendChild(taglineParagraph);
        div.appendChild(priceParagraph);
        article.appendChild(a);
        article.appendChild(div);
        return (article);
    }

    function getUserHeaderDOM() {
        const heart = document.createElement('i');
        heart.classList.add('fa');
        heart.classList.add('fa-heart');
        
        const infosDiv = document.createElement('div');
        const h1 = document.createElement('h1');
        const localisationParagraph = document.createElement('p');
        const taglineParagraph = document.createElement('p');
        h1.textContent = name;
        localisationParagraph.textContent = city + ", " + country;
        localisationParagraph.setAttribute('id', 'localisation');
        taglineParagraph.textContent = tagline;
        taglineParagraph.setAttribute('id', 'tagline');
        infosDiv.appendChild(h1);
        infosDiv.appendChild(localisationParagraph);
        infosDiv.appendChild(taglineParagraph);

        const buttonDiv = document.createElement('div');
        const button = document.createElement('button');
        button.textContent = "Contactez-moi";
        button.classList.add('contact_button');
        button.setAttribute('aria-label', "Contact me");
        button.addEventListener('click', displayModal);
        buttonDiv.appendChild(button);

        const portraitDiv = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute('aria-label', name);
        portraitDiv.appendChild(img)

        const likesPriceDiv = document.createElement('div');
        likesPriceDiv.classList.add('like_price')
        const likesParagraph = document.createElement('p');
        likesParagraph.classList.add('likes');
        const priceParagraph = document.createElement('p');
        priceParagraph.classList.add('price')
        likesParagraph.textContent = "297 081 ";
        likesParagraph.appendChild(heart)
        priceParagraph.textContent = price + "€ / jour";

        likesPriceDiv.appendChild(likesParagraph);
        likesPriceDiv.appendChild(priceParagraph);

        let res = {infosDiv, buttonDiv, portraitDiv, likesPriceDiv};
        return res;
    }
    return { /*name, picture,*/ getUserCardDOM, getUserHeaderDOM }
}