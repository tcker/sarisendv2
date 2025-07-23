export function getWalletProvider(preferred?: "petra" | "pontem") {
  if (typeof window === "undefined") return null;

  if (preferred) {
    const provider = (window as any)[preferred];
    if (provider && provider.connect) {
      provider.name = preferred;
      return provider;
    }
    return null; // Do not fallback to other wallets
  }

  // // Fallback search only if no preferred specified
  // const APTOS_WALLETS = ["petra", "pontem"];
  // for (const name of APTOS_WALLETS) {
  //   const provider = (window as any)[name];
  //   if (provider && provider.connect) {
  //     provider.name = name;
  //     return provider;
  //   }
  // }

  // return null;
}
