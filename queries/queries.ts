// TO RUN QUERIES
//  npm run queries
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

// -----------------------------USER---------------------------------


  // (customer/sender)
  const user = await prisma.user.create({
    data: {
      name: 'Tcker',
       // placeholder wallet
      wallet: '0xabc123456789def',
    },
  });

  console.log('User created:', user);

// -----------------------------MERCHANT---------------------------------


  // merchant (receiver)
  const merchant = await prisma.merchant.create({
    data: {
      businessName: 'Tcker Coffee Shop',
      // Fake Aptos wallet address for merchant
      wallet: '0xmerchant456789abc', 
    },
  });

  console.log('Merchant created:', merchant);

// -----------------------------TRANSACTION---------------------------------


  // transaction between the user and merchant
  const transaction = await prisma.transaction.create({
    data: {
      amount: 50.0,
      userId: user.id,         // sender (User)
      merchantId: merchant.id, // receiver (Merchant)
    },
  });

  console.log('Transaction created:', transaction);


// -----------------------------FETCH USER & USER-TRANSACTIONS--------------------


  // Fetch all users and their sent transactions
  const usersWithTx = await prisma.user.findMany({
    include: {
      transactions: true, 
    },
  });

  console.log('All users + their transactions:', usersWithTx);

// -----------------------------FETCH MERCHANT & MERCHANT-TRANSACTIONS--------------------


  // Fetch all merchants and received transactions
  const merchantsWithTx = await prisma.merchant.findMany({
    include: {
      transactions: true, // all transactions where merchant is the receiver
    },
  });

  console.log('All merchants + received transactions:', merchantsWithTx);
}



main()
  .catch((e) => {
    console.error('Error during query run:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
