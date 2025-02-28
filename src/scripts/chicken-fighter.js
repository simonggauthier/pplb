import BankerIn from './base/banker-in.js';
import BankerOut from './base/banker-out.js';
import Healer from "./base/healer.js";
import Fighter from "./base/fighter.js";

export default class ChickenFighter {
    constructor(controller) {
        this.controller = controller;

        this.bases = [
            new BankerOut(controller, {
                bankPosition: [4, 1],
                itemCodesNeeded: ['cooked_gudgeon'],
                itemThreshold: 7,
                itemPickupCount: 30
            }),
            new BankerIn(controller, {
                bankPosition: [4, 1],
                itemCodesToBank: ['feather', 'raw_chicken', 'egg'],
                itemThreshold: 20
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
        await this.controller.mainLoop('Chicken Fighter', this.bases);
    }
};
