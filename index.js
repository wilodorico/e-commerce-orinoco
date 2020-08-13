// Requête API
let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        const main = document.getElementById('main');
        //console.log(response);
        
// Boucle récupération des données produits
        for (const item of response) {
            let prix = item.price / 100;
            //console.log(item.name);
            let card = 
            `<div class="col-lg-4 col-md-6">
                <div class="card m-3 shadow border-0">
                    <img class="card-img-top" src="${item.imageUrl}" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <a href="produit.html?id=${item._id}" type="button" class="btn btn-sm btn-secondary">Voir le produit</a>
                  </div>
                  <small class="text-muted">${prix.toFixed(2)} €</small>
                </div>
              </div>
            </div>
          </div>`;
            main.innerHTML += card;
            //console.log(item.name);
        }
    }
};
request.open("GET", "http://localhost:3000/api/furniture");
request.send();

showTotalInPanier();
