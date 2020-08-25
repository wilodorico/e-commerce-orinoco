"use strict";

// Appel API avec la method fetch
var main = document.getElementById('main');
fetch("http://localhost:3000/api/furniture/").then(function (response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response.status);
  }
}).then(function (data) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      var prix = item.price / 100;
      var card = "<div class=\"col-lg-4 col-md-6\">\n                    <div class=\"card m-3 shadow border-0\">\n                        <img class=\"card-img-top\" src=\"".concat(item.imageUrl, "\" alt=\"").concat(item.name, "\">\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">").concat(item.name, "</h5>\n                    <div class=\"d-flex justify-content-between align-items-center\">\n                      <div class=\"btn-group\">\n                        <a href=\"produit.html?id=").concat(item._id, "\" type=\"button\" class=\"btn btn-sm btn-secondary\">Voir le produit</a>\n                      </div>\n                      <small class=\"text-muted\">").concat(prix.toFixed(2), " \u20AC</small>\n                    </div>\n                  </div>\n                </div>\n              </div>");
      main.innerHTML += card; //console.log(item)
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
})["catch"](function (err) {
  return console.log("Erreur message : ".concat(err));
});
showTotalInPanier();