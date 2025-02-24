export default class ChickenFighter {
    constructor(controller) {
        this.treePosition = [-1, 0];
        this.craftPosition = [-2, -3];
        this.treeCode = 'ash_wood';
        this.plankCode = 'ash_plank';

        this.controller = controller;
    }

    async start() {
        this.controller.say('Tree cutting mode');

        await this.controller.moveTo(this.treePosition[0], this.treePosition[1]);
        
        let run = true;
    
        while (run) {
            await this.controller.getCharacter();

            await this.craftPlanks();

            await this.controller.gather();
        }
    }

    async craftPlanks() {
        let crafted = false;

        while (this.controller.getInventoryItemCount(this.treeCode) >= 10) {
            this.controller.say('Crafting planks');

            await this.controller.moveTo(this.craftPosition[0], this.craftPosition[1]);
            await this.controller.craft(this.plankCode, 1);

            await this.controller.getCharacter();

            crafted = true;
        }

        if (crafted) {
            await this.controller.moveTo(this.treePosition[0], this.treePosition[1]);
        }
    }
};
