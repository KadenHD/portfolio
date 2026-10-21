import { useI18n } from "@/i18n/useI18n";
import { forwardRef } from "react";
import { Popup } from "@/components/Popup";

export const LegalNoticePopup = forwardRef(function LegalNoticePopup(
  { onClose },
  ref,
) {
  const { t } = useI18n();
  return (
    <Popup
      ref={ref}
      onClose={onClose}
      title={t.legal.notice}
      content={t.data.legalNotice}
    />
  );
});
