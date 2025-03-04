/**
 * Object to specify variables for UAT environment
 * @property {boolean} production Bolean to specify if the environment is production env
 * @property {string} apiUrl API Url
 * @property {string} authApiUrl Auth API Url
 * @property {string} fileBucket Bucket to store uploaded files
 * @property {string} baseUrl App base Url
 */
export const environment = {
  production: true,
  apiUrl: 'https://172.24.32.47:446/VentaDigital',
  authApiUrl: 'https://172.24.32.47:9001',
  fileBucket: 'mailbot',
  baseUrl: 'https://172.24.32.47:444/VentaDigitalFront/#'
};
