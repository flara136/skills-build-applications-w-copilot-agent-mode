import { app, apiBaseUrl } from './server';

app.listen(8000, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});