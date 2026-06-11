/** Query-string error codes redirected to /login?error=… */
export const LOGIN_URL_ERROR_CODES = {
  emailAccount: "email-account",
} as const;

export type LoginUrlErrorCode =
  (typeof LOGIN_URL_ERROR_CODES)[keyof typeof LOGIN_URL_ERROR_CODES];

const LOGIN_URL_ERRORS: Record<LoginUrlErrorCode, string> = {
  [LOGIN_URL_ERROR_CODES.emailAccount]:
    "Esta cuenta usa email y contraseña. Inicia sesión con el formulario de abajo.",
};

export function getLoginUrlErrorMessage(
  code: string | undefined,
): string | undefined {
  if (!code || !(code in LOGIN_URL_ERRORS)) return undefined;
  return LOGIN_URL_ERRORS[code as LoginUrlErrorCode];
}

/** Messages returned by the credentials form server action. */
export const LOGIN_FORM_ERRORS = {
  googleAccount: "Esta cuenta usa Google. Inicia sesión con Google.",
  requiredFields: "Email y contraseña son obligatorios.",
  invalidEmail: "Introduce un email válido.",
  invalidCredentials: "Email o contraseña incorrectos.",
  passwordTooShort: "La contraseña debe tener al menos 8 caracteres.",
  signInFailed: "No se pudo iniciar sesión.",
  createAccountFailed: "No se pudo crear la cuenta. Inténtalo de nuevo.",
} as const;
