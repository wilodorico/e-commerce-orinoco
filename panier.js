const contenuePanier = document.getElementById('stock-panier');
let prixTotalPanier = 0;
displayPanier();

function displayPanier() {
    prixTotalPanier = 0;
    contenuePanier.innerHTML =
        `<div class="border-bottom mb-4">
        <h2 class="font-weight-bold h4">Votre panier</h2>
    </div>`;
    let panier = getPanier();
    for (let panierItem of panier) {
        let prix = panierItem.prix / 100;
        let prixTotalArticle = prix * panierItem.count;
        prixTotalPanier += prixTotalArticle;
        let articlePanier =
            `<div class="row border-bottom mb-4">
                <div class="col-md-3">
                    <img id="image" src="${panierItem.img}" class="card-img mb-3" alt="photo ${panierItem.name}">
                </div>
                <div class="col-md-4">
                    <h3 class="card-title h5">${panierItem.name}</h3>
                    <p class="card-text">${panierItem.vernis}</p>
                    <p class="card-text">${prix.toFixed(2)}€</p>
                </div>
                <div class="col-md d-flex align-items-start">
                    <button onclick="pushOneItem(event.currentTarget)" data-id="${panierItem.id}" data-vernis="${panierItem.vernis}" type="button" class="close" aria-label="rajoute">
                    <i class="fas fa-plus-circle"></i>
                    </button>${panierItem.count}
                    <button onclick="removeOneItem(event.currentTarget)" data-id="${panierItem.id}" data-vernis="${panierItem.vernis}" type="button" class="close" aria-label="diminu">
                        <i class="fas fa-minus-circle"></i>
                    </button>
                </div>
                <div class="col-md d-flex align-items-start justify-content-between">
                    <p class="card-text prix-total">${prixTotalArticle}€</p>
                    <button onclick="removeItem(event.currentTarget)" data-id="${panierItem.id}" data-vernis="${panierItem.vernis}" type="button" class="close" aria-label="Close">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>`;
        contenuePanier.innerHTML += articlePanier;
    };
    checkPanierVide();
    displayPrixTotal();
    showTotalInPanier();
};

function removeItem(e) {
    let panier = getPanier();
    let itemId = e.dataset.id;
    let itemVernis = e.dataset.vernis
    let itemFilter = panier.filter(function(item) {
        if (item.id != itemId || item.vernis != itemVernis) {
            return true;
        }
    });
    savePanier(itemFilter);
    displayPanier();
};

function displayPrixTotal() {
    const sousTotalPrix = document.querySelector('.prix');
    const totalPrix = document.querySelector('.total-prix');
    sousTotalPrix.textContent = prixTotalPanier + "€";
    totalPrix.textContent = prixTotalPanier + "€";
    //console.log(prixTotalPanier);
};

function checkPanierVide() {
    if (prixTotalPanier === 0) {
        let message =
            `<div class="text-center">
                <h2>Votre panier est vide</h2>
            </div>`;
        contenuePanier.innerHTML = message;
        document.getElementById('total-form').classList.add("d-none");
        localStorage.removeItem('panier');
    }
};

function pushOneItem(e) {
    addOrRemoveOneItem(e, true);
};

function removeOneItem(e) {
    addOrRemoveOneItem(e, false);
};

function addOrRemoveOneItem(e, add) {
    let panier = getPanier(); // decodage du json du local storage via panierHelper
    let itemId = e.dataset.id;
    let itemVernis = e.dataset.vernis;
    // on cherche dans notre panier si un élément similaire existe déja
    for (panierItem of panier) {
        if (panierItem.id == itemId && panierItem.vernis == itemVernis) { // similaire si même id et même vernis
            if (add) {
                panierItem.count++;
            } else if (panierItem.count > 1) {
                panierItem.count--;
            }
        }
    };
    savePanier(panier); // sauvegarde du json dans le local storage via panierHelper
    displayPanier();
};

// Affichage du formulaire au click sur le btnCommand + cache le btnCommand
const formCommand = document.getElementById('form');
const btnCommand = document.getElementById('command');
btnCommand.addEventListener('click', function() {
    formCommand.classList.remove("d-none");
    btnCommand.classList.add("d-none");
});

// récup du contenu panier + injection dans l'array products
let panier = getPanier();
let products = [];
panier.forEach(element => {
    products.push(element.id)
});

// Gestion validation du formulaire
let form = document.getElementById('form-command');
const btnValidCommand = document.getElementById('btn-valid-command');
btnValidCommand.addEventListener('click', submitOrder);
form.addEventListener('change', validInput);

