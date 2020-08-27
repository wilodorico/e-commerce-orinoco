// Appel API avec la method fetch
const main = document.getElementById('main');
fetch("http://localhost:3000/api/furniture/").then(response => {
  if(response.ok) {
    return response.json();
  } else {
    return Promise.reject(response.status);
  }  
})
.then(data => {
  for (const item of data) {
            let prix = item.price / 100;
            let card = 
                `<article class="col-lg-4 col-md-6">
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
              </article>`;
                main.innerHTML += card;
                //console.log(item)
  }
}).catch(err => console.log(`Erreur message : ${err}`));
showTotalInPanier();