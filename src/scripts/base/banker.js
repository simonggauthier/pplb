export default class Banker {
    constructor(controller, options) {
        this.controller = controller;
        this.options = options;
    }

    async start() {
        if (this.options.itemCodeToBank) {
            for (let itemCodeToBank of this.options.itemCodesToBank) {
                const count = this.controller.getInventoryItemCount(itemCodeToBank);
    
                if (count >= this.options.itemThreshold) {
                    this.controller.say('Banking ' + count + ' ' + itemCodeToBank);
    
                    await this.controller.moveTo(this.options.bankPosition[0], this.options.bankPosition[1]);
                    await this.controller.depositToBank(itemCodeToBank, count);
                }
            }
        }

        if (this.options.itemCodesToWithdraw) {
            const bankItems = await this.controller.getBankItems();

            for (let itemCodeToWithdraw of this.options.itemCodesToWithdraw) {
                for (let bankItem of bankItems) {
                    if (bankItem['code'] === itemCodeToWithdraw) {
                        this.controller.say('Withdrawing ' + this.options.itemCountToWithdraw + ' ' + itemCodeToWithdraw);
    
                        await this.controller.moveTo(this.options.bankPosition[0], this.options.bankPosition[1]);
                        await this.controller.withdrawFromBank(itemCodeToWithdraw, this.options.itemCountToWithdraw);
                    }
                }
            }
        }
    }
};
