import GathererCrafter from "./base/gatherer-crafter.js";
import Banker from "./base/banker.js";

export default class Alchemist {
    constructor(controller) {
        this.controller = controller;

        this.bases = [
            new Banker(controller, {
                bankPosition: [4, 1],
                itemCodesToBank: ['small_health_potion'],
                itemThreshold: 10,
                itemCodesToWithdraw: ['sunflower']
            }),
            new GathererCrafter(controller, {
                gatherPosition: [2, 2],
                craftPosition: [2, 3],
                gatherSkillName: 'alchemy',
                gatherItemCode: 'sunflower',
                craftItemCode: 'small_health_potion',
                craftItemCount: 10,
                craftItemRatio: 3
            })
        ];
    }

    async start() {
        this.controller.say('Alchemist mode');

        let run = true;

        while (run) {
            for (let base of this.bases) {
                await this.controller.getCharacter();

                await base.start();
            }
        }
    }
};
