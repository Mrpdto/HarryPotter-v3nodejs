const prisma = require("../config/prisma");

// 1. Créer 5 fois un nombre random entre [1, array.length] puis les push dans un tableau
// 2. Tu ajoutes ou modifies la relation entre la carte et l'utilisateur
//    - Vérifier si l'utlisateur a déjà la carte
// 3. Renvoies le tableau de données vers le front

class BoosterController {
  async openBooster(req, res) {
    try {
      const user = req.user;
    //   console.log(user)

      if (Number(user.booster) - Date.now() > 0)
        return res.status(400).json({ message: "Your booster is not ready." });

      const response = await fetch("https://hp-api.lainocs.fr/characters");
      const cardsData = await response.json();

      const numberOfCards = 5;
      let tableau = [];

      // 1. Créer 5 fois un nombre random entre [1, array.length]
      for (let i = 0; i < numberOfCards; i++) {
        let randomNumber = Math.floor(Math.random() * cardsData.length - 1);
        // Pour chaque carte de notre tableau, vérifier si l'utlisateur la possède déjà.
        const hasCard = await prisma.userCard.findFirst({
          where: {
            userId: user.id,
            cardId: cardsData[randomNumber].id,
          },
        });

        // Si il n'a pas la carte :
        if (!hasCard) {
          // On crée une relation
          await prisma.userCard.create({
            data: {
              userId: user.id,
              cardId: cardsData[randomNumber].id,
            },
          });

          // Sinon on incrémente la quantité de 1
        } else {
          await prisma.userCard.update({
            where: {
              userId_cardId: {
                userId: user.id,
                cardId: cardsData[randomNumber].id,
              },
            },
            data: {
              quantity: {
                increment: 1,
              },
            },
          });
        }

        // Push les données de la carte dans un tableau
        tableau.push({
          id: cardsData[randomNumber].id,
          name: cardsData[randomNumber].name,
          house: cardsData[randomNumber].house,
          image: cardsData[randomNumber].image,
        });
      }

      // Mettre à jour le prochain booster de l'utlisateur
      const refreshBooster = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          booster: (Date.now() + 1000 * 60 * 60 * 24).toString(),
        },
        select: {
          booster: true,
        },
      });

      return res
        .status(200)
        .json({ cards: tableau, nextBooster: refreshBooster.booster });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async resetBooster(req, res) {
    try {
      const { id, booster } = req.user;

      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          booster: "0",
        },
      });

      return res
        .status(200)
        .json({ message: "The booster has been successfully reseted." });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = new BoosterController();