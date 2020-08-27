"use strict";

function getPanier() {
  var panierData = localStorage.getItem("panier");

  if (panierData === null) {
    return [];
  } else {
    return JSON.parse(panierData);
  }
}

;

function savePanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
}

;

function showTotalInPanier() {
  var localPanier = getPanier();
  var totalPanier = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = localPanier[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var panierItem = _step.value;
      var totalArticle = panierItem.count;
      totalPanier += totalArticle;
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

  var panier = document.getElementById('panier');
  panier.textContent = totalPanier;
}

;