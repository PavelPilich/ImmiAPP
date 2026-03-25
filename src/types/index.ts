export type LangCode = "en" | "es" | "ru" | "fr" | "pt" | "ht" | "ar" | "so" | "ne" | "my" | "uk" | "pl" | "ro" | "bg" | "tr" | "it" | "de" | "fa" | "he" | "zh";

export type PageName =
  | "onboard" | "auth" | "dashboard" | "wizard" | "formSelect" | "formDetail"
  | "formFill" | "docUpload" | "packageSelect" | "preview" | "pay"
  | "paymentOptions" | "whatsNext" | "submitConfirm" | "done" | "tracking"
  | "civics" | "knowledge" | "profile" | "pricing" | "attorneys"
  | "terms" | "privacy" | "reviews" | "faq";

export type PackageType = "pdf" | "printShip" | "fullSvc" | "express";

export type FormTier = "simple" | "medium" | "complex" | "vcomplex";

export type FieldType = "text" | "date" | "tel" | "email" | "select" | "country" | "tps";

export interface FormField {
  s: number;
  k: string;
  t: FieldType;
  opts?: string[];
}

export interface USCISForm {
  id: string;
  name: string;
  desc: string;
  tier: FormTier;
  fee: number;
  uscis: number;
  sections: number;
  fieldCount: number;
  time: string;
  fields: FormField[];
}

export interface CivicsQuestion {
  q: string;
  o: string[];
  a: number;
}

export type NotifType = "urgent" | "action" | "warning" | "success" | "info";

export interface Notification {
  icon: string;
  type: NotifType;
  text: string;
}

export interface User {
  name: string;
  email: string;
  id?: string;
}

export interface UploadState {
  passport: string | null;
  birth: string | null;
  photo: string | null;
  support: string | null;
}

export interface LangOption {
  code: LangCode;
  name: string;
  flag: string;
}

export interface OnboardStep {
  i: string;
  [key: string]: string;
}

export interface AppContextType {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  page: PageName;
  go: (p: PageName) => void;
  loggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
  user: User;
  setUser: (u: User) => void;
  selForm: USCISForm | null;
  setSelForm: (f: USCISForm | null) => void;
  fd: Record<string, string>;
  setFd: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  fSec: number;
  setFSec: (n: number) => void;
  pkg: PackageType | null;
  setPkg: (p: PackageType | null) => void;
  errs: Record<string, string>;
  setErrs: (e: Record<string, string>) => void;
  ups: UploadState;
  setUps: React.Dispatch<React.SetStateAction<UploadState>>;
  caseRef: string;
  resetForm: () => void;
  doLogout: () => void;
  payTotal: number;
  setPayTotal: (n: number) => void;
  uscisConf: string;
  setUscisConf: (s: string) => void;
  savedFormId: string | null;
  setSavedFormId: (id: string | null) => void;
  promoCode: string;
  setPromoCode: (s: string) => void;
  discountPct: number;
  setDiscountPct: (n: number) => void;
}
