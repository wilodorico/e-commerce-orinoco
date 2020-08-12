let request = new XMLHttpRequest();
let produit = 0;
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let item = JSON.parse(this.responseText);
        produit = item;
        const main = document.getElementById('main');
        //console.log(response);
        //console.log(item.name);
        let prix = item.price / 100;
        let card =
            `<div class="card mb-3" style="max-width: 1024px;">
            <div class="row">
              <div class="col-md-6">
                <img id="image" src="${item.imageUrl}" class="card-img" alt="${item.name}">
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.description}</p>
                  <label for="vernis">Selectionne le Vernis</label>
                    <select id="vernis" class="form-control form-control-sm"></select>
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <small id="prix" class="text-muted">${prix.toFixed(2)} €</small>
                    <button id="ajout-panier" type="button" class="btn btn-sm btn-secondary">Ajouter au panier</button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        main.innerHTML += card;

        const vernis = document.getElementById('vernis');
        for (let choice of item.varnish) {
            vernis.innerHTML += '<option value="' + choice + '">' + choice + '</option>';
        }
        //console.log(item);
        const btnAjoutPanier = document.getElementById('ajout-panier');
        btnAjoutPanier.addEventListener('click', function(e) {
            stockPanier(e);
            //console.log("ajout au panier");
        });
    }
};
const urlParam = new URLSearchParams(window.location.search);
request.open("GET", "http://localhost:3000/api/furniture/" + urlParam.get('id'));
request.send();

function stockPanier(e) {
    //const panier = document.getElementById('panier');
    const selectVernis = document.getElementById('vernis');
    const prix = document.getElementById('prix');
    console.log(prix.textContent)

    let panier = getPanier(); // decodage du json du local storage via panierHelper
    let allreadyInBasket = false;

    // on cherche dans notre panier si un élément similaire existe déja
    for (panierItem of panier) {
        console.log(panierItem);
        if (panierItem.id == produit._id && panierItem.vernis == selectVernis.value) { // similaire si même id et même vernis
            panierItem.count += 1;
            allreadyInBasket = true;
            break;
        }
    }

    if (!allreadyInBasket)
        panier.push({ id: produit._id, name: produit.name, img: produit.imageUrl, prix: produit.price, vernis: selectVernis.value, count: 1 });

    savePanier(panier); // sauvgarde du json dans le local storage via panierHelper
};