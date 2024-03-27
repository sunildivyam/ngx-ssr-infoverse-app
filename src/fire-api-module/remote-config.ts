import * as express from 'express';
import { firestore, remoteConfig } from 'firebase-admin';
// import { initFireApp } from './fire-utils';
import { RemoteConfigTemplate } from 'firebase-admin/lib/remote-config/remote-config-api';
// import { validateFirebaseIdToken } from './auth-verify';

export const remoteConfigRouter = express.Router();
// initFireApp();

remoteConfigRouter.get('/', async (req, res, next) => {
  const rmtConfig = remoteConfig();
  const rmtConfigTemplate: RemoteConfigTemplate = await rmtConfig.getTemplate();
  res.status(200).send(rmtConfigTemplate);
});

remoteConfigRouter.post('/', async (req, res, next) => {
  const rmtConfig = remoteConfig();
  console.log(req.body);
  try {
    const rmtConfigTemplate: RemoteConfigTemplate =
      await rmtConfig.createTemplateFromJSON(JSON.stringify(req.body));
    res.status(200).send(rmtConfigTemplate);
  } catch (err) {
    res.status(503).send({ messgae: 'Something went wrong', error: err });
  }
});

remoteConfigRouter.post('/publish', async (req, res, next) => {
  const rmtConfig = remoteConfig();
  console.log(req.body);
  try {
    const rmtConfigTemplate: RemoteConfigTemplate =
      await rmtConfig.createTemplateFromJSON(JSON.stringify(req.body));

    const result = await rmtConfig.validateTemplate(rmtConfigTemplate);
    const resultPub = await rmtConfig.publishTemplate(result);

    res.status(200).send(resultPub);
  } catch (err) {
    res.status(503).send({ messgae: 'Something went wrong', error: err });
  }
});
