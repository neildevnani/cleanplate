export type AppetiteLevel = 'light' | 'normal' | 'hearty';

export type DietaryRestriction =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'nut-free'
  | 'halal'
  | 'kosher'
  | 'low-carb'
  | 'keto'
  | 'paleo';

export type CuisinePreference =
  | 'italian'
  | 'mexican'
  | 'chinese'
  | 'japanese'
  | 'indian'
  | 'thai'
  | 'mediterranean'
  | 'american'
  | 'french'
  | 'korean';

export interface HouseholdMember {
  id: string;
  household_id: string;
  name: string;
  appetite_level: AppetiteLevel;
  dietary_restrictions: DietaryRestriction[];
  allergies: string[];
  cuisine_preferences: CuisinePreference[];
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  pantry_item_count: number;
  expiring_soon_count: number;
  current_week_meals: number;
  household_members: number;
}
