## Install
- Copy `.env.sample` to `.env`
- Install dependencies `npm i`
- Run `npm run dev`
- Api should be ready via http://localhost:3000
- Online version: https://express-typescript-rest-api.herokuapp.com/

## Notes
- This project is tested with Node 10 (some newer versions may not work, see https://github.com/strongloop/loopback-next/issues/5381)
- Due to lack of time only some unit tests are added. The remaining unit tests should be pretty similar though.
- For simplicity, this project is not implemented with high security standards. Especially JWT implementation.
- Records are stored in memory. So when the app is restarted all data will be deleted.
