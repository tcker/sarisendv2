// TO RUN QUERIES
// npm run queries

import { PrismaClient, TxStatus } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  // ----------------------------- USER ---------------------------------
  const user = await prisma.user.create({
    data: {
      name: 'Tcker',
      wallet: '0xabc123456789def',
    },
  });

  console.log('✅ User created:', user);

  // ----------------------------- MERCHANT ---------------------------------
  const merchant = await prisma.merchant.create({
    data: {
      businessName: 'Tcker Coffee Shop',
      wallet: '0xmerchant456789abc',
    },
  });

  console.log('✅ Merchant created:', merchant);

  // ----------------------------- TRANSACTION ---------------------------------
  const transaction = await prisma.transaction.create({
    data: {
      receiptId: `SARISEND-${Date.now()}`, // simple unique receipt ID
      amount: 50.0,
      token: 'APT',
      product: 'Iced Coffee',
      currency: 'PHP',
      status: TxStatus.SUCCESS,
      userId: user.id,
      merchantId: merchant.id,
    },
  });

  console.log('✅ Transaction created:', transaction);

  // ----------------------------- FETCH USERS WITH TRANSACTIONS ---------------------
  const usersWithTx = await prisma.user.findMany({
    include: {
      transactions: true,
    },
  });

  console.log('📦 All users + their transactions:', JSON.stringify(usersWithTx, null, 2));

  // ----------------------------- FETCH MERCHANTS WITH TRANSACTIONS ------------------
  const merchantsWithTx = await prisma.merchant.findMany({
    include: {
      transactions: true,
    },
  });

  console.log('🏪 All merchants + received transactions:', JSON.stringify(merchantsWithTx, null, 2));
}

main()
  .catch((e) => {
    console.error('❌ Error during query run:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
