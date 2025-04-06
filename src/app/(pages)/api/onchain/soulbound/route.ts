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
import { EthicCheck, IDL } from '@/utils/types/ethic-check-program.types';
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

const ethicCheck = new anchor.Program<EthicCheck>(
  IDL as unknown as EthicCheck,
  new PublicKey('5HgPxgqHnwim6mJsPbCVnNP1B43Wog9pNFsGsoaXRd8S'),
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
    [Buffer.from('soulbound_asset'), Buffer.from(shortenedUserId), ethicCheck.programId.toBytes()],
    ethicCheck.programId,
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
    [Buffer.from('asset_authority'), ethicCheck.programId.toBytes(), assetAccount.toBytes()],
    ethicCheck.programId,
  );

  const transaction = await ethicCheck.methods
    .mintSoulboundNft({ userId: shortenedUserId, uri })
    .accounts({
      assetAccount: assetAccount,
      assetAuthority: assetAuthority,
      metadataAccount: metadataAccount,
      user: userPublicKey,
      nomadzProgram: ethicCheck.programId,
      mplCoreProgram: mplCoreProgramId,
      tokenProgram: TOKEN_PROGRAM_ID,
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
