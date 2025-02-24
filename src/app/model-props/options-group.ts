import { OptionItem } from "./option-item";

/**
 * Represents a group of options, typically used for categorized dropdowns or selectable lists.
 * @interface OptionsGroup
 */
export type OptionsGroup = {

  /**
   * The title of the group, providing context or categorization for the options.
   * @type {string}
   */
  title: string;

  /** 
   * An array of option items within this group.
   * @type {OptionItem[]}
   */
  items: OptionItem[];
};
