import Controller from './src/controller.js';
import ChickenFighter  from './src/scripts/chicken-fighter.js';
import Woodman from './src/scripts/woodman.js';
import Log from './src/log.js';

const characters = [
    {
        name: 'PepinLeBref',
        script: (controller) => {
            return new ChickenFighter(controller);
        }
    },
    {
        name: 'Marmotte',
        script: (controller) => {
            return new Woodman(controller);
        }
    }
];

async function main () {
    const args = process.argv.slice(2);
    const log = new Log('info');
    const character = characters.find((c) => c.name === args[0]);
    const controller = new Controller(character.name, log);

    await controller.getCharacter();

    controller.sayStatus();

    character.script(controller).start();
}

main();
