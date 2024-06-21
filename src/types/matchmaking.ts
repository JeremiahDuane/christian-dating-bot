namespace Matchmaking {
  // Enum for Marital Status
  export enum MaritalStatus {
    NEVER_MARRIED = "NEVER MARRIED",
    DIVORCED_ANNULLED = "DIVORCED/ANNULLED",
    WIDOWED = "WIDOWED",
  }

  // Enum for Exercise Frequency
  export enum ExerciseFrequency {
    NEVER = "NEVER",
    INFREQUENTLY = "INFREQUENTLY",
    MILDLY = "MILDLY",
    FREQUENTLY = "FREQUENTLY",
    HEAVILY = "HEAVILY",
  }

  // Enum for VirginalStatus
  export enum VirginalStatus {
    VIRGIN = "VIRGIN",
    NONVIRGIN = "NON-VIRGIN",
  }

  // Enum for KidsStatus
  export enum KidsStatus {
    KIDS = "KIDS",
    NOKIDS = "NOKIDS",
  }

  // Enum for Drinking Frequency
  export enum DrinkingFrequency {
    NEVER = "NEVER",
    SOCIALLY = "SOCIALLY",
  }

  // Enum for Political Affiliation
  export enum PoliticalAffiliation {
    CONSERVATIVE = "CONSERVATIVE",
    CONSERVATIVE_LEANING_MODERATE = "CONSERVATIVE-LEANING MODERATE",
    MODERATE = "MODERATE",
    LIBERAL_LEANING_MODERATE = "LIBERAL-LEANING MODERATE",
    LIBERAL = "LIBERAL",
    INDEPENDENT = "INDEPENDENT",
    APOLITICAL = "APOLITICAL",
  }

  // Subtype for User Preferences
  export interface UserPref {
    ageMin: number;
    ageMax: number;
    maritalStatus: MaritalStatus[];
    hasKids: KidsStatus[];
    virginalStatus: VirginalStatus[];
    drugUse: string[]; // Array of string for drug use types
    politic: PoliticalAffiliation[];
    exerciseFreq: ExerciseFrequency[];
    drinkingFreq: DrinkingFrequency[];
  }

  // Main User Type
  export interface User {
    prefs: UserPref;
    userID: number;
    timestamp: string;
    username: string;
    gender: string;
    age: number;
    location: string;
    wouldRelocate: boolean;
    maritalStatus: MaritalStatus;
    hasKids: KidsStatus;
    wantsKids: boolean;
    income: string;
    weight: number;
    height: string;
    exerciseFreq: ExerciseFrequency;
    drinkingFreq: DrinkingFrequency;
    drugUse: string[]; // Array of string for drug use types
    virginalStatus: VirginalStatus;
    isWaiting: boolean;
    ethnicity: string;
    politic: PoliticalAffiliation;
    education: string;
    faith: string;
    bio: string;
  }

  export interface Match {
    message: string;
    man: User;
    woman: User;
  }
}
export = Matchmaking;
