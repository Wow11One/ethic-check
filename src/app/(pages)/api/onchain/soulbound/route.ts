import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { NextRequest, NextResponse } from 'next/server';
import defaultSoulboundMetadataJson from '@/utils/metadata/soulbound.metadata.json';
import { PinataSDK } from 'pinata';
import * as anchor from '@coral-xyz/anchor';
import { EthicCheckCore, IDL } from '@/utils/types/ethic-check-core-program.types';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { HttpStatusCode } from 'axios';

const pinata = new PinataSDK({
  pinataGateway: process.env.PINATA_GATEWAY,
  pinataJwt: process.env.PINATA_JWT,
});

const anchorProvider = new anchor.AnchorProvider(
  new Connection(clusterApiUrl('devnet')),
  new NodeWallet(Keypair.generate()),
  { commitment: 'confirmed' },
);

const ethicCheckCore = new anchor.Program<EthicCheckCore>(
  IDL as unknown as EthicCheckCore,
  new PublicKey('6wHSyHiWp6jjUDHDn7o5hydAeBpLD3EB7JbhyrxJPeHH'),
  anchorProvider,
);

export async function POST(request: NextRequest) {
  const { userId, address } = await request.json();

  const mplTokenMetadataProgramId = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
  const mplCoreProgramId = new PublicKey('CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d');

  const userPublicKey = new PublicKey(address);

  const datetimeFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' });

  const metadataJson = {
    ...defaultSoulboundMetadataJson,
    attributes: [
      ...defaultSoulboundMetadataJson.attributes,
      { traitType: 'User ID', value: userId },
      { traitType: 'Subscription Plan', value: 'Enterprise' },
      { traitType: 'CreatedAt', value: datetimeFormatter.format(new Date()) },
    ],
  };

  const metadataUpload = await pinata.upload.public.json(metadataJson);

  const uri = `https://${metadataUpload.cid}.ipfs.dweb.link/`;
  const shortenedUserId = userId.replace(/-/g, '');

  const [assetAccount] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('soulbound_asset'),
      Buffer.from(shortenedUserId),
      ethicCheckCore.programId.toBytes(),
    ],
    ethicCheckCore.programId,
  );

  const [metadataAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from('metadata'), mplTokenMetadataProgramId.toBytes(), assetAccount.toBytes()],
    mplTokenMetadataProgramId,
  );

  const [masterEditionAccount] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      mplTokenMetadataProgramId.toBytes(),
      assetAccount.toBytes(),
      Buffer.from('edition'),
    ],
    mplTokenMetadataProgramId,
  );

  const [assetAuthority] = PublicKey.findProgramAddressSync(
    [Buffer.from('asset_authority'), ethicCheckCore.programId.toBytes(), assetAccount.toBytes()],
    ethicCheckCore.programId,
  );

  const profitWallet = new PublicKey('G5ZegMhe8wwnw257tzAdWfDdYWfE2SbVwK4VEpWTYN9A');

  const transaction = await ethicCheckCore.methods
    .mintSoulboundNft({ userId: shortenedUserId, uri })
    .accounts({
      assetAccount: assetAccount,
      assetAuthority: assetAuthority,
      metadataAccount: metadataAccount,
      user: userPublicKey,
      ethicCheckProgram: ethicCheckCore.programId,
      mplCoreProgram: mplCoreProgramId,
      tokenProgram: TOKEN_PROGRAM_ID,
      profitWallet: profitWallet,
      masterEditionAccount: masterEditionAccount,
      mplTokenMetadataProgram: mplTokenMetadataProgramId,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
      sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
    })
    .transaction();

  const { lastValidBlockHeight, blockhash } = await anchorProvider.connection.getLatestBlockhash();

  transaction.recentBlockhash = blockhash;
  transaction.lastValidBlockHeight = lastValidBlockHeight;
  transaction.feePayer = new PublicKey(userPublicKey);

  const serializedTransaction = transaction
    .serialize({ requireAllSignatures: false })
    .toString('base64');

  return new Response(JSON.stringify({ serializedTransaction }), {
    status: HttpStatusCode.Created,
    headers: { 'Content-Type': 'application/json' },
  });
}
