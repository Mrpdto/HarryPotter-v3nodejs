const prisma = require('../config/prisma')

class CardsController {

    async getUserCards(req, res) {

        try {
            
            const user = req.user;

            const cards = await prisma.userCard.findMany({
                where: {
                    userId: user.id
                },
                select: {
                    cardId: true,
                    quantity: true,
                }
            })

            console.log(cards);

            if (!cards) return res.status(404).json({ message: 'No cards found' });

            let total = 0;
            cards.forEach(card => total += card.quantity);

            return res.status(200).json({cards, total});

        } catch (error) {
            
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new CardsController();