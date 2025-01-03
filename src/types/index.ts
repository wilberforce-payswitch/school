import { LucideIcon } from "lucide-react";

export interface AdminTableProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
    maxCount?: number;
    maxPage?: number;
  }



  export interface AdminItemProps {
    id: string;
    studentname: string;
    studentimage?: string;
    studentclass: string;
    term: string;
    payment: string;
    balances: string;
    count: number;
    totalItems?: number;
    selected?: boolean;
  }

  export interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    // isCollapsed: boolean
  }

 export  interface TransactionstatuscardProps {
    backgroundColor?: string;
    borderColor?: string;
    caption: string;
    count: string;
  }