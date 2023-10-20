export const SponsorshipMarketplaceABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "routerAddress",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "donId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "database",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccountOwnershipProofMissing",
    type: "error",
  },
  {
    inputs: [],
    name: "CannotWithdraw",
    type: "error",
  },
  {
    inputs: [],
    name: "DealAlreadyExists",
    type: "error",
  },
  {
    inputs: [],
    name: "DealDoesNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "DealExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "DealStatusMustBeNew",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptyArgs",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptySource",
    type: "error",
  },
  {
    inputs: [],
    name: "EncryptedSymmetricKeyMissing",
    type: "error",
  },
  {
    inputs: [],
    name: "EncryptedTermsMissing",
    type: "error",
  },
  {
    inputs: [],
    name: "EncryptedTweetIdMissing",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidDealId",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxPaymentMissing",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxValueAllowanceMissing",
    type: "error",
  },
  {
    inputs: [],
    name: "NoInlineSecrets",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyRouterCanFulfill",
    type: "error",
  },
  {
    inputs: [],
    name: "RedemptionExpirationMustBeInFuture",
    type: "error",
  },
  {
    inputs: [],
    name: "TermsHashMissing",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "dealId",
        type: "bytes32",
      },
    ],
    name: "DealAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "dealId",
        type: "bytes32",
      },
    ],
    name: "DealCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "dealId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalAmount",
        type: "uint256",
      },
    ],
    name: "DealRedeemed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "dealId",
        type: "bytes32",
      },
    ],
    name: "DealWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "errorMessage",
        type: "bytes",
      },
    ],
    name: "FunctionError",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "RequestFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "RequestSent",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dealId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "accountOwnershipProof",
        type: "string",
      },
      {
        internalType: "string",
        name: "creatorEncryptedSymmetricKey",
        type: "string",
      },
    ],
    name: "acceptDeal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "dealId",
        type: "bytes32",
      },
    ],
    name: "canUserDecrypt",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "termsHash",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "encryptedSymmetricKey",
        type: "string",
      },
      {
        internalType: "string",
        name: "encryptedTerms",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "maxPayment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "redemptionExpiration",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "sponsorEncryptedSymmetricKey",
        type: "string",
      },
    ],
    name: "createDeal",
    outputs: [
      {
        internalType: "bytes32",
        name: "dealId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dealId",
        type: "bytes32",
      },
    ],
    name: "getCreatorEncryptedSymmetricKey",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dealId",
        type: "bytes32",
      },
    ],
    name: "getDeal",
    outputs: [
      {
        components: [
          {
            internalType: "enum SponsorshipMarketplace.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "sponsor",
            type: "address",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "termsHash",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "encryptedSymmetricKey",
            type: "string",
          },
          {
            internalType: "string",
            name: "encryptedTerms",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "redemptionExpiration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPayment",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "encryptedTweetId",
            type: "string",
          },
          {
            internalType: "string",
            name: "sponsorEncryptedSymmetricKey",
            type: "string",
          },
          {
            internalType: "string",
            name: "creatorEncryptedSymmetricKey",
            type: "string",
          },
        ],
        internalType: "struct SponsorshipMarketplace.Deal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dealId",
        type: "bytes32",
      },
    ],
    name: "getSponsorEncryptedSymmetricKey",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "err",
        type: "bytes",
      },
    ],
    name: "handleOracleFulfillment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dealId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "encryptedTweetId",
        type: "string",
      },
    ],
    name: "redeemDeal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "s_acceptFunctionSource",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_database",
    outputs: [
      {
        internalType: "contract Database",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_donId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_encryptedSecretsReference",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_paymentToken",
    outputs: [
      {
        internalType: "contract ApeCoin",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_redeemFunctionSource",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_subscriptionId",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "source",
        type: "string",
      },
    ],
    name: "setAcceptFunctionSource",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "newDonId",
        type: "bytes32",
      },
    ],
    name: "setDonId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "secretsReference",
        type: "bytes",
      },
    ],
    name: "setEncryptedSecretsReference",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "source",
        type: "string",
      },
    ],
    name: "setRedeemFunctionSource",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
    ],
    name: "setSubscriptionId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dealId",
        type: "bytes32",
      },
    ],
    name: "withdrawDeal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
