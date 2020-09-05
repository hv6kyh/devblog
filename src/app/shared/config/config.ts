import { environment } from './../../../environments/environment';

export let API_URL = null;

if (environment.production) {
} else {
  API_URL = 'http://localhost:3000/dev/api';
}
