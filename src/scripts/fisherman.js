import GathererCrafter from "./base/gatherer-crafter.js";
import Banker from "./base/banker.js";

export default class Fisherman {
    constructor(controller) {
        this.controller = controller;

        this.bases = [
            new Banker(controller, {
                bankPosition: [4, 1],
                itemCodesToBank: ['cooked_gudgeon', 'algae'],
                itemThreshold: 10
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
        await this.controller.mainLoop('Fisherman', this.bases);
    }
};
