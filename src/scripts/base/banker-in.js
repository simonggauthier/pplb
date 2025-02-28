export default class BankerIn {
    constructor(controller, options) {
        this.controller = controller;
        this.options = options;
    }

    getName() {
        return 'Banker ->';
    }

    async start() {
        if (this.options.itemCodesToBank) {
            for (let itemCodeToBank of this.options.itemCodesToBank) {
                const count = this.controller.getInventoryItemCount(itemCodeToBank);
    
                if (count >= this.options.itemThreshold) {
                    await this.controller.moveTo(this.options.bankPosition[0], this.options.bankPosition[1]);

                    // Bank all
                    for (let itemCodeToBank2 of this.options.itemCodesToBank) {
                        const count2 = this.controller.getInventoryItemCount(itemCodeToBank2);

                        if (count2 > 0) {
                            this.controller.say('Banking ' + count2 + ' ' + itemCodeToBank2);
                        
                            await this.controller.depositToBank(itemCodeToBank2, count2);
                        }
                    }
                }
            }
        }
    }
};
