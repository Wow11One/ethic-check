use anchor_lang::prelude::*;

#[error_code]
pub enum MintSoulboundNftErrorCode {
    #[msg("Failed to withdraw 1 SOL from user during minting soulbound NFT")]
    InsufficientUserBalanceError,
    #[msg("Failed to create asset during minting soulbound NFT")]
    AssetCreationError,
    #[msg("Failed to update asset metadata during minting soulbound NFT")]
    UpdateAssetMetadataError,
    #[msg("Unknown error has occured during minting soulbound NFT")]
    UnknownError,
}
