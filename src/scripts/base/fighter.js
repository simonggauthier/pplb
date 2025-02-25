export default class Fighter {
    constructor(controller, options) {
        this.controller = controller;
        this.options = options;
    }

    async start() {
        this.controller.say('Fighting!');

        await this.controller.moveTo(this.options.fightPosition[0], this.options.fightPosition[1]);
        await this.controller.fight();
    }
};
