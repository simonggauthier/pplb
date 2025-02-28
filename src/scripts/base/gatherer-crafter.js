export default class GathererCrafter {
    constructor(controller, options) {
        this.controller = controller;
        this.options = options;
    }

    getName() {
        return 'GathererCrafter';
    }

    async start() {
        await this.craft();
        await this.gather();
    }

    async craft() {
        while (this.controller.getInventoryItemCount(this.options.gatherItemCode) >= this.options.craftItemRatio * this.options.craftItemCount) {
            this.controller.say('Crafting ' + this.options.craftItemCode);

            const count = Math.floor(this.controller.getInventoryItemCount(this.options.gatherItemCode) / this.options.craftItemRatio);

            await this.controller.moveTo(this.options.craftPosition[0], this.options.craftPosition[1]);
            await this.controller.craft(this.options.craftItemCode, count);

            await this.controller.getCharacter();
        }
    }

    async gather() {
        this.controller.say('Gathering ' + this.options.gatherItemCode + ', LVL ' + this.controller.getSkillLevel(this.options.gatherSkillName));

        await this.controller.moveTo(this.options.gatherPosition[0], this.options.gatherPosition[1]);
        await this.controller.gather();
    }
};
