export type ControlPosition = 'left' | 'right';

export enum EControlPosition {
  left = 'left',
  right = 'right',
}

export interface StatusFilterItem {
  id?: string;
  isDisabled?: boolean;
  isSelected: boolean;
  text: string;
}
