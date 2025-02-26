import GathererCrafter from "./base/gatherer-crafter.js";
import Banker from "./base/banker.js";

export default class Fisherman {
    constructor(controller) {
        this.controller = controller;

        this.bases = [
            new Banker(controller, {
                bankPosition: [4, 1],
                itemCodesToBank: ['cooked_gudgeon', 'algae'],
                itemThreshold: 10,
                itemCodesToWithdraw: ['gudgeon']
            }),
            new GathererCrafter(controller, {
                gatherPosition: [4, 2],
                craftPosition: [1, 1],
                gatherSkillName: 'fishing',
                gatherItemCode: 'gudgeon',
                craftItemCode: 'cooked_gudgeon',
                craftItemCount: 20,
                craftItemRatio: 1
            })
        ];
    }

    async start() {
        this.controller.say('Fisherman mode');

        while (this.controller.running) {
            for (let base of this.bases) {
                await this.controller.getCharacter();

                await base.start();
            }
        }
    }
};
