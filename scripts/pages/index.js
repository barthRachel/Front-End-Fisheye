    async function getPhotographers() {

        let data = await fetch('data/photographers.json');
        let dataJson = await data.json();
        let photographers = dataJson.photographers;

        return (photographers)
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        const photographers = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