// regex verification des inputs
let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
let nameRegex = new RegExp("^[a-zA-Z '.-]*$");
let addressRegex = new RegExp("^[a-zA-Z0-9 ]{0,10}[ -']{0,1}[a-zA-Z]+");

function validInput() {
    let smallEmail = form.email.nextElementSibling;
    let smallFirstName = form.firstName.nextElementSibling;
    let smallLastName = form.lastName.nextElementSibling;
    let smallAddress = form.address.nextElementSibling;
    let smallCity = form.city.nextElementSibling;
    
    // test input lastName
    if(!form.lastName.value) {
        return smallLastName.innerHTML = "Veuillez renseigner votre nom";
     }
     if(nameRegex.test(form.lastName.value)) {
        smallLastName.innerHTML = "valide";
        smallLastName.classList.remove('text-danger');
        smallLastName.classList.add('text-success');
     } else {
         smallLastName.innerHTML = "format non valide";
         smallLastName.classList.remove('text-success');
         smallLastName.classList.add('text-danger');
     };
    // test input firstname
    if(!form.firstName.value) {
       return smallFirstName.innerHTML = "Veuillez renseigner votre prénom";
    }
    if(nameRegex.test(form.firstName.value)) {
        smallFirstName.innerHTML = "valide";
        smallFirstName.classList.remove('text-danger');
        smallFirstName.classList.add('text-success');
    } else {
        smallFirstName.innerHTML = "format non valide";
        smallFirstName.classList.remove('text-success');
        smallFirstName.classList.add('text-danger');
    };
    // test input adresse
    if(!form.address.value) {
        return smallAddress.innerHTML = "Veuillez renseigner votre adresse";
     }
     if(addressRegex.test(form.address.value)) {
         smallAddress.innerHTML = "valide";
         smallAddress.classList.remove('text-danger');
         smallAddress.classList.add('text-success');
     } else {
         smallAddress.innerHTML = "format non valide";
         smallAddress.classList.remove('text-success');
         smallAddress.classList.add('text-danger');
     };
     // test input ville
    if(!form.city.value) {
        return smallCity.innerHTML = "Veuillez renseigner la ville";
     }
     if(addressRegex.test(form.city.value)) {
         smallCity.innerHTML = "valide";
         smallCity.classList.remove('text-danger');
         smallCity.classList.add('text-success');
     } else {
         smallCity.innerHTML = "format non valide";
         smallCity.classList.remove('text-success');
         smallCity.classList.add('text-danger');
     };
    // Test de l'input email
    if(!form.email.value) {
        return smallEmail.innerHTML = "Veuillez renseigner votre email";
     }
    if(emailRegex.test(form.email.value)) {
        smallEmail.innerHTML = "email valide";
        smallEmail.classList.remove('text-danger');
        smallEmail.classList.add('text-success');
    } else {
        smallEmail.innerHTML = "format email non valide";
        smallEmail.classList.remove('text-success');
        smallEmail.classList.add('text-danger');
    }
};
// function envoie du formulaire avec requête API methode POST
function submitOrder(e) {
    e.preventDefault();
    // verification des tests regex
    if (!nameRegex.test(form.lastName.value) || 
        !nameRegex.test(form.firstName.value) ||
        !addressRegex.test(form.address.value) ||
        !addressRegex.test(form.city.value) ||
        !emailRegex.test(form.email.value)) {
        return;
    }
    // otptions de la requête API
    const options = {
        method: 'POST',
        body: JSON.stringify({
            contact: {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                address: form.address.value,
                city: form.city.value,
                email: form.email.value
            },products
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };
    // Requête API et création du modal de confirmation + affichage du modal 
    fetch("http://localhost:3000/api/furniture/order", options)
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status)
        }
    })
    .then(data => {
        let modal = 
        `<!-- Modal -->
        <div class="modal fade" id="modalConfirm" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="h5 modal-title" id="exampleModalLongTitle">Confirmation de commande</h2>
                        <button onclick="pageAccueil()" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Nous vous remercions de votre commande N°<strong>${data.orderId}</strong> d'un montant de <strong>${prixTotalPanier} €</strong>. Nous vous tiendrons informé par e-mail 
                        lorsque les articles de votre commande auront été expédiés.</p>
                        <p>Au plaisir de vous revoir bientôt.</p>
                    </div>
                    <div class="modal-footer">
                        <button onclick="pageAccueil()" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`
        document.querySelector('.container').innerHTML = modal;  
        $('#modalConfirm').modal('show');
        localStorage.clear();
        //console.log(data)
    }).catch(err => console.log(`Erreur message : ${err}`));
};
// function aller à la page d'accueil
function pageAccueil() {
    document.location.href = "index.html";
};