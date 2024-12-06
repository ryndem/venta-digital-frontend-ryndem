/**
 * Represents an option item for a dropdown or selectable list.
 *
 * @interface OptionItem
 *
 * @property {string | number | undefined} value - The value of the option item. Can be a string, number, or undefined.
 * @property {string | undefined} label - The display label for the option item. Can be a string or undefined.
*/

export type OptionItem = {
  value: string | number | undefined;
  label: string | undefined;
};
