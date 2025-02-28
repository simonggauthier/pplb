import GathererCrafter from "./base/gatherer-crafter.js";
import BankerIn from "./base/banker-in.js";

export default class Alchemist {
    constructor(controller) {
        this.controller = controller;

        this.bases = [
            new BankerIn(controller, {
                bankPosition: [4, 1],
                itemCodesToBank: ['small_health_potion'],
                itemThreshold: 30,
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
        await this.controller.mainLoop('Alchemist', this.bases);
    }
};
