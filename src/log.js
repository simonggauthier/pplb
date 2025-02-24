export default class Log {
    constructor(level) {
        this.level = level;
    }

    info(msg) {
        if (this.level === 'info' ||
            this.level === 'debug'
        ) {
            console.log(msg);
        }
    }

    debug(msg) {
        if (this.level === 'debug') {
            console.log(msg);
        }
    }

    error(msg) {
        console.error(msg);
    }
}
