"use strict";

var urlParam = new URLSearchParams(window.location.search);
var main = document.getElementById('main'); // Requête API

fetch("http://localhost:3000/api/furniture/" + urlParam.get('id')).then(function (response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response.status);
  }
}).then(function (item) {
  //console.log(item)
  var prix = item.price / 100;
  var card = "<div class=\"card mb-3\" style=\"max-width: 1024px;\">\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <img id=\"image\" src=\"".concat(item.imageUrl, "\" class=\"card-img\" alt=\"").concat(item.name, "\">\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"card-body\">\n            <h5 class=\"card-title\">").concat(item.name, "</h5>\n            <p class=\"card-text\">").concat(item.description, "</p>\n            <label for=\"vernis\">Selectionne le Vernis</label>\n              <select id=\"vernis\" class=\"form-control form-control-sm\"></select>\n            <div class=\"d-flex justify-content-between align-items-center mt-3\">\n              <small id=\"prix\" class=\"text-muted\">").concat(prix.toFixed(2), " \u20AC</small>\n              <button id=\"ajout-panier\" type=\"button\" class=\"btn btn-sm btn-secondary\">Ajouter au panier</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>");
  main.innerHTML += card;
  var vernis = document.getElementById('vernis');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = item.varnish[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var choice = _step.value;
      vernis.innerHTML += '<option value="' + choice + '">' + choice + '</option>';
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

  var btnAjoutPanier = document.getElementById('ajout-panier');
  btnAjoutPanier.addEventListener('click', function (e) {
    // Ajout au panier au click 
    stockPanier(e);
    showTotalInPanier(); // récupere le nommbre total au panier et l'affiche dans le header
    //console.log("ajout au panier");
  });

  function stockPanier() {
    var panier = getPanier(); // decodage du json du local storage via panierHelper

    var allreadyInBasket = false; // on cherche dans notre panier si un élément similaire existe déja

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = panier[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        panierItem = _step2.value;

        if (panierItem.id == item._id && panierItem.vernis == vernis.value) {
          // similaire si même id et même vernis
          panierItem.count += 1;
          allreadyInBasket = true;
          break;
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

    if (!allreadyInBasket) {
      panier.push({
        id: item._id,
        name: item.name,
        img: item.imageUrl,
        prix: item.price,
        vernis: vernis.value,
        count: 1
      });
    }

    savePanier(panier); // sauvegarde du json dans le local storage via panierHelper
  }

  ;
})["catch"](function (err) {
  return console.log("Erreur message : ".concat(err));
});
showTotalInPanier();