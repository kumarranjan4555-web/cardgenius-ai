import { CreditCard } from './types';

export const CREDIT_CARDS: CreditCard[] = [
  {
    id: 'hdfc-millennia',
    name: 'HDFC Millennia',
    bank: 'HDFC Bank',
    joiningFee: 1000,
    annualFee: 1000,
    benefits: ['5% Cashback on Amazon, Flipkart', '1% Cashback on all other spends', '8 Lounge access per year'],
    cashbackRate: { shopping: 5, food: 1, fuel: 1, bills: 1, travel: 1 },
    interestRate: 3.6,
    latePaymentFee: 1300,
    minIncome: 35000,
    minCibil: 750,
    applyUrl: 'https://www.hdfcbank.com/',
    image: 'https://images.unsplash.com/photo-1540339832862-4745a9805ad0?auto=format&fit=crop&q=80&w=400&h=250'
  },
  {
    id: 'axis-indian-oil',
    name: 'Axis Indian Oil RuPay',
    bank: 'Axis Bank',
    joiningFee: 500,
    annualFee: 500,
    benefits: ['4% Cashback on IOCL Fuel', '1% Fuel Surcharge Waiver', 'Works on UPI RuPay Card', '₹250 Welcome Cashback'],
    cashbackRate: { shopping: 1, food: 1, fuel: 4, bills: 1, travel: 1 },
    interestRate: 3.4,
    latePaymentFee: 1000,
    minIncome: 20000,
    minCibil: 700,
    applyUrl: 'https://www.axisbank.com/',
    image: 'https://royalaiprompt.com/wp-content/uploads/2026/03/ChatGPT-Image-Mar-25-2026-10_08_03-PM.png'
  },
  {
    id: 'sbi-cashback',
    name: 'SBI Cashback Card',
    bank: 'SBI Card',
    joiningFee: 999,
    annualFee: 999,
    benefits: ['5% Cashback on online spends', '1% Cashback on offline spends', 'No joining fee for first year'],
    cashbackRate: { shopping: 5, food: 5, fuel: 1, bills: 1, travel: 5 },
    interestRate: 3.5,
    latePaymentFee: 1100,
    minIncome: 30000,
    minCibil: 720,
    applyUrl: 'https://www.sbicard.com/',
    image: 'https://picsum.photos/seed/sbi/400/250'
  },
  {
    id: 'axis-ace',
    name: 'Axis Bank ACE',
    bank: 'Axis Bank',
    joiningFee: 499,
    annualFee: 499,
    benefits: ['5% Cashback on Bill payments via GPay', '4% Cashback on Swiggy, Zomato', '2% Cashback on all other spends'],
    cashbackRate: { shopping: 2, food: 4, fuel: 1, bills: 5, travel: 2 },
    interestRate: 3.4,
    latePaymentFee: 1000,
    minIncome: 25000,
    minCibil: 700,
    applyUrl: 'https://www.axisbank.com/',
    image: 'https://picsum.photos/seed/axis/400/250'
  },
  {
    id: 'icici-amazon-pay',
    name: 'Amazon Pay ICICI',
    bank: 'ICICI Bank',
    joiningFee: 0,
    annualFee: 0,
    benefits: ['5% Cashback for Prime members on Amazon', '2% Cashback on Amazon Pay partners', 'Lifetime free card'],
    cashbackRate: { shopping: 5, food: 2, fuel: 1, bills: 2, travel: 2 },
    interestRate: 3.5,
    latePaymentFee: 1200,
    minIncome: 25000,
    minCibil: 720,
    applyUrl: 'https://www.icicibank.com/',
    image: 'https://picsum.photos/seed/icici/400/250'
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'Best Credit Card for Beginners in India (2024)',
    excerpt: 'Starting your credit journey? Here are the top 5 cards that are easy to get and offer great rewards.',
    image: 'https://picsum.photos/seed/blog1/800/400'
  },
  {
    id: 2,
    title: 'How to Avoid Paying Interest on Credit Cards',
    excerpt: 'Master the art of credit card management and never pay a single rupee in interest again.',
    image: 'https://picsum.photos/seed/blog2/800/400'
  }
];
