export default class BankerOut {
    constructor(controller, options) {
        this.controller = controller;
        this.options = options;
    }

    getName() {
        return 'Banker <-';
    }

    async start() {
        if (this.options.itemCodesNeeded) {
            for (let itemCodeNeeded of this.options.itemCodesNeeded) {
                const count = this.controller.getInventoryItemCount(itemCodeNeeded);

                if (count < this.options.itemThreshold) {
                    this.controller.say('Getting from bank ' + this.options.itemPickupCount + ' ' + itemCodeNeeded);
    
                    await this.controller.moveTo(this.options.bankPosition[0], this.options.bankPosition[1]);
                    await this.controller.withdrawFromBank(itemCodeNeeded, this.options.itemPickupCount);
                }
            }
        }
    }
};
