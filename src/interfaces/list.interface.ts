import { ITheme } from './theme.interface';

export interface IList {
  id: string;
  title: string;
  theme: ITheme;
  type: 'preset' | 'custom';
  icon: string;
}
