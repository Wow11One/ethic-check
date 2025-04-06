export type EthicCheck = {
  version: '0.1.0';
  name: 'nomadz_core';
  instructions: [
    {
      name: 'initialize';
      accounts: [
        {
          name: 'config';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'initializer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'updateConfig';
      accounts: [
        {
          name: 'config';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'newAdmin';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'mintSoulboundNft';
      accounts: [
        {
          name: 'assetAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'assetAuthority';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'metadataAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'masterEditionAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'user';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'nomadzProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'mplCoreProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'mplTokenMetadataProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'sysvarInstructions';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'data';
          type: {
            defined: 'MintSoulboundNFTArgs';
          };
        },
      ];
    },
    {
      name: 'updateSoulboundNft';
      accounts: [
        {
          name: 'assetAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'assetAuthority';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'user';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'nomadzProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'mplCoreProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'data';
          type: {
            defined: 'UpdateSoulboundNFTArgs';
          };
        },
      ];
    },
  ];
  accounts: [
    {
      name: 'config';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'admin';
            type: 'publicKey';
          },
        ];
      };
    },
  ];
  types: [
    {
      name: 'MintSoulboundNFTArgs';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'uri';
            type: 'string';
          },
          {
            name: 'userId';
            type: 'string';
          },
        ];
      };
    },
    {
      name: 'UpdateSoulboundNFTArgs';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'newUri';
            type: {
              option: 'string';
            };
          },
          {
            name: 'userId';
            type: 'string';
          },
        ];
      };
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'AssetCreationError';
      msg: 'Failed to create asset during minting soulbound NFT';
    },
    {
      code: 6001;
      name: 'UpdateAssetMetadataError';
      msg: 'Failed to update asset metadata during minting soulbound NFT';
    },
    {
      code: 6002;
      name: 'UnknownError';
      msg: 'Unknown error has occured during minting soulbound NFT';
    },
  ];
};

export const IDL: EthicCheck = {
  version: '0.1.0',
  name: 'nomadz_core',
  instructions: [
    {
      name: 'initialize',
      accounts: [
        {
          name: 'config',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'initializer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'updateConfig',
      accounts: [
        {
          name: 'config',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'newAdmin',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'mintSoulboundNft',
      accounts: [
        {
          name: 'assetAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'assetAuthority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadataAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'masterEditionAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'nomadzProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mplCoreProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mplTokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'data',
          type: {
            defined: 'MintSoulboundNFTArgs',
          },
        },
      ],
    },
    {
      name: 'updateSoulboundNft',
      accounts: [
        {
          name: 'assetAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'assetAuthority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'nomadzProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mplCoreProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'data',
          type: {
            defined: 'UpdateSoulboundNFTArgs',
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'config',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'admin',
            type: 'publicKey',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'MintSoulboundNFTArgs',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'uri',
            type: 'string',
          },
          {
            name: 'userId',
            type: 'string',
          },
        ],
      },
    },
    {
      name: 'UpdateSoulboundNFTArgs',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'newUri',
            type: {
              option: 'string',
            },
          },
          {
            name: 'userId',
            type: 'string',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'AssetCreationError',
      msg: 'Failed to create asset during minting soulbound NFT',
    },
    {
      code: 6001,
      name: 'UpdateAssetMetadataError',
      msg: 'Failed to update asset metadata during minting soulbound NFT',
    },
    {
      code: 6002,
      name: 'UnknownError',
      msg: 'Unknown error has occured during minting soulbound NFT',
    },
  ],
};
