import Banker from "./base/banker.js";
import Healer from "./base/healer.js";
import Fighter from "./base/fighter.js";

export default class ChickenFighter {
    constructor(controller) {
        this.controller = controller;

        this.bases = [
            new Healer(controller, {
                healRatio: 0.7,
                healFoodItemCode: 'cooked_gudgeon'
            }),
            new Fighter(controller, {
                fightPosition: [0, 1]
            })
        ]
    }

    async start() {
        await this.controller.mainLoop('Chicken Fighter', this.bases);
    }
};
