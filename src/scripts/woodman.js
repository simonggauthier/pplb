import GathererCrafter from "./base/gatherer-crafter.js";
import Banker from "./base/banker.js";

export default class Woodman {
    constructor(controller) {
        this.controller = controller;

        this.bases = [
            new Banker(controller, {
                bankPosition: [4, 1],
                itemCodesToBank: ['ash_plank', 'sap'],
                itemThreshold: 10
            }),
            new GathererCrafter(controller, {
                gatherPosition: [-1, 0],
                craftPosition: [-2, -3],
                gatherSkillName: 'woodcutting',
                gatherItemCode: 'ash_wood',
                craftItemCode: 'ash_plank',
                craftItemCount: 2,
                craftItemRatio: 10
            })
        ];
    }

    async start() {
        this.controller.say('Woodman mode');

        let run = true;

        while (run) {
            for (let base of this.bases) {
                await this.controller.getCharacter();

                await base.start();
            }
        }
    }
};
