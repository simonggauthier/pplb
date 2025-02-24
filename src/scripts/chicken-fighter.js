export default class ChickenFighter {
    constructor(controller) {
        this.controller = controller;
    }

    async start() {
        this.controller.say('Chicken fighting mode');

        if (!this.controller.at(0, 1)) {
            await this.controller.moveTo(0, 1);
        }
    
        let run = true;
    
        while (run) {
            await this.controller.getCharacter();
    
            // If health < 70% rest
            if (this.controller.getHp() < (this.controller.getMaxHp() * 0.7)) {
                this.controller.say('My health is low, resting.');
                await this.controller.rest();
            } else {
                this.controller.say('Grinding xp!');
                await this.controller.fight();
            }
        }
    }
};
