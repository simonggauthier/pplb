export default class Healer {
    constructor(controller, options) {
        this.controller = controller;
        this.options = options;
    }

    async start() {
        while (this.controller.getHp() < (this.controller.getMaxHp() * this.options.healRatio)) {
            this.controller.say('My health is low, healing.');
            
            await this.controller.rest();
            await this.controller.getCharacter();
        }
    }
};
