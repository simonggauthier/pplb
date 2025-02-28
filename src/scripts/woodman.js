import GathererCrafter from "./base/gatherer-crafter.js";
import BankerIn from "./base/banker-in.js";

export default class Woodman {
    constructor(controller) {
        this.controller = controller;

        this.bases = [
            new BankerIn(controller, {
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
        await this.controller.mainLoop('Woodman', this.bases);
    }
};
