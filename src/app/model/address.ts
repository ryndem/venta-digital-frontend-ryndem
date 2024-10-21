export type Address = {
  idAddress: string;
  address?: string;
  acceptPartials?: boolean;
};

export type AddressResponse = {
  totalResults: number;
  results: Address[];
};
