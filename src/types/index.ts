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
  user?: {
    id: string;
    name: string;
    roleId: number;
    school: {
      id: string;
      name: string
    }
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

// export interface Payment {
//   id: string;
//   termName: string;
//   amount: string;
//   paymentDate: string;
//   termId?: string
// }

export interface Payment {
  id: string;
  termName: string;
  studentName: string;
  className: string;
  amount: string;
  status: string;
  paymentDate: string;
  termId?: string; // Assuming termId might be added later
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaymentResponse {
  current_page: number;
  data: Payment[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}



export interface StudentItemProps {
  id: string;
  selected?: boolean;
  count?: number;
  totalItems?: number;
  amount: string;
  paymentDate?: string;
  studentName: string;
  termName: string;
  studentClass: string;
  balances?: string;
}

export interface Fee {
  termName: string;
  termId: string;
  termFees: number;
  additionalFees: number;
  discounts: number;
  totalPaid: number;
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
  school_id: string | null;
  term_id: string;
  amount: number | null;
  // payment_method: string;
}

export interface RegisterProps {
  name: string;
  email: string;
  school_id?: string;
  phone?: string;
  address?: string;
  valid_id: string;
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
  user: {
    id: string;
    name: string;
    email: string;
    roleId: number;
    school: {
      id: string;
      name: string
    }
  };
}


export interface StudentProps {
  name: string;
  parent_id: string;
  class_id: string;
  school_id: string | undefined;
  gender: string;
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

export interface StatisticsProps {
  totalStudents: number;
  studentsOwing: number;
  studentsPaid: number;
}

export interface paymentStatusStatistics {
  successful: number;
  failed: number;
  pending: number;
  totalAmount: number;
}


export interface School {
  message?: string | undefined;
  schools:{   id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    terms_per_academic_year?: number;
    created_at?: string;
    updated_at?: string;
  }

}

export interface PaymentData {
  schoolName: string;
  successfulPayments: number;
}

export interface OtpProps {
 data: string | null;
}

export interface SchoolRequestProps {
    name: string;
    address: string;
    phone: string;
    email: string;
    terms_per_academic_year?: number;
    created_at?: string;
    updated_at?: string;
}

export interface ClassFeeProp {
  name: string
  amount: number
  academic_year_id: string | undefined,
  school_id: string | undefined,
  class_id: string | undefined,
  due_date: string
}


export interface CreateAcademicYearRequest {
  school_id: string;
  name: string;
  start_date: string; // ISO date string
  end_date: string;   // ISO date string
  is_current?: boolean;
}

export interface AcademicYearResponse {
  message: string;
  academic_year: {
    id: string;
    name: string;
    school_id: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    created_at: string;
    updated_at: string;
  };
}