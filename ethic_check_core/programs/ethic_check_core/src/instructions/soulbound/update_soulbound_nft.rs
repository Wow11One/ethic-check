use anchor_lang::prelude::*;
use mpl_core::instructions::UpdateV2CpiBuilder;

use crate::errors::UpdateSoulboundNftErrorCode;

pub fn update_soulbound_nft_handler(
    ctx: Context<UpdateSoulboundNFT>,
    args: UpdateSoulboundNFTArgs
) -> Result<()> {
    let UpdateSoulboundNFTArgs { new_uri, user_id } = args;

    let asset_account = &ctx.accounts.asset_account;
    let user = &ctx.accounts.user;
    let asset_authority = &ctx.accounts.asset_authority;
    let mpl_core_program = &ctx.accounts.mpl_core_program;
    let system_program = &ctx.accounts.system_program;
    let ethic_check_program = &ctx.accounts.ethic_check_program;

    let asset_account_info = asset_account.to_account_info();
    let asset_authority_account_info = asset_authority.to_account_info();
    let user_account_info = user.to_account_info();

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

    let mut builder = UpdateV2CpiBuilder::new(mpl_core_program);
    let mut builder = builder
        .asset(&asset_account_info)
        .authority(Some(&asset_authority_account_info))
        .payer(&user_account_info)
        .system_program(system_program);

    if let Some(uri) = new_uri {
        builder = builder.new_uri(uri);
    }

    builder
        .invoke_signed(&[asset_account_seeds[0], asset_authority_seeds[0]])
        .map_err(|_| UpdateSoulboundNftErrorCode::UpdateAssetError)?;

    Ok(())
}

#[derive(Accounts)]
#[instruction(args: UpdateSoulboundNFTArgs)]
pub struct UpdateSoulboundNFT<'info> {
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

    #[account(mut)]
    pub user: Signer<'info>,

    #[account(address = crate::ID)]
    pub ethic_check_program: AccountInfo<'info>,

    #[account(address = mpl_core::ID)]
    pub mpl_core_program: AccountInfo<'info>,

    #[account(address = solana_program::system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[derive(AnchorSerialize, AnchorDeserialize, PartialEq, Eq, Debug, Clone)]
pub struct UpdateSoulboundNFTArgs {
    new_uri: Option<String>,
    user_id: String,
}
