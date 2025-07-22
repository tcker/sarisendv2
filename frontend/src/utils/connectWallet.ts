import toast from 'react-hot-toast';

type UserType = 'customer' | 'merchant';
type WalletType = 'petra' | 'pontem';

interface ConnectWalletArgs {
  expectedWallet: WalletType;
  userType: UserType;
  setIsConnecting: (val: boolean) => void;
  setIsConnected: (val: boolean) => void;
  router: any;
}

export async function connectWalletHandler({
  expectedWallet,
  userType,
  setIsConnecting,
  setIsConnected,
  router,
}: ConnectWalletArgs) {
  const getWallet = (): any => {
    const injected = (window as any).aptos;
    const pontem = (window as any).pontem;

    if (expectedWallet === 'petra') {
      return injected || null;
    }

    if (expectedWallet === 'pontem') {
      return pontem || (injected?.name?.toLowerCase() === 'pontem' ? injected : null);
    }

    return null;
  };

  const wallet = getWallet();

  if (!wallet) {
    toast.error(`Please use the ${expectedWallet.toUpperCase()} Wallet`);
    return;
  }

  try {
    setIsConnecting(true);

    const alreadyConnected = await wallet.isConnected?.();
    if (!alreadyConnected) {
      try {
        await wallet.connect();
      } catch (connectErr) {
        console.error('User closed wallet popup or connection failed:', connectErr);
        toast.error('Wallet connection was cancelled.');
        setIsConnecting(false);
        return;
      }
    }

    const account = await wallet.account?.();
    if (!account?.address) {
      throw new Error('Wallet account not available');
    }

    const response = await fetch('http://localhost:2000/auth/connect-wallet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wallet: account.address,
        userType,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to register wallet with backend');
    }

    setIsConnected(true);
    console.log(`Connected to ${expectedWallet} wallet:`, account.address);
    router.push('/home');
  } catch (err) {
    console.error(`Failed to connect to ${expectedWallet} wallet:`, err);
    toast.error(`Failed to connect to ${expectedWallet} wallet`);
  } finally {
    setIsConnecting(false);
  }
}
