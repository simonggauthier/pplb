#!/usr/bin/env bash

rm *.log

npm run main PepinLeBref fight > pepinlebref.log &
npm run main Marmotte cut > marmotte.log &
npm run main Pinson mine > pinson.log &
npm run main NatPeggle fish > natpeggle.log &
npm run main Snapette alch > snapette.log &
