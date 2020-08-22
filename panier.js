const contenuePanier = document.getElementById('stock-panier');
let prixTotalPanier = 0;
displayPanier();

function displayPanier() {
    prixTotalPanier = 0;
    contenuePanier.innerHTML =
        `<div class="border-bottom mb-4">
        <h4 class="col-4 font-weight-bold">Votre panier</h4>
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
                    <div class="col-md-3">
                        <h5 class="card-title">${panierItem.name}</h5>
                        <p class="card-text">${panierItem.vernis}</p>
                        <p class="card-text">${prix.toFixed(2)}€</p>
                    </div>
                    <div class="d-flex flex-row">
                        <span onclick="pushOneItem(event.currentTarget)" data-id="${panierItem.id}" data-vernis="${panierItem.vernis}" aria-label="ajoute"><i class="fas fa-plus-circle"></i></span>
                        <p class="card-text">${panierItem.count}</p>
                        <span onclick="removeOneItem(event.currentTarget)" data-id="${panierItem.id}" data-vernis="${panierItem.vernis}" aria-label="diminu"><i class="fas fa-minus-circle"></i></span>
                    </div>
                    <div class="col-md-2">
                        <p class="card-text prix-total">${prixTotalArticle} €</p>
                        <button onclick="removeItem(event.currentTarget)" data-id="${panierItem.id}" data-vernis="${panierItem.vernis}" type="button" class="close" aria-label="Close">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>`;
        contenuePanier.innerHTML += articlePanier;
    };
    checkPanierVide();
    displayPrixTotal();
    showTotalInPanier()
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
    console.log(prixTotalPanier);
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
    savePanier(panier); // sauvgarde du json dans le local storage via panierHelper
    displayPanier();
};

// Affichage du formulaire au click sur le btn Command
const formCommand = document.getElementById('form');
const btnCommand = document.getElementById('command');
btnCommand.addEventListener('click', function() {
    formCommand.classList.remove("d-none");
    btnCommand.classList.add("d-none");
});

// récup du contenu panier + injection dans l'array products
let panier = getPanier();
console.log(panier);
let products = [];
panier.forEach(element => {
    products.push(element.id)
    console.log("dans le forEach",element.id);
});
console.log("produits = ", products)

// Gestion validation du formulaire
let form = document.getElementById('form-command');

const btnValidCommand = document.getElementById('btn-valid-command');
btnValidCommand.addEventListener('click', submitOrder);
btnValidCommand.addEventListener('click', modalConfirm);


function submitOrder(e) {
    e.preventDefault();
    let xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    xmlhttp.open("POST", "http://localhost:3000/api/furniture/order");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            let resp = JSON.parse(this.responseText);
            console.log("response",resp); 
        }
    };
    xmlhttp.send(JSON.stringify({
        contact: {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            address: form.address.value,
            city: form.city.value,
            email: form.email.value
        },
        products
    }));
};

function modalConfirm(){
    let modal = 
    `
    <!-- Modal -->
    <div class="modal fade" id="modalConfirm" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Confirmation de commande</h5>
            <p>Commande n° 402-3269817-2310705</p>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          Nous vous remercions de votre commande. Nous vous tiendrons informé par e-mail 
          lorsque les articles de votre commande auront été expédiés. Votre date de livraison 
          estimée est indiquée ci-dessous. Vous pouvez suivre l’état de votre commande
          ou modifier celle-ci dans Vos commandes sur Amazon.fr. 
          </div>
          <div class="modal-footer">
            <button onclick="pageAccueil()" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `
    document.querySelector('.container').innerHTML = modal;
};

function pageAccueil() {
    document.location.href = "index.html"
}


console.log("jarrive ici",prixTotalPanier);