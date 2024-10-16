export interface IMenuItem {
    title: string;
    icon: string;
    link?: string;
  
    hideFor?: string;
  
    expanded?: boolean;
    subMenu?: IMenuItem[];
  }
  
  export type IMenu = IMenuItem[];