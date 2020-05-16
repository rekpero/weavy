export function shortenAddress(pAddress, pDigits = 4) {
  const digestRegex = /^[a-z0-9-_]{43}$/i;
  if (digestRegex.test(pAddress)) {
    return `${pAddress.substring(0, pDigits + 2)}...${pAddress.substring(
      43 - pDigits
    )}`;
  } else {
    return pAddress;
  }
}

export const APP_NAME = "permamail";
export const APP_VERSION = "0.0.2";
