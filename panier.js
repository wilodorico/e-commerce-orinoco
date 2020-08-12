let contenuePanier = document.getElementById('stock-panier');
let prixTotalPanier = 0;
displayPanier();

function displayPanier() {

    prixTotalPanier = 0;
    contenuePanier.innerHTML = `        <div class="row titre-element">
    <h5 class="col-4 mr-4 text-center">Produit</h5>
    <h5 class="col-2 text-center">Vernis</h5>
    <h5 class="col-1">Prix</h5>
    <h5 class="col-2">Quantité</h5>
    <h5 class="col-1">Total</h5>
</div>`;

    let panier = getPanier();
    for (let panierItem of panier) {

        let prix = panierItem.prix / 100;
        let prixTotalArticle = prix * panierItem.count;
        prixTotalPanier += prixTotalArticle;
        let articlePanier =
            `<div class="border-bottom mb-4">
                <div class="row">
                  <div class="col-md-2">
                        <img id="image" src="${panierItem.img}" class="card-img mb-3" alt="photo ${panierItem.name}">
                  </div>
                  <div class="col-md-2 ml-3">
                        <h5 class="card-title">${panierItem.name}</h5>
                    </div>
                    <div class="col-md-2 ml-1 text-center">
                        <p class="card-text">${panierItem.vernis}</p>
                    </div>
                    <div class="col-md-1 ml-1">
                        <p class="card-text">${prix.toFixed(2)}€</p>
                    </div>
                    <div class="col-md-1 ml-1">
                        <p class="card-text">${panierItem.count}</p>
                    </div>
                    <div class="col-md-2 ml-1">
                        <p class="card-text prix-total">${prixTotalArticle} €</p>
                        <button onclick="removeItem(event.currentTarget)" data-test="eeed" data-id="eee" type="button" class="close" aria-label="Close">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                  </div>
                </div>
              </div>`;

        contenuePanier.innerHTML += articlePanier;
    };

    checkPanierVide();
    displayPrixTotal();
}



function removeItem(e) {
    console.log(e.dataset);
}

function displayPrixTotal() {

    console.log(prixTotalPanier);
}

function checkPanierVide() {
    if (localStorage.length === 0) {
        let message =
            `<div class="text-center">
            <h2>Votre panier est vide</h2>
        </div>`;
        contenuePanier.innerHTML = message;
    }
};