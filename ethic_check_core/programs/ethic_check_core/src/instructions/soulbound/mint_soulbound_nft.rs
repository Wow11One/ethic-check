use anchor_lang::{ prelude::*, system_program::{ transfer, Transfer } };
use anchor_spl::{ metadata::{ mpl_token_metadata::{ self }, Metadata }, token::Token };
use mpl_core::{
    instructions::CreateV2CpiBuilder,
    types::{ FreezeDelegate, Plugin, PluginAuthorityPair },
};
use solana_program::native_token::LAMPORTS_PER_SOL;

use crate::errors::MintSoulboundNftErrorCode;

pub fn mint_soulbound_nft_handler(
    ctx: Context<MintSoulboundNFT>,
    args: MintSoulboundNFTArgs
) -> Result<()> {
    let MintSoulboundNFTArgs { uri, user_id } = args;

    let asset_account = &ctx.accounts.asset_account;
    let user = &ctx.accounts.user;
    let asset_authority = &ctx.accounts.asset_authority;
    let mpl_core_program = &ctx.accounts.mpl_core_program;
    let system_program = &ctx.accounts.system_program;
    let ethic_check_program = &ctx.accounts.ethic_check_program;
    let profit_wallet = &ctx.accounts.profit_wallet;

    let asset_account_info = asset_account.to_account_info();
    let asset_authority_account_info = asset_authority.to_account_info();
    let user_account_info = user.to_account_info();
    let system_program_account_info = system_program.to_account_info();
    let profit_wallet_account_info = profit_wallet.to_account_info();

    let asset_account_seeds: &[&[&[u8]]] = &[
        &[
            b"soulbound_asset",
            &user_id.as_bytes(),
            &ethic_check_program.key().to_bytes(),
            &[ctx.bumps.asset_account],
        ],
    ];

    let asset_authority_seeds: &[&[&[u8]]] = &[
        &[
            b"asset_authority",
            &ethic_check_program.key().to_bytes(),
            &asset_account.key().to_bytes(),
            &[ctx.bumps.asset_authority],
        ],
    ];

    require!(
        user.lamports() > 1 * LAMPORTS_PER_SOL,
        MintSoulboundNftErrorCode::InsufficientUserBalanceError
    );

    transfer(
        CpiContext::new(system_program_account_info, Transfer {
            from: user_account_info.clone(),
            to: profit_wallet_account_info.clone(),
        }),
        1 * LAMPORTS_PER_SOL
    )?;

    let mut builder = CreateV2CpiBuilder::new(mpl_core_program);
    let builder = builder
        .asset(&asset_account_info)
        .name(String::from("EthicCheck Soulbound"))
        .uri(uri.clone())
        .authority(Some(&asset_authority_account_info))
        .payer(&user_account_info)
        .owner(Some(&user_account_info))
        .update_authority(Some(&asset_authority_account_info))
        .system_program(system_program)
        .plugins(
            vec![PluginAuthorityPair {
                plugin: Plugin::FreezeDelegate(FreezeDelegate { frozen: true }),
                authority: None,
            }]
        );

    builder
        .invoke_signed(&[asset_account_seeds[0], asset_authority_seeds[0]])
        .map_err(|_| MintSoulboundNftErrorCode::AssetCreationError)?;

    Ok(())
}

#[derive(Accounts)]
#[instruction(args: MintSoulboundNFTArgs)]
pub struct MintSoulboundNFT<'info> {
    /// CHECK: Validate address by deriving pda
    #[account(
        mut, 
        seeds = [b"soulbound_asset", args.user_id.as_bytes(), ethic_check_program.key().as_ref()], 
        bump, 
        seeds::program = ethic_check_program.key()
    )]
    pub asset_account: UncheckedAccount<'info>,

    /// CHECK: Validate address by deriving pda
    #[account(
        mut,
        seeds = [b"asset_authority", ethic_check_program.key().as_ref(), asset_account.key().as_ref()],
        bump,
        seeds::program = ethic_check_program.key()
    )]
    pub asset_authority: UncheckedAccount<'info>,

    /// CHECK: Validate address by deriving pda
    #[account(
        mut,
        seeds = [b"metadata", mpl_token_metadata_program.key().as_ref(), asset_account.key().as_ref()],
        bump,
        seeds::program = mpl_token_metadata_program.key(),
    )]
    pub metadata_account: UncheckedAccount<'info>,

    /// CHECK: Validate address by deriving pda
    #[account(
        mut,
        seeds = [b"metadata", mpl_token_metadata_program.key().as_ref(), asset_account.key().as_ref(), b"edition"],
        bump,
        seeds::program = mpl_token_metadata_program.key(),
    )]
    pub master_edition_account: UncheckedAccount<'info>,

    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub profit_wallet: AccountInfo<'info>,

    #[account(address = crate::ID)]
    pub ethic_check_program: AccountInfo<'info>,

    #[account(address = mpl_core::ID)]
    pub mpl_core_program: AccountInfo<'info>,

    #[account(address = mpl_token_metadata::ID)]
    pub mpl_token_metadata_program: Program<'info, Metadata>,

    pub token_program: Program<'info, Token>,

    #[account(address = solana_program::system_program::ID)]
    pub system_program: Program<'info, System>,

    #[account(address = solana_program::sysvar::rent::ID)]
    pub rent: Sysvar<'info, Rent>,

    #[account(address = solana_program::sysvar::instructions::ID)]
    pub sysvar_instructions: AccountInfo<'info>,
}

#[derive(AnchorSerialize, AnchorDeserialize, PartialEq, Eq, Debug, Clone)]
pub struct MintSoulboundNFTArgs {
    uri: String,
    user_id: String,
}
