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

                // When banking, check if we can pick up items
                const bankItems = await this.controller.getBankItems();

                if (this.options.itemCodesToWithdraw) {
                    for (let itemCodeToWithdraw of this.options.itemCodesToWithdraw) {
                        for (let bankItem of bankItems) {
                            if (bankItem['code'] === itemCodeToWithdraw) {
                                const count = this.controller.getInventoryItemCount(itemCodeToWithdraw);
            
                                await this.controller.withdrawFromBank(itemCodeToWithdraw, count);
                            }
                        }
                    }
                }
            }
        }
    }
};
