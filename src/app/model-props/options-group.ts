/**
 * Represents a group of options, typically used for categorized dropdowns or selectable lists.
 *
 * @interface OptionsGroup
 *
 * @property {string} title - The title of the group, providing context or categorization for the options.
 * @property {OptionItem[]} items - An array of option items within this group.
 */

import { OptionItem } from "./option-item";

export type OptionsGroup = {
  title: string;
  items: OptionItem[];
};
