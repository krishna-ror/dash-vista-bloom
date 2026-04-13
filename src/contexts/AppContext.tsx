import React, { createContext, useContext, useState, ReactNode } from "react";

export type Role = "finance" | "hr" | "management";

export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  dateFormat: string;
}

export const countries: Country[] = [
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", currencySymbol: "₹", dateFormat: "DD/MM/YYYY" },
  { code: "US", name: "USA", flag: "🇺🇸", currency: "USD", currencySymbol: "$", dateFormat: "MM/DD/YYYY" },
  { code: "GB", name: "UK", flag: "🇬🇧", currency: "GBP", currencySymbol: "£", dateFormat: "DD/MM/YYYY" },
];

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  country: Country;
  setCountry: (country: Country) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  formatCurrency: (amount: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>("finance");
  const [country, setCountry] = useState<Country>(countries[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formatCurrency = (amount: number) => {
    return `${country.currencySymbol}${amount.toLocaleString()}`;
  };

  return (
    <AppContext.Provider value={{ role, setRole, country, setCountry, isLoggedIn, setIsLoggedIn, formatCurrency }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
