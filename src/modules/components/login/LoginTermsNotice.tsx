"use client";

import { useState } from "react";
import { TermsDialog } from "@/src/modules/components/terms";
import { Button } from "../ui";

export default function LoginTermsNotice() {
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <p className="max-w-sm text-sm text-brand-text/80 mt-6">
        Al iniciar sesión, aceptas los{" "}
        <Button
          type="button"
          onClick={() => setTermsOpen(true)}
          variant="ghost"
          className="text-brand-accent underline-offset-4 hover:underline px-0 py-0 hover:bg-transparent"
        >
          términos y condiciones
        </Button>
        .
      </p>
      <TermsDialog open={termsOpen} onOpenChange={setTermsOpen} />
    </>
  );
}
