import { httpServer } from '../src/index.js';

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
