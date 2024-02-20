let total = 0;

function addKundvagn(bilnamn,pris) {
  console.log("tjenixen ", bilnamn, " ", pris);
  total += pris;
  document.querySelector("#cart-items").innerHTML +=
    "<li>" + bilnamn + " - " + pris + " kr</li>";
  document.getElementById("cart-total").textContent = total.toFixed(2);
}
