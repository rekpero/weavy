export function shortenAddress(pAddress, pDigits = 4) {
  return `${pAddress.substring(0, pDigits + 2)}...${pAddress.substring(
    43 - pDigits
  )}`;
}
