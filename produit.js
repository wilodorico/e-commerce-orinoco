let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let item = JSON.parse(this.responseText);
        const main = document.getElementById('main');
        //console.log(response);
        //console.log(item.name);
        let prix = item.price / 100;
        let card =
            `<div class="card mb-3" style="max-width: 768px;">
            <div class="row no-gutters">
              <div class="col-md-6">
                <img src="${item.imageUrl}" class="card-img" alt="${item.name}">
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.description}</p>
                  <label for="vernis">Selectionne le Vernis</label>
                    <select id="vernis" class="form-control form-control-sm"></select>
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <small class="text-muted">${prix.toFixed(2)} €</small>
                    <button id="ajout-panier" data-id="${item._id}" type="button" class="btn btn-sm btn-secondary">Ajouter au panier</button>
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
        btnAjoutPanier.addEventListener('click', function(e){
            stockPanier(e);
            //console.log("ajout au panier");
        });
    }
};
const urlParam = new URLSearchParams(window.location.search);
//console.log(urlParam.get('id'));
request.open("GET", "http://localhost:3000/api/furniture/" + urlParam.get('id'));
request.send();
const panier = document.getElementById('panier');

function stockPanier(e){
    const selectVernis = document.getElementById('vernis');
    // selectVernis.value;
    // let nombreProduit = localStorage.getItem('produits');
    // nombreProduit = parseInt(nombreProduit);
    // localStorage.setItem('produits', 1);
    let keyPanier = e.target.dataset.id + '-' + selectVernis.value;
    let valeurPanier = localStorage.getItem(keyPanier);
    console.log(valeurPanier);
    if (valeurPanier === null) {
        valeurPanier = document.getElementById('panier').textContent = 1;
    } else {
        valeurPanier = parseInt(valeurPanier) + 1;
        document.getElementById('panier').textContent = valeurPanier;
    }
    localStorage.setItem(keyPanier, valeurPanier);
    console.log(e.target.dataset.id);
    console.log(selectVernis.value);

    console.log('---------------');

    for (let key in localStorage) {
      if(!localStorage.hasOwnProperty(key))
      continue
      console.log(key, localStorage.getItem(key));
      console.log(key.split('-'));
        // if (localStorage.getItem(key)) {
        //     console.log(key);
        //     console.log(localStorage.getItem(key));
        //     console.log(key.split('-'));
        //     console.log('_');
        // }
    }
}
//document.getElementById('vernis').value; recupérer le vernis selectionné pour panier