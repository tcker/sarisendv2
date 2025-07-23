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


    try {
      await wallet.connect();
    } catch (connectErr) {
      console.error('❌ Wallet popup closed or connection failed:', connectErr);
      toast.error('Wallet connection was cancelled.');
      setIsConnecting(false);
      return;
    }

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

    const message = `SariSend Login:\n${account.address}\n${Date.now()}`;

    let signature = '';
    try {
      const signed = await wallet.signMessage({
        message,
        nonce: Math.floor(Math.random() * 1e6).toString(), // Optional extra randomness
      });

      signature = signed?.signature;
    } catch (signErr) {
      console.error('❌ Message signing failed:', signErr);
      toast.error('Wallet signature was cancelled.');
      setIsConnecting(false);
      return;
    }

    const response = await fetch('http://localhost:2000/auth/connect-wallet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wallet: account.address,
        userType,
        message,
        signature,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate wallet with backend');
    }

    setIsConnected(true);
    console.log(`✅ Authenticated ${expectedWallet} wallet:`, account.address);

    setTimeout(() => {
      router.replace('/home');
      // window.location.reload(); 
    }, 200);
  } catch (err) {
    console.error(`❌ Failed to connect to ${expectedWallet} wallet:`, err);
    toast.error(`Failed to connect to ${expectedWallet} wallet`);
  } finally {
    setIsConnecting(false);
  }
}
