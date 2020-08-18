let contenuePanier = document.getElementById('stock-panier');
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
}

function removeItem(e) {
    let panier = getPanier();
    let itemId = e.dataset.id;
    let itemVernis = e.dataset.vernis
    let itemFilter = panier.filter(function(item) {
        if(item.id != itemId || item.vernis != itemVernis){
            return true;
        }  
    });
    savePanier(itemFilter);
    displayPanier();
};

function displayPrixTotal() {
    const sousTotalPrix = document.querySelector('.total-prix');
    sousTotalPrix.textContent = prixTotalPanier + "€";
    console.log(prixTotalPanier); 
};


function checkPanierVide() {
    if (prixTotalPanier === 0) {
        let message =
            `<div class="text-center">
            <h2>Votre panier est vide</h2>
        </div>`;
        contenuePanier.innerHTML = message;
        localStorage.removeItem('panier');
    }
};

function pushOneItem(e) {
    let panier = getPanier(); // decodage du json du local storage via panierHelper
    let itemId = e.dataset.id;
    let itemVernis = e.dataset.vernis;
    // on cherche dans notre panier si un élément similaire existe déja
    for (panierItem of panier) {
        if (panierItem.id == itemId && panierItem.vernis == itemVernis) { // similaire si même id et même vernis
            panierItem.count += 1;
        }
    };
    savePanier(panier); // sauvgarde du json dans le local storage via panierHelper
    displayPanier();
};

function removeOneItem(e) {
    let panier = getPanier(); // decodage du json du local storage via panierHelper
    let itemId = e.dataset.id;
    let itemVernis = e.dataset.vernis;
    // on cherche dans notre panier si un élément similaire existe déja
    for (panierItem of panier) {
        if (panierItem.count > 1 && panierItem.id == itemId && panierItem.vernis == itemVernis) { // similaire si même id et même vernis
            panierItem.count--;
        }
    };
    savePanier(panier); // sauvgarde du json dans le local storage via panierHelper
    displayPanier();
};
    
   