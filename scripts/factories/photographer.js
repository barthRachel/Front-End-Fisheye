function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // creation of DOM elements
        const article = document.createElement( 'article' );
        const a = document.createElement('a');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const div = document.createElement('div');
        const localisationParagraph = document.createElement('p');
        const taglineParagraph = document.createElement('p');
        const priceParagraph = document.createElement('p');

        // text modification of DOM's elements
        h2.textContent = name;
        localisationParagraph.textContent = city + ", " + country;
        taglineParagraph.textContent = tagline;
        priceParagraph.textContent = price + "€/jour";

        // add attributes of the different elements
        article.setAttribute('role', name + "\'s card");
        a.setAttribute('href', `photographer.html?id=${id}`)
        a.setAttribute('aria-label', name);
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        localisationParagraph.setAttribute('id', 'localisation');
        taglineParagraph.setAttribute('id', 'tagline');
        priceParagraph.setAttribute('id', 'price');

        // add children to the parent (article)
        a.appendChild(img);
        a.appendChild(h2);
        div.appendChild(localisationParagraph);
        div.appendChild(taglineParagraph);
        div.appendChild(priceParagraph);
        article.appendChild(a);
        article.appendChild(div);

        return (article);
    }

    return { getUserCardDOM }
}