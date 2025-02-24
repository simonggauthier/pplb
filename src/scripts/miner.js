import GathererCrafter from "./base/gatherer-crafter.js";

export default class Miner {
    constructor(controller) {
        this.controller = controller;

        this.bases = {
            gathererCrafter: new GathererCrafter(controller, {
                gatherPosition: [2, 0],
                craftPosition: [1, 5],
                gatherSkillName: 'mining',
                gatherItemCode: 'copper_ore',
                craftItemCode: 'copper',
                craftItemCount: 2,
                craftItemRatio: 10
            })
        };        
    }

    async start() {
        this.controller.say('Miner mode');

        let run = true;
    
        while (run) {
            await this.controller.getCharacter();

            await this.bases.gathererCrafter.gatherAndCraft();
        }
    }
};
