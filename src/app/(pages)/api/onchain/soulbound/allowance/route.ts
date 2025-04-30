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
  const { userId } = await request.json();

  const shortenedUserId = userId.replace(/-/g, '');

  const [assetAccount] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('soulbound_asset'),
      Buffer.from(shortenedUserId),
      ethicCheckCore.programId.toBytes(),
    ],
    ethicCheckCore.programId,
  );

  const accountInfo = await anchorProvider.connection.getAccountInfo(assetAccount, 'confirmed');

  if ((accountInfo?.data?.length || 0) > 0) {
    return new Response(
      JSON.stringify({ message: 'The user has already minted the subscription NFT' }),
      {
        status: HttpStatusCode.Forbidden,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  return new Response(
    JSON.stringify({ message: 'The user is allowed to mint the subscription NFT' }),
    {
      status: HttpStatusCode.Created,
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
