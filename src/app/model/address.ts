/**
 * Represents an address entity.
 *
 * @interface Address
 *
 * @property {string} idAddress - The unique identifier for the address.
 * @property {string | undefined} address (Optional) - The full or partial address.
 * @property {boolean | undefined} acceptPartials (Optional) - Indicates whether partial addresses are acceptable.
*/

export type Address = {
  idAddress: string;
  address?: string;
  acceptPartials?: boolean;
};
