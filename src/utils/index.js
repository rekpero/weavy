export function shortenAddress(pAddress, pDigits = 4) {
  return `${pAddress.substring(0, pDigits + 2)}...${pAddress.substring(
    43 - pDigits
  )}`;
}

export const APP_NAME = "weave-mail-revamp";
export const APP_VERSION = "v0.0.0beta1";
