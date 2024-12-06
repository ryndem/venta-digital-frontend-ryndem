/**
 * Represents a category with a label, description, and icon.
 *
 * @interface Category
 *
 * @property {string | undefined} key (Optional) - The unique key identifier for the category, if applicable.
 * @property {string} iconPath - The path to the icon representing the category.
 * @property {string} label - The display label for the category.
 * @property {string} description - A brief description of the category.
 */

export type Category = {
  key?: string;
  iconPath: string;
  label: string;
  description: string;
};
