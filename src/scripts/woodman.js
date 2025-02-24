import GathererCrafter from "./base/gatherer-crafter.js";

export default class Woodman {
    constructor(controller) {
        this.controller = controller;

        this.bases = {
            gathererCrafter: new GathererCrafter(controller, {
                gatherPosition: [-1, 0],
                craftPosition: [-2, -3],
                gatherSkillName: 'woodcutting',
                gatherItemCode: 'ash_wood',
                craftItemCode: 'ash_plank',
                craftItemCount: 2,
                craftItemRatio: 10
            })
        };        
    }

    async start() {
        this.controller.say('Woodman mode');

        let run = true;
    
        while (run) {
            await this.controller.getCharacter();

            await this.bases.gathererCrafter.gatherAndCraft();
        }
    }
};
