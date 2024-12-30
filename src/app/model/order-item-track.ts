/**
 * Represents a status track element on a order item, includes status, date of the status update and a sort value.
 *
 * @interface OrderItemStatusTrack
 *
 * @property {string} Seguimiento - Status updated.
 * @property {string} FechaRegistro - Date of the update.
 * @property {number} Orden - Sorting value of the updates.
*/

export type OrderItemStatusTrack = {
  Seguimiento: string;
  FechaRegistro: string;
  Orden: number;
};
