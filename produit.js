let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let item = JSON.parse(this.responseText);
        const main = document.getElementById('main');
        //console.log(response);
        //console.log(item.name);
            let prix = item.price / 100;
            
            let card = 
            `<div class="col-lg-4 col-md-6">
                <div class="card m-3 shadow border-0">
                    <img class="card-img-top" src="${item.imageUrl}" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-secondary">Voir le produit</button>
                  </div>
                  <small class="text-muted">${prix.toFixed(2)} €</small>
                  <select id="vernis"></select>
                </div>
              </div>
            </div>
          </div>`;
            main.innerHTML += card;

            const vernis = document.getElementById('vernis');
            for(let choice of item.varnish){
              vernis.innerHTML += '<option value="'+ choice +'">'+ choice +'</option>';
            }
            //console.log(item);
        
    }
};
const urlParam = new URLSearchParams(window.location.search);
//console.log(urlParam.get('id'));


request.open("GET", "http://localhost:3000/api/furniture/" + urlParam.get('id'));
request.send();

//document.getElementById('vernis').value; recupérer le vernis selectionné pour panier






