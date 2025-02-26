import axios from 'axios';

export default class Api {
    constructor(token, characterName, log, erroHandler) {
        this.baseUrl = 'https://api.artifactsmmo.com';
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token['token']
        };
        
        this.token = token;
        this.characterName = characterName;
        this.log = log;
        this.erroHandler = erroHandler;
    }

    async post(url, data) {
        this.log.debug(' - Post to ' + this.baseUrl + url);
        this.log.debug(' - With headers: ');
        this.log.debug(this.headers);

        return axios.post(this.baseUrl + url, data, {
            headers: this.headers
        }).catch(e => {
            this.erroHandler.handle(e);
        });
    }

    async get(url) {
        this.log.debug(' - Get to ' + this.baseUrl + url);
        this.log.debug(' - With headers: ');
        this.log.debug(this.headers);

        return axios.get(this.baseUrl + url, {
            headers: this.headers
        }).catch(e => {
            this.erroHandler.handle(e);
        });
    }

    printError(e) {
        if (e.response) {
            this.log.error(e.response.data);
            this.log.error(e.response.status);
        }
    }

    async getCharacter() {
        return await this.get('/characters/' + this.characterName);
    }

    async moveTo(x, y) {
        return await this.post('/my/' + this.characterName + '/action/move', {
            x,
            y
        })
    }

    async fight() {
        return await this.post('/my/' + this.characterName + '/action/fight');
    }

    async rest() {
        return await this.post('/my/' + this.characterName + '/action/rest');
    }

    async gather() {
        return await this.post('/my/' + this.characterName + '/action/gathering');
    }

    async craft(code, quantity) {
        return await this.post('/my/' + this.characterName + '/action/crafting', {
            code,
            quantity
        })
    }

    async depositToBank(code, quantity) {
        return await this.post('/my/' + this.characterName + '/action/bank/deposit', {
            code,
            quantity
        });
    }

    async getBankItems() {
        return await this.get('/my/bank/items');
    }

    async withdrawFromBank(code, quantity) {
        return await this.post('/my/' + this.characterName + '/action/bank/withdraw', {
            code,
            quantity
        });
    }

    async crash() {
        return await this.post('/crash');
    }
}
