/**
 * Represents a status track element on a order item, includes status, date of the status update and a sort value.
 *
 * @interface OrderItemStatusTrack
 *
 * @property {string} statusTracking - Status updated.
 * @property {string} dateTracking - Date of the update.
 * @property {number} sort - Sorting value of the updates.
*/

export type OrderItemStatusTrack = {
  statusTracking: string;
  dateTracking: string;
  sort: number;
};
