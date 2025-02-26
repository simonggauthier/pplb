import GathererCrafter from "./base/gatherer-crafter.js";
import Banker from "./base/banker.js";

export default class Alchemist {
    constructor(controller) {
        this.controller = controller;

        this.bases = [
            new Banker(controller, {
                bankPosition: [4, 1],
                itemCodesToBank: ['sunflower'],
                itemThreshold: 80,
                itemCodesToWithdraw: []
            }),
            new GathererCrafter(controller, {
                gatherPosition: [2, 2],
                craftPosition: [2, 3],
                gatherSkillName: 'alchemy',
                gatherItemCode: 'sunflower',
                craftItemCode: 'small_health_potion',
                craftItemCount: 50000,
                craftItemRatio: 50000
            })
        ];
    }

    async start() {
        this.controller.say('Alchemist mode');

        while (this.controller.running) {
            for (let base of this.bases) {
                await this.controller.getCharacter();

                await base.start();
            }
        }
    }
};
