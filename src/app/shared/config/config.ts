import { environment } from './../../../environments/environment';

export let API_URL = null;

if (environment.production) {
  API_URL = 'https://api.kimyoungho.ml/api';
} else {
  API_URL = 'http://localhost:3000/dev/api';
}
