/**
 * Represents a user registered in the application.
 *
 * @interface User
 *
 * @property {string} emailUser - The email address of the user.
 * @property {string} firstNameUser - The first name of the user.
 * @property {string} idCustomer - The unique identifier of the customer associated with the user.
 * @property {string} idContactCustomer - The unique identifier of the user's contact within the customer's organization.
 * @property {string} idUser - The unique identifier for the user.
 * @property {string} industry - The industry in which the user operates.
 * @property {string} lastNameUser - The last name of the user.
 * @property {string} nameQustomer - The name of the customer organization.
 * @property {string} aliasCustumer - The alias or short name for the customer organization.
 * @property {string} phoneNumberUser - The phone number of the user.
 * @property {string} userName - The username for identification purposes is the same as email address.
 * @property {string} department - The department in which the user works within the organization.
 * @property {string} position - The job position or title of the user within the organization.
 * @property {string} taxId - The tax (RFC) identification number associated with the user.
*/

export type User = {
  emailUser: string;
  firstNameUser: string;
  idCustomer: string;
  idContactCustomer: string;
  idUser: string;
  industry: string;
  lastNameUser: string;
  nameQustomer: string;
  aliasCustumer: string;
  phoneNumberUser: string;
  userName: string;
  department: string;
  position: string;
  taxId: string;
};
