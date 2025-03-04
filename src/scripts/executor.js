export default class Executor {
    constructor(controller, options) {
        this.controller = controller;
        this.options = options;
    }

    getName() {
        return 'Executor';
    }

    async start() {
        this.controller.say('Executing');

        let total = 1;
        const page = 99;

        while (total > 0) {
            await this.controller.moveTo(4, 1);
            await this.controller.depositToBank('small_health_potion', page / 3);

            await this.controller.moveTo(4, 1);
            await this.controller.withdrawFromBank('sunflower', 43);

            await this.controller.moveTo(2, 3);
            await this.controller.craft('small_health_potion', 14);

            total -= page;
        }
    }
};
