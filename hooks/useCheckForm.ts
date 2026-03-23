import { useState } from "react";

export interface CheckFormState {
  productName: string;
  category: string;
  ingredients: string;
  shelfLife: string;
  storageConditions: string;
  market: string | null;
  label: boolean;
  fssai: boolean;
  labReport: boolean;
  orgCert: boolean;
}

export const useCheckForm = () => {
  const [form, setForm] = useState<CheckFormState>({
    productName: "",
    category: "",
    ingredients: "",
    shelfLife: "",
    storageConditions: "",
    market: null,
    label: false,
    fssai: false,
    labReport: false,
    orgCert: false,
  });

  const prefill = () => {
    setForm((f) => ({
      ...f,
      productName: "Organic Mango Pickle",
      category: "Pickles & Preserves",
      ingredients: "Raw mango, mustard oil, salt, turmeric, red chilli, fenugreek seeds, nigella seeds, sulphites",
      shelfLife: "18 months",
      storageConditions: "Store in cool, dry place. Refrigerate after opening.",
    }));
  };

  return { form, setForm, prefill };
};
