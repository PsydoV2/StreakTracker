// Module-level session flag — resets when the app process is killed and restarted.
// This prevents the PIN from being requested again after the user has already
// authenticated within the same app session (e.g. after navigating back from AuthScreen).
let verified = false;

export const markPinVerified = () => {
  verified = true;
};

export const isPinVerified = () => verified;
