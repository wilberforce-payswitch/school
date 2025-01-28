import { LucideIcon } from "lucide-react";

export interface AdminTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  maxCount?: number;
  maxPage?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loading?: any;
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

export interface ClassItemProps {
  id: string;
  studentClass: string;
  numberOfStudents: number;
  fees: number;
  count: number;
  totalItems?: number;
}

export interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  // isCollapsed: boolean
}

export interface TransactionstatuscardProps {
  backgroundColor?: string;
  borderColor?: string;
  caption: string;
  count: number | string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    roleId: number;
  };
}

export interface SchoolClass {
  id: string;
  name: string;
  description: string | null;
}
export interface Students {
  id: string;
  name: string;
  className: string | null;
  parentName: string | null;
}

export interface Payment {
  id: string;
  termName: string;
  amount: string;
  paymentDate: string;
  termId?: string
}

export interface StudentItemProps {
  id: string;
  selected?: boolean;
  count: number;
  totalItems?: number;
  amount: string;
  paymentDate: string;
  studentName: string;
  termName: string;
  studentClass: string;
  balances?: string;
}

export interface Fee {
  termName: string;
  termId: string;
  termFees: string;
  totalPaid: string;
  balanceDue: number;
}

export interface PaymentHistoryProps {
  studentName: string;
  studentId: string;
  loading: unknown;
  balances: Fee[];
}

export interface PayFeesProps {
  student_id: string | null;
  term_id: string;
  amount: number | null;
  payment_method: string;
}

export interface RegisterProps {
  name: string;
  email: string;
}

export interface AdminResponse {
  message: string;
  admin: {
    id: string;
    name: string;
    email: string;
    roleId: number;
  };
}
export interface ParentResponse {
  message: string;
  parent: {
    id: string;
    name: string;
    email: string;
    roleId: number;
  };
}


export interface StudentProps {
  name: string;
  parent_id: string;
  class_id: string;
}

type Term = {
  id: string;
  name: string;
  fee_amount: string;
  start_date: string;
  end_date: string;
  class_id: string;
  created_at?: string;
  updated_at?: string;
};

type Class = {
  id: string;
  name: string;
  studentsCount: number;
  totalFees: string;
  terms: Term[];
};

export interface CreateClassResponse  {
  message: string;
  class: Class;
};
