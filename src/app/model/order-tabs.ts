/**
 * Represents a tab in the order interface, including its key, title, and an empty state message.
 *
 * @interface OrderTab
 *
 * @property {string} key - A unique key identifier for the tab.
 * @property {string} title - The title of the tab, displayed in the user interface.
 * @property {string} emptyMessage - The message displayed when the tab has no content.
*/
export interface OrderTab {
  key: string;
  title: string;
  emptyMessage: string;
}
