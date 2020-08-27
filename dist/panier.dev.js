"use strict";

var contenuePanier = document.getElementById('stock-panier');
var prixTotalPanier = 0;
displayPanier();

function displayPanier() {
  prixTotalPanier = 0;
  contenuePanier.innerHTML = "<div class=\"border-bottom mb-4\">\n        <h2 class=\"h4 font-weight-bold\">Votre panier</h2>\n    </div>";
  var panier = getPanier();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = panier[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _panierItem = _step.value;
      var prix = _panierItem.prix / 100;
      var prixTotalArticle = prix * _panierItem.count;
      prixTotalPanier += prixTotalArticle;
      var articlePanier = "<div class=\"row border-bottom mb-4\">\n                <div class=\"col-md-3\">\n                    <img id=\"image\" src=\"".concat(_panierItem.img, "\" class=\"card-img mb-3\" alt=\"photo ").concat(_panierItem.name, "\">\n                </div>\n                <div class=\"col-md-4\">\n                    <h5 class=\"card-title\">").concat(_panierItem.name, "</h5>\n                    <p class=\"card-text\">").concat(_panierItem.vernis, "</p>\n                    <p class=\"card-text\">").concat(prix.toFixed(2), "\u20AC</p>\n                </div>\n                <div class=\"col-md d-flex align-items-start\">\n                    <button onclick=\"pushOneItem(event.currentTarget)\" data-id=\"").concat(_panierItem.id, "\" data-vernis=\"").concat(_panierItem.vernis, "\" type=\"button\" class=\"close\" aria-label=\"diminu\">\n                    <i class=\"fas fa-plus-circle\"></i>\n                    </button>").concat(_panierItem.count, "\n                    <button onclick=\"removeOneItem(event.currentTarget)\" data-id=\"").concat(_panierItem.id, "\" data-vernis=\"").concat(_panierItem.vernis, "\" type=\"button\" class=\"close\" aria-label=\"diminu\">\n                        <i class=\"fas fa-minus-circle\"></i>\n                    </button>\n                </div>\n                <div class=\"col-md d-flex align-items-start justify-content-between\">\n                    <p class=\"card-text prix-total\">").concat(prixTotalArticle, " \u20AC</p>\n                    <button onclick=\"removeItem(event.currentTarget)\" data-id=\"").concat(_panierItem.id, "\" data-vernis=\"").concat(_panierItem.vernis, "\" type=\"button\" class=\"close\" aria-label=\"Close\">\n                        <i class=\"fas fa-trash-alt\"></i>\n                    </button>\n                </div>\n            </div>");
      contenuePanier.innerHTML += articlePanier;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;
  checkPanierVide();
  displayPrixTotal();
  showTotalInPanier();
}

;

function removeItem(e) {
  var panier = getPanier();
  var itemId = e.dataset.id;
  var itemVernis = e.dataset.vernis;
  var itemFilter = panier.filter(function (item) {
    if (item.id != itemId || item.vernis != itemVernis) {
      return true;
    }
  });
  savePanier(itemFilter);
  displayPanier();
}

;

function displayPrixTotal() {
  var sousTotalPrix = document.querySelector('.prix');
  var totalPrix = document.querySelector('.total-prix');
  sousTotalPrix.textContent = prixTotalPanier + "€";
  totalPrix.textContent = prixTotalPanier + "€";
  console.log(prixTotalPanier);
}

;

function checkPanierVide() {
  if (prixTotalPanier === 0) {
    var message = "<div class=\"text-center\">\n            <h2>Votre panier est vide</h2>\n        </div>";
    contenuePanier.innerHTML = message;
    document.getElementById('total-form').classList.add("d-none");
    localStorage.removeItem('panier');
  }
}

;

function pushOneItem(e) {
  addOrRemoveOneItem(e, true);
}

;

function removeOneItem(e) {
  addOrRemoveOneItem(e, false);
}

;

function addOrRemoveOneItem(e, add) {
  var panier = getPanier(); // decodage du json du local storage via panierHelper

  var itemId = e.dataset.id;
  var itemVernis = e.dataset.vernis; // on cherche dans notre panier si un élément similaire existe déja

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = panier[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      panierItem = _step2.value;

      if (panierItem.id == itemId && panierItem.vernis == itemVernis) {
        // similaire si même id et même vernis
        if (add) {
          panierItem.count++;
        } else if (panierItem.count > 1) {
          panierItem.count--;
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  ;
  savePanier(panier); // sauvgarde du json dans le local storage via panierHelper

  displayPanier();
}

; // Affichage du formulaire au click sur le btnCommand + cache le btnCommand

var formCommand = document.getElementById('form');
var btnCommand = document.getElementById('command');
btnCommand.addEventListener('click', function () {
  formCommand.classList.remove("d-none");
  btnCommand.classList.add("d-none");
}); // récup du contenu panier + injection dans l'array products

var panier = getPanier();
var products = [];
panier.forEach(function (element) {
  products.push(element.id);
  console.log("dans le forEach", element.id);
});
console.log("produits = ", products); // Gestion validation du formulaire

var form = document.getElementById('form-command');
var btnValidCommand = document.getElementById('btn-valid-command');
btnValidCommand.addEventListener('click', submitOrder);
form.addEventListener('change', validInput); // regex verification des inputs

var emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
var nameRegex = new RegExp("^[a-zA-Z '.-]*$");
var addressRegex = new RegExp("^[a-zA-Z0-9 ]{0,10}[ -']{0,1}[a-zA-Z]+");

function validInput() {
  var smallEmail = form.email.nextElementSibling;
  var smallFirstName = form.firstName.nextElementSibling;
  var smallLastName = form.lastName.nextElementSibling;
  var smallAddress = form.address.nextElementSibling;
  var smallCity = form.city.nextElementSibling; // test input lastName

  if (!form.lastName.value) {
    return smallLastName.innerHTML = "Veuillez renseigner votre nom";
  }

  if (nameRegex.test(form.lastName.value)) {
    smallLastName.innerHTML = "valide";
    smallLastName.classList.remove('text-danger');
    smallLastName.classList.add('text-success');
  } else {
    smallLastName.innerHTML = "format non valide";
    smallLastName.classList.remove('text-success');
    smallLastName.classList.add('text-danger');
  }

  ; // test input firstname

  if (!form.firstName.value) {
    return smallFirstName.innerHTML = "Veuillez renseigner votre prénom";
  }

  if (nameRegex.test(form.firstName.value)) {
    smallFirstName.innerHTML = "valide";
    smallFirstName.classList.remove('text-danger');
    smallFirstName.classList.add('text-success');
  } else {
    smallFirstName.innerHTML = "format non valide";
    smallFirstName.classList.remove('text-success');
    smallFirstName.classList.add('text-danger');
  }

  ; // test input adresse

  if (!form.address.value) {
    return smallAddress.innerHTML = "Veuillez renseigner votre adresse";
  }

  if (addressRegex.test(form.address.value)) {
    smallAddress.innerHTML = "valide";
    smallAddress.classList.remove('text-danger');
    smallAddress.classList.add('text-success');
  } else {
    smallAddress.innerHTML = "format non valide";
    smallAddress.classList.remove('text-success');
    smallAddress.classList.add('text-danger');
  }

  ; // test input ville

  if (!form.city.value) {
    return smallCity.innerHTML = "Veuillez renseigner la ville";
  }

  if (addressRegex.test(form.city.value)) {
    smallCity.innerHTML = "valide";
    smallCity.classList.remove('text-danger');
    smallCity.classList.add('text-success');
  } else {
    smallCity.innerHTML = "format non valide";
    smallCity.classList.remove('text-success');
    smallCity.classList.add('text-danger');
  }

  ; // Test de l'input email

  if (!form.email.value) {
    return smallEmail.innerHTML = "Veuillez renseigner votre email";
  }

  if (emailRegex.test(form.email.value)) {
    smallEmail.innerHTML = "email valide";
    smallEmail.classList.remove('text-danger');
    smallEmail.classList.add('text-success');
  } else {
    smallEmail.innerHTML = "format email non valide";
    smallEmail.classList.remove('text-success');
    smallEmail.classList.add('text-danger');
  }
}

;

function submitOrder(e) {
  e.preventDefault(); // verification des tests regex

  if (!nameRegex.test(form.lastName.value) || !nameRegex.test(form.firstName.value) || !addressRegex.test(form.address.value) || !addressRegex.test(form.city.value) || !emailRegex.test(form.email.value)) {
    return;
  } // otptions de la requête API


  var options = {
    method: 'POST',
    body: JSON.stringify({
      contact: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        email: form.email.value
      },
      products: products
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }; // Requête API et affichage de la modal 

  fetch("http://localhost:3000/api/furniture/order", options).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status);
    }
  }).then(function (data) {
    var modal = "<!-- Modal -->\n        <div class=\"modal fade\" id=\"modalConfirm\" tabindex=\"-1\" role=\"dialog\" data-backdrop=\"static\" data-keyboard=\"false\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Confirmation de commande</h5>\n                        <button onclick=\"pageAccueil()\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div class=\"modal-body\">\n                        <p>Nous vous remercions de votre commande N\xB0<strong>".concat(data.orderId, "</strong> d'un montant de <strong>").concat(prixTotalPanier, " \u20AC</strong>. Nous vous tiendrons inform\xE9 par e-mail \n                        lorsque les articles de votre commande auront \xE9t\xE9 exp\xE9di\xE9s.</p>\n                        <p>Au plaisir de vous revoir bient\xF4t.</p>\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button onclick=\"pageAccueil()\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>");
    document.querySelector('.container').innerHTML = modal;
    $('#modalConfirm').modal('show');
    localStorage.clear();
    console.log(data);
  })["catch"](function (err) {
    return console.log("Erreur message : ".concat(err));
  });
}

; // function aller à la page d'accueil

function pageAccueil() {
  document.location.href = "index.html";
}

;