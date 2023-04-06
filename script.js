let quantity;

while (true) {
  quantity = prompt("Digite um número par de 4 a 14.");
  if (quantity >= 4 && quantity <= 14 && quantity % 2 === 0) {
    break;
  } else {
    alert("Número inválido. Digite um número par de 4 a 14.");
  }
}

alert("Número válido: " + quantity);
