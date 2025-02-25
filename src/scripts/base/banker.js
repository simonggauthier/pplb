export default class Banker {
    constructor(controller, options) {
        this.controller = controller;
        this.options = options;
    }

    async start() {
        for (let itemCodeToBank of this.options.itemCodesToBank) {
            const count = this.controller.getInventoryItemCount(itemCodeToBank);

            if (count >= this.options.itemThreshold) {
                this.controller.say('Banking ' + count + ' ' + itemCodeToBank);

                await this.controller.moveTo(this.options.bankPosition[0], this.options.bankPosition[1]);
                await this.controller.depositToBank(itemCodeToBank, count);
            }
        }
    }
};
