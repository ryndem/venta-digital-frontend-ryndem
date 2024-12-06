/**
 * Represents a file associated with an order, containing metadata and status information.
 *
 * @interface OrderFile
 *
 * @property {string} idFile - The unique identifier for the file.
 * @property {string} registrationDate - The date the file was registered in ISO format.
 * @property {boolean} active - Indicates whether the file is active or not.
 * @property {string} fileKey - The unique key associated with the file, used for file identification or retrieval.
 * @property {string} lastUpdateDate - The date the file was last updated in ISO format.
*/

export type OrderFile = {
  idFile: string;
  registrationDate: string;
  active: boolean;
  fileKey: string;
  lastUpdateDate: string;
};
