export function getWalletProvider(preferred?: "petra" | "pontem") {
  if (typeof window === "undefined") return null;

  const aptos = (window as any).aptos;
  const pontem = (window as any).pontem;

  if (preferred === "petra") {
    if (aptos?.name?.toLowerCase() === "petra" || aptos?.isPetra) {
      aptos.name = "petra";
      return aptos;
    }
    return null; // ❗ don't fallback to Pontem here
  }

  if (preferred === "pontem") {
    if (pontem) {
      pontem.name = "pontem";
      return pontem;
    }
    return null; // ❗ don't fallback to Petra
  }

  // If no preference given, return what’s available
  if (pontem) {
    pontem.name = "pontem";
    return pontem;
  }

  if (aptos) {
    aptos.name = "petra";
    return aptos;
  }

  return null;
}
