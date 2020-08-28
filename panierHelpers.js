function getPanier() {
    let panierData = localStorage.getItem("panier");
    if (panierData === null) {
        return [];
    } else {
        return JSON.parse(panierData);
    }
};

function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
};

function showTotalInPanier(){
    let localPanier = getPanier();
    let totalPanier = 0;
    for (let panierItem of localPanier) {
        let totalArticle = panierItem.count;
        totalPanier += totalArticle;
    }
    const panier = document.getElementById('panier');
    panier.textContent = totalPanier;
};