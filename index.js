let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        const main = document.getElementById('main');
        console.log(response);

        for (const item of response) {
            console.log(item.name);
            let card = 
                `<div class="card">
                    <img class="card-img-top" src="${item.imageUrl}" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>`;
            main.innerHTML += card;
        }
    }
};
request.open("GET", "http://localhost:3000/api/furniture");
request.send();


const urlParam = new URLSearchParams(window.location.search);
console.log(urlParam.get("id"));

