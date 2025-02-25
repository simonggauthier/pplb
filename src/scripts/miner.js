import GathererCrafter from "./base/gatherer-crafter.js";
import Banker from "./base/banker.js";

export default class Miner {
    constructor(controller) {
        this.controller = controller;

        this.bases = [
            new Banker(controller, {
                bankPosition: [4, 1],
                itemCodesToBank: ['copper'],
                itemThreshold: 10
            }),
            new GathererCrafter(controller, {
                gatherPosition: [2, 0],
                craftPosition: [1, 5],
                gatherSkillName: 'mining',
                gatherItemCode: 'copper_ore',
                craftItemCode: 'copper',
                craftItemCount: 2,
                craftItemRatio: 10
            })
        ];
    }

    async start() {
        this.controller.say('Miner mode');

        let run = true;

        while (run) {
            for (let base of this.bases) {
                await this.controller.getCharacter();

                await base.start();
            }
        }
    }
};
