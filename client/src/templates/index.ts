import { theme } from "@/config/theme";
import * as luxury from "./luxury";

const templates = {
  luxury: luxury.HomePage,
  bridal: luxury.HomePage, // Fallbacks for demo
  modern: luxury.HomePage,
  minimal: luxury.HomePage,
};

export const getActiveTemplate = () => {
  const active = theme.activeTemplate as keyof typeof templates;
  return templates[active] || templates.luxury;
};
