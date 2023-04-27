function displayModal(name) {
    const headerPage = document.querySelector('#headerPage');
    const main = document.querySelector('#main');
    const modal = document.getElementById("contact_modal");
    const modalCloseButton = document.querySelector('#modalCloseButton');

	modal.style.display = "flex";
    headerPage.setAttribute('aria-hidden', 'true');
    main.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-label', `Contact me ${name}`)
    modalCloseButton.focus();
    document.querySelector('body').style.overflow = 'hidden';

    document.querySelector('#photographerNameForModal').textContent = name;
}

function closeModal() {
    const headerPage = document.querySelector('#headerPage');
    const main = document.querySelector('#main');
    const modal = document.getElementById("contact_modal");
    const modalOpenButton = document.querySelector('.contact_button');

    modal.style.display = "none";
    headerPage.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-hidden', 'true');
    modalOpenButton.focus();
    document.querySelector('body').style.overflow = 'auto';
}

function sendInfo(){
    let firstname = document.querySelector("#firstname").value;
    let lastname = document.querySelector('#lastname').value;
    let email = document.querySelector('#email').value;
    let message = document.querySelector('#message').value;
    
    console.log("=============");
    console.log(`Vous avez reçu un message de ${firstname} ${lastname}, que vous pouvez recontactez à : ${email}`);
    console.log(`Message : ${message}`);
    console.log("=============");
    
    closeModal();
}

document.addEventListener('keydown', (e) => {
    if(document.getElementById("contact_modal").style.display === "flex" && e.keyCode === 27){
        closeModal();
    }
})