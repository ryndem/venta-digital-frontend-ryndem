import { Address } from "./address";

/**
 * Represents the response containing a list of addresses.
 *
 * @interface AddressResponse
 *
 * @property {number} totalResults - The total number of addresses available in the response.
 * @property {Address[]} results - An array of address objects.
 */
export type AddressResponse = {
  totalResults: number;
  results: Address[];
};
