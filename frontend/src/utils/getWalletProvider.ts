export function getWalletProvider(expected?: 'petra' | 'pontem') {
  if (typeof window === "undefined") return null;

  const wallet = (window as any).aptos;
  if (!wallet || !wallet.name) return null;

  const name = wallet.name.toLowerCase();

  if (expected === 'petra' && name.includes('petra')) return wallet;
  if (expected === 'pontem' && name.includes('pontem')) return wallet;

  // If no specific wallet expected, return whatever is there
  return wallet;
}
