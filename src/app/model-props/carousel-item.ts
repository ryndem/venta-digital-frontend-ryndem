/**
 * Represents a carousel item with all resolution info
 * 
 * @interface CarouselItem
 *
 * @property {string} mobile - Banner image path for mobile resolution.
 * @property {string} tablet - Banner image path for table resolution.
 * @property {string} web - Banner image path for web resolution
 * @property {string} action - Action for the banner
 */

export type CarouselItem = {
  mobile: string;
  tablet: string;
  web: string;
  action: string;
};
