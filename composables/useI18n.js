import { useI18n } from "vue-i18n";

export default function useI18n() {
  return useI18n({ useScope: "global" });
  //   return i18n;
}
