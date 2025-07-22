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
        console.error('❌ Wallet popup closed or connection failed:', connectErr);
        toast.error('Wallet connection was cancelled.');
        setIsConnecting(false);
        return;
      }
    }

    // Try up to 3 times to fetch account
    let account = null;
    for (let i = 0; i < 3; i++) {
      try {
        account = typeof wallet.account === 'function'
          ? await wallet.account()
          : wallet.account;

        const address = typeof account === 'string' ? account : account?.address;
        if (address) {
          account = { address };
          break;
        }
      } catch (e) {
        console.warn(`Retrying account fetch... (${i + 1})`);
      }

      await new Promise((res) => setTimeout(res, 300));
    }

    if (!account?.address) {
      console.error('🧨 Failed to get account after retries:', account);
      throw new Error('Wallet account not available');
    }

    // 🔐 Require signature to prove wallet ownership (important for Pontem)
    try {
      const challenge = `Verify wallet ownership: ${Date.now()}`;
      const signed = await wallet.signMessage?.({
        message: challenge,
        nonce: 'sarisend-login',
      });

      if (!signed?.signature) {
        throw new Error('User did not sign the message');
      }
    } catch (signErr) {
      console.error('❌ Wallet must be unlocked or user rejected signature:', signErr);
      toast.error('Please unlock your wallet and approve the signature');
      setIsConnecting(false);
      return;
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
    console.log(`✅ Connected to ${expectedWallet} wallet:`, account.address);
    router.push('/home');
  } catch (err) {
    console.error(`❌ Failed to connect to ${expectedWallet} wallet:`, err);
    toast.error(`Failed to connect to ${expectedWallet} wallet`);
  } finally {
    setIsConnecting(false);
  }
}
