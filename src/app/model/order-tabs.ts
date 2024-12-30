/**
 * Represents a tab in the order interface, including its key, title, and an empty state message.
 * @interface OrderTab
*/
export interface OrderTab {

  /**
   * A unique key identifier for the tab.
   * @type {string}
   */
  key: string;

  /**
   * The title of the tab, displayed in the user interface.
   * @type {string}
   */
  title: string;

  /**
   * The message displayed when the tab has no content.
   * @type {string}
   */
  emptyMessage: string;
}
