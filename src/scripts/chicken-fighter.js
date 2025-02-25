import Healer from "./base/healer.js";
import Fighter from "./base/fighter.js";

export default class ChickenFighter {
    constructor(controller) {
        this.controller = controller;

        this.bases = [
            new Healer(controller, {
                healRatio: 0.7
            }),
            new Fighter(controller, {
                fightPosition: [0, 1]
            })
        ]
    }

    async start() {
        this.controller.say('Chicken fighting mode');

        let run = true;

        while (run) {
            for (let base of this.bases) {
                await this.controller.getCharacter();

                await base.start();
            }
        }
    }
};
