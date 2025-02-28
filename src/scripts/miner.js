import GathererCrafter from "./base/gatherer-crafter.js";
import BankerIn from "./base/banker-in.js";

export default class Miner {
    constructor(controller) {
        this.controller = controller;

        this.bases = [
            new BankerIn(controller, {
                bankPosition: [4, 1],
                itemCodesToBank: ['copper', 'emerald_stone', 'topaz_stone', 'ruby_stone', 'sapphire_stone'],
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
        await this.controller.mainLoop('Miner', this.bases);
    }
};
