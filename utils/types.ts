type Transaction = {
  id: number;
  date: string;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  loan_request_id: number;
};

type Profile = {
  id: string;
  cvv: string;
  city: string;
  town: string;
  email: string;
  gender: string;
  last_name: string;
  first_name: string;
  expiry_date: string;
  house_number: string;
  phone_number: string;
  date_of_birth: string;
  credit_card_name: string;
  source_of_income: string;
  credit_card_number: string;
  net_income_per_month: number;
};

export type LoanRequest = {
  id: number;
  created_at: string;
  updated_at: string;
  selected_period: number;
  requested_amount: number;
  interest_rate: number;
  total_amount_to_pay: number;
  installment_per_month: number;
  user_id: string;
  status: string;
  transactions: Transaction[];
  profile: Profile;
};