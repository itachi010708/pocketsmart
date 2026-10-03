export type Currency = 'INR' | 'USD';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  createdAt: string;
}

export interface SessionData {
  last_home_budget?: {
    timestamp: string;
    budget: number;
    requirements: Record<string, any>;
  };
  last_party_budget?: {
    timestamp: string;
    budget: number;
    party_type: string;
    guests: number;
  };
  last_jewelry_budget?: {
    timestamp: string;
    budget: number;
    occasion: string;
    has_image: boolean;
  };
  [key: string]: any;
}

// Shopping Links dictionary
export interface ShoppingLinks {
  amazon?: string;
  flipkart?: string;
  ikea?: string;
  myntra?: string;
  ajio?: string;
  swiggy?: string;
  zomato?: string;
  bigbasket?: string;
  bookmyshow?: string;
  meesho?: string;
  google?: string;
  booking?: string;
  makemytrip?: string;
  oyorooms?: string;
  nobroker?: string;
  bluestone?: string;
  tanishq?: string;
  caratlane?: string;
  melorra?: string;
  [key: string]: string | undefined;
}

// 1. Home Interior Planner Types
export interface HomeBudgetInput {
  total_budget: number;
  currency?: Currency;
  num_lights: number;
  num_fans: number;
  num_furniture: number;
  num_dining_tables: number;
  rooms: {
    living_room: boolean;
    kitchen: boolean;
    bedroom: boolean;
    bathroom?: boolean;
    balcony?: boolean;
  };
  additional_requirements?: string;
}

export interface HomeBudgetItem {
  name: string;
  description: string;
  estimated_price: number;
  quantity: number;
  search_terms: string;
  shopping_links?: ShoppingLinks;
}

export interface HomeBudgetCategory {
  category: string;
  allocation: number;
  items: HomeBudgetItem[];
}

export interface CalculationTableEntry {
  category: string;
  items_count: number;
  total_cost: number;
  percentage_of_budget: number;
}

export interface HomeBudgetResult {
  total_budget: number;
  allocated_budget: number;
  remaining_budget: number;
  budget_breakdown: HomeBudgetCategory[];
  calculation_table?: CalculationTableEntry[];
  additional_suggestions: string[];
}

// 2. Party Planner Types
export interface PartyBudgetInput {
  total_budget: number;
  currency?: Currency;
  num_guests: number;
  party_type: string;
  venue_type: string;
  needs_catering: boolean;
  needs_decoration: boolean;
  needs_entertainment: boolean;
  needs_photography?: boolean;
  needs_favors?: boolean;
  additional_requirements?: string;
}

export interface PartyBudgetItem {
  name: string;
  description: string;
  estimated_price: number;
  quantity?: number;
  search_terms: string;
  shopping_links?: ShoppingLinks;
}

export interface PartyBudgetCategory {
  category: string;
  allocation: number;
  items: PartyBudgetItem[];
}

export interface VenueSuggestion {
  name: string;
  type: string;
  capacity: number;
  estimated_cost: number;
  search_terms: string;
  search_links?: ShoppingLinks;
}

export interface PartyBudgetResult {
  total_budget: number;
  allocated_budget: number;
  remaining_budget: number;
  budget_breakdown: PartyBudgetCategory[];
  venue_suggestions: VenueSuggestion[];
  calculation_table_inr?: CalculationTableEntry[];
  additional_suggestions: string[];
}

// 3. Jewelry Planner Types
export interface JewelryBudgetInput {
  total_budget: number;
  currency?: Currency;
  occasion: string;
  preferences?: string;
  outfit_image_url?: string;
  outfit_image_base64?: string;
}

export interface OutfitAnalysis {
  colors: string;
  style: string;
  formality: string;
}

export interface JewelryItem {
  item_type: string;
  description: string;
  style: string;
  estimated_price: number;
  search_terms: string;
  shopping_links?: ShoppingLinks;
}

export interface JewelryBudgetResult {
  total_budget: number;
  allocated_budget: number;
  remaining_budget: number;
  outfit_analysis?: OutfitAnalysis;
  jewelry_recommendations: JewelryItem[];
  styling_tips: string[];
}

// History
export interface HistoryRecord {
  id: string;
  timestamp: string;
  type: 'home' | 'party' | 'jewelry';
  title: string;
  total_budget: number;
  remaining_budget: number;
  currency: Currency;
  input_summary: Record<string, any>;
  result: HomeBudgetResult | PartyBudgetResult | JewelryBudgetResult;
}
