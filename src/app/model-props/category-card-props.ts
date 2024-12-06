/**
 * Represents the properties for a category card component.
 *
 * @interface CategoryCardProps
 *
 * @property {string | undefined} key (Optional) - The unique key identifier for the category card, if applicable.
 * @property {string} iconPath - The path to the icon representing the category.
 * @property {string} label - The display label for the category card.
 * @property {string} description - A brief description of the category.
*/

export type CategoryCardProps = {
  key?: string;
  iconPath: string;
  label: string;
  description: string;
};
