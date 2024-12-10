/**
 * Represents a collection of category information, where each key is a string representing the category name,
 * and the value is a string representing the associated information.
 *
 * @interface CategoryInfo
 *
 * @property {string} [key: string] - A dynamic property where the key represents the category name,
 * and the value is a string containing the associated information.
*/
export interface CategoryInfo {
  [key: string]: string;
}
