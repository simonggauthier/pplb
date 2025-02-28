import Controller from './src/controller.js';
import ChickenFighter  from './src/scripts/chicken-fighter.js';
import Woodman from './src/scripts/woodman.js';
import Miner from './src/scripts/miner.js';
import Fisherman from './src/scripts/fisherman.js';
import Alchemist from './src/scripts/alchemist.js';
import Executor from './src/scripts/executor.js';
import Log from './src/log.js';

const scripts = [
    {
        name: 'fight',
        make: (controller) => new ChickenFighter(controller)
    },
    {
        name: 'cut',
        make: (controller) => new Woodman(controller)
    },
    {
        name: 'mine',
        make: (controller) => new Miner(controller)
    },
    {
        name: 'fish',
        make: (controller) => new Fisherman(controller)
    },
    {
        name: 'alch',
        make: (controller) => new Alchemist(controller)
    },
    {
        name: 'exec',
        make: (controller) => new Executor(controller)
    }
];

async function main () {
    const args = process.argv.slice(2);
    const log = new Log('info');
    const characterName = args[0];
    const controller = new Controller(characterName, log);
    const script = scripts.find(script => script.name === args[1]);

    await controller.getCharacter();

    controller.sayStatus();

    script.make(controller).start();
}

main();
