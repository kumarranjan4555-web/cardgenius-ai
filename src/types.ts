export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  joiningFee: number;
  annualFee: number;
  benefits: string[];
  cashbackRate: { [category: string]: number };
  interestRate: number;
  latePaymentFee: number;
  minIncome: number;
  minCibil: number;
  applyUrl: string;
  image: string;
  loungeAccess: string;
  cashbackCap: string;
  rewardRedemption: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
}

export interface SpendData {
  food: number;
  shopping: number;
  fuel: number;
  bills: number;
  travel: number;
}
