export default class Healer {
    constructor(controller, options) {
        this.controller = controller;
        this.options = options;
    }

    async start() {
        while (this.controller.getHp() < this.controller.getMaxHp() * this.options.healRatio) {
            if (this.options.healFoodItemCode &&
                this.controller.getInventoryItemCount(this.options.healFoodItemCode) > 0) {
                this.controller.say('Eating ' + this.options.healFoodItemCode);
                
                await this.controller.useItem(this.options.healFoodItemCode);
                await this.controller.getCharacter();
            } else {
                this.controller.say('Resting');
                
                await this.controller.rest();
            }
        }
    }
};
