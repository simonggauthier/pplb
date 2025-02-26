import Api from './api.js';
import token from '../token.json' with { type: 'json' };

function cd(obj) {
    return obj.data['data']['cooldown'];
}

export default class Controller {
    constructor(characterName, log) {
        this.characterName = characterName;
        this.log = log;

        this.character = null;

        this.running = true;

        this.errorCount = 0;
        this.maxErrors = 3;

        this.api = new Api(token, characterName, log, {
            handle: (error) => {
                this.say('Error: ' + error.message);

                this.errorCount++;

                if (this.errorCount >= this.maxErrors) {
                    this.say('Too many errors, crashing...');
                    this.running = false;
                }
            }
        });
    }

    say(msg) {
        this.log.info(this.characterName + ": " + msg);
    }

    sayStatus() {
        this.say('Hello, I\'m at ' + this.character.x + ', ' + this.character.y);
        this.say('I\'m level ' + this.character['level'] + ', ' + 
                 this.character['hp'] + '/' + this.character['max_hp'] + ' HP');
    }

    at(x, y) {
        return this.character['x'] === x && this.character['y'] === y;
    }

    onCooldown() {
        return this.character['cooldown'] > 0;
    }

    getHp() {
        return this.character['hp'];
    }

    getMaxHp() {
        return this.character['max_hp'];
    }

    getInventory() {
        return this.character['inventory'];
    }

    getInventoryItemCount(code) {
        let ret = 0;

        this.getInventory().forEach(item => {
            if (item['code'] === code) {
                ret = item['quantity'];
                return;
            }
        });

        return ret;
    }

    getSkillLevel(skillName) {
        return this.character[skillName + '_level'];
    }

    async wait(seconds) {
        this.say('Waiting for ' + seconds + ' seconds...');

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, (seconds + 1) * 1000)
        });
    }

    async waitForCooldown(cooldown) {
        await this.wait(cooldown['remaining_seconds']);
    }

    async getCharacter() {
        this.character = await this.api.getCharacter();
        this.character = this.character.data.data;

        return this.character;
    }

    async moveTo(x, y) {
        if (this.character['x'] === x && this.character['y'] === y) {
            this.say('Already at ' + x + ', ' + y);

            return;
        }

        this.say('Moving to ' + x + ', ' + y);

        const result = await this.api.moveTo(x, y);

        await this.waitForCooldown(cd(result));
    }

    async fight() {
        this.say('Fight!');

        const result = await this.api.fight();
        const fight = result.data.data['fight'];

        this.say(fight['result'] === 'win' ? 'Won ' + fight['xp'] + 'xp, ' + fight['gold'] + 'g' : 'Lost :(');

        fight['drops'].forEach(drop => {
            this.say('\tGot ' + drop['quantity'] + ' ' + drop['code']);
        });

        await this.waitForCooldown(cd(result));
    }

    async rest() {
        this.say('Resting...');

        const result = await this.api.rest();

        await this.waitForCooldown(cd(result));
    }

    async gather() {
        this.say('Gathering');

        const result = await this.api.gather();

        const gather = result.data.data['details'];

        gather['items'].forEach(item => {
            this.say('\tGot ' + item['quantity'] + ' ' + item['code']);
        });

        await this.waitForCooldown(cd(result));
    }

    async craft(code, quantity) {
        this.say('Crafting ' + quantity + ' ' + code);

        const result = await this.api.craft(code, quantity);
        const craft = result.data.data['details'];

        craft['items'].forEach(item => {
            this.say('\tGot ' + item['quantity'] + ' ' + item['code']);
        });

        await this.waitForCooldown(cd(result));
    }

    async getBankItems() {
        const result = await this.api.getBankItems();

        return result.data.data;
    }

    async depositToBank(code, quantity) {
        this.say('Depositing ' + quantity + ' ' + code + ' to bank');

        const result = await this.api.depositToBank(code, quantity);
 
        await this.waitForCooldown(cd(result));
    }

    async withdrawFromBank(code, quantity) {
        this.say('Withdrawing ' + quantity + ' ' + code + ' from bank');

        const result = await this.api.withdrawFromBank(code, quantity);

        await this.waitForCooldown(cd(result));
    }

    async useItem(code) {
        this.say('Using ' + code);

        const result = await this.api.useItem(code);

        await this.waitForCooldown(cd(result));
    }

    async crash() {
        await this.api.crash();
    }
};
