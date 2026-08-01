const ARABIC_COUNTRIES = [
  "SA",
  "AE",
  "QA",
  "KW",
  "BH",
  "OM",
  "JO",
  "LB",
  "IQ",
  "EG",
  "MA",
  "DZ",
  "TN",
  "LY",
  "SY",
  "PS",
  "YE",
  "SD",
  "SO",
  "MR",
  "DJ",
  "KM",
] as const;

export function countryToLocale(countryCode: string): string {
  const code = countryCode?.toUpperCase();

  if (code === "TR") return "tr";
  if (code === "DE") return "de";
  if (code === "IT") return "it";
  if (code === "RU") return "ru";
  if (code === "IR") return "fa";
  if (ARABIC_COUNTRIES.includes(code as (typeof ARABIC_COUNTRIES)[number])) {
    return "ar";
  }

  return "en";
}
