import { useI18n } from "@/i18n/useI18n";
import { forwardRef } from "react";
import { Popup } from "@/components/Popup";

export const PrivacyPolicyPopup = forwardRef(function PrivacyPolicyPopup(
  { onClose },
  ref,
) {
  const { t } = useI18n();
  return (
    <Popup
      ref={ref}
      onClose={onClose}
      title={t.legal.privacy}
      content={t.data.privacyPolicy}
    />
  );
});
