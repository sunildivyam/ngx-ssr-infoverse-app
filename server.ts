import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';
import { AppServerModule } from './src/main.server';
import { environment } from './src/environments/environment';
import { env } from 'node:process';

// APIs Routers
import { imagesRouter, usersRouter } from '@annuadvent/ngx-tools/fire-apis';

const setNodeEnv = (): void => {
  // Set Node Environment Variable
  env.NODE_ENV = environment.development
    ? 'development'
    : environment.staging
    ? 'staging'
    : environment.development
    ? 'production'
    : '';

  // Set Firebase Config
  env.FIREBASE_CONFIG = JSON.stringify(environment.appConfig.firebase.app);

  // Set firebase service-account.json path, needed only on dev environment
  if (environment.development) {
    env.FIREBASE_SERVICE_ACCOUNT = join(
      __dirname,
      `../../../../../Annu Advent/Company Meta Info/App- documentation/annu-business-firebase-adminsdk-ae9gz-b22965e21c.json`
    );
  }
};

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  // Set Node Environment Variable
  setNodeEnv();

  const distFolder = join(process.cwd(), 'dist/ngx-ssr-infoverse-app/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // REST APIs endpoints
  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(bodyparser.json());

  server.get('/api', (req, res) => {
    res.status(200).send('Hello API');
  });
  server.use('/api/users', usersRouter);
  server.use('/api/images', imagesRouter);
  server.use('/api/*', (req, res) =>
    res.status(503).send('API url does not exist')
  );

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // Routes that skips server side rendering
  server.get(['/login', '/dashboard', '/dashboard/**'], (req, res) => {
    res.sendFile(join(distFolder, `${indexHtml}`));
  });

  /*
   *All image from /getImage?imageId={} url will be served from firebase storage on prod envs
   * ONLY for DEV env, all images will serve only one image from local assets folder.
   */
  if (environment.development) {
    server.get(['/getImage', '/getImage/**'], (req, res) => {
      const iid = req.query.imageId;
      res.redirect(`/api/images?iid=${iid}`);
      // res.sendFile(join(distFolder, 'assets', 'local-image.jpg'));
    });
  }

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
