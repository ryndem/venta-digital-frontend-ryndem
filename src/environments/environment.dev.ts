/**
 * Object to specify variables for DEV environment
 * @property {boolean} production Bolean to specify if the environment is production env
 * @property {string} apiUrl API Url
 * @property {string} authApiUrl Auth API Url
 * @property {string} fileBucket Bucket to store uploaded files
 * @property {string} baseUrl App base Url
 */
export const environment = {
  production: false,
  apiUrl: 'https://172.24.32.36:446/VentaDigital',
  authApiUrl: 'https://172.24.32.36:9001',
  fileBucket: 'mailbot',
  baseUrl: 'https://172.24.32.36:446/VentaDigitalFront/#'
};
