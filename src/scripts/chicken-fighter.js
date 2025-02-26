import Banker from "./base/banker.js";
import Healer from "./base/healer.js";
import Fighter from "./base/fighter.js";

export default class ChickenFighter {
    constructor(controller) {
        this.controller = controller;

        this.bases = [
            new Banker(controller, {
                bankPosition: [4, 1],
                itemCodesToWithdraw: ['cooked_gudgeon'],
                itemCountToWithdraw: 10
            }),
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
        this.controller.say('Chicken fighting mode');

        while (this.controller.running) {
            for (let base of this.bases) {
                await this.controller.getCharacter();

                await base.start();
            }
        }
    }
};
