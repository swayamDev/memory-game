document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    { name: "demon-slayer", img: "assets/tanjiro.jpg" },
    { name: "aot", img: "assets/eren.jpg" },
    { name: "naruto", img: "assets/naruto.webp" },
    { name: "one-piece", img: "assets/luffy.webp" },
    { name: "bleach", img: "assets/ichigo.webp" },
    { name: "dragon-ball", img: "assets/goku.jpg" },
    { name: "demon-slayer", img: "assets/tanjiro.jpg" },
    { name: "aot", img: "assets/eren.jpg" },
    { name: "naruto", img: "assets/naruto.webp" },
    { name: "one-piece", img: "assets/luffy.webp" },
    { name: "bleach", img: "assets/ichigo.webp" },
    { name: "dragon-ball", img: "assets/goku.jpg" },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".game-grid");
  const scoreDisplay = document.getElementById("score");
  const messageDisplay = document.getElementById("message");

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  function createBoard() {
    cardArray.forEach((_, i) => {
      const card = document.createElement("img");
      card.setAttribute("src", "assets/sukuna.jpg");
      card.setAttribute("data-id", i);
      card.classList.add("card");
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    });
  }

  function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const [id1, id2] = cardsChosenId;
    const [card1, card2] = [cards[id1], cards[id2]];

    if (id1 === id2) {
      showMessage("You clicked the same card!", "error");
      resetCards(card1, card2);
    } else if (cardsChosen[0] === cardsChosen[1]) {
      showMessage("Match found!", "success");
      disableCards(card1, card2);
      cardsWon.push(cardsChosen);
    } else {
      showMessage("Not a match. Try again.", "error");
      resetCards(card1, card2);
    }

    cardsChosen = [];
    cardsChosenId = [];
    updateScore();
  }

  function flipCard() {
    const cardId = this.getAttribute("data-id");
    if (cardsChosenId.length < 2 && !cardsChosenId.includes(cardId)) {
      this.setAttribute("src", cardArray[cardId].img);
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);

      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  function resetCards(card1, card2) {
    setTimeout(() => {
      card1.setAttribute("src", "assets/sukuna.jpg");
      card2.setAttribute("src", "assets/sukuna.jpg");
    }, 500);
  }

  function disableCards(card1, card2) {
    card1.setAttribute("src", "assets/gojo.jpg");
    card2.setAttribute("src", "assets/gojo.jpg");
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
  }

  function updateScore() {
    scoreDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      showMessage("Congratulations! You found them all!", "success");
    }
  }

  function showMessage(message, type) {
    messageDisplay.textContent = message;
    messageDisplay.style.color = type === "success" ? "#9ef01a" : "#d62828";
    setTimeout(() => (messageDisplay.textContent = ""), 1500);
  }

  createBoard();
});
