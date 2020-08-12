function getPanier() {
    let panierData = localStorage.getItem("panier");
    if (panierData === null) {
        return [];
    } else {
        return JSON.parse(panierData);
    }
}

function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}