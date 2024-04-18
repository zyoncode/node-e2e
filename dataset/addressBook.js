export default {
  blank: [],
  preloadData: [
    {
      name: 'eth',
      address: '0xd9298FB7CF242302ff8396054C98c830A3096dF4',
      chain: 'EVM',
      chainId: 'evm--1',
    },
    {
      name: 'BIP49',
      address: '166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj',
    },

    // {
    //   name: 'btc1',
    //   address: '17CGBXDrdcCAxGHCVbaKQXH15QnxtenUqf',
    // },
    // {
    //   name: 'btc2',
    //   address: '1E6odnrX4gYV6bYFHnVKKfL3zckYD3GtDH',
    // },
    // {
    //   name: 'btc4',
    //   address: '1NPiaYonJDavh4zF99H2ynv6TGBK8dRa46',
    // },
  ],
  initialAccess: [
    {
      input: {
        name: 'btc1',
        address: '166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj',
      },
      output: {},
    },
  ],
  manualAdd: [
    {
      input: {
        name: 'btc1',
        address: '166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj',
      },
      output: {},
    },
    {
      input: {
        name: 'BIP49',
        address: '32REjFDvJjYVCjWeZU1fmUkujJNBQVafMJ',
      },
      output: {},
    },
    {
      input: {
        name: 'BIP84',
        address: 'bc1qhqqe07udm3347ygdpcpge0ws7wcy3m59dnu0xd',
      },
      output: {},
    },
    {
      input: {
        name: 'BIP141-P2WPKH',
        address: 'bc1qesjetxklf508n64lutenfhmhyxxegl2l804ku3',
      },
      output: {},
    },
  ],
  domainAdd: [
    {
      input: {
        name: 'btc1',
        address: '3A7mxMuCbhBdrELqsGsPWx9V9atSAd1Fxi',
        domain: '0xloatheb.eth',
      },
      output: {},
    },
  ],
  imageScan: [
    {
      input: {
        name: 'btc1',
        address: '16EsS3efTvJPQbBk7QtAPCEDoTjPdgLU2H',
        QRcode: '16EsS3efTvJPQbBk7QtAPCEDoTjPdgLU2H',
      },
      output: {},
    },
  ],

  duplicateAddress: [
    {
      input: {
        name: 'btc1',
        address: '16EsS3efTvJPQbBk7QtAPCEDoTjPdgLU2H',
      },
      output: {},
    },
  ],
  duplicateDomain: [
    {
      input: {
        name: '0xloatheb',
        address: '3A7mxMuCbhBdrELqsGsPWx9V9atSAd1Fxi',
        domain: '0xloatheb.eth',
      },
      output: {},
    },
  ],
  differentChain: [
    {
      input: {
        name: 'BIP49',
        address: '166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj',
      },
      output: {},
    },
    {
      input: {
        name: 'eth',
        address: '0xd9298FB7CF242302ff8396054C98c830A3096dF4',
        chain: 'EVM',
        chainId: 'evm--1',
      },
      output: {},
    },
  ],
  differentChainDomain: [
    {
      input: {
        name: '0xloatheb',
        address: '3A7mxMuCbhBdrELqsGsPWx9V9atSAd1Fxi',
        domain: '0xloatheb.eth',
      },
      output: {},
    },
    {
      input: {
        name: 'eth',
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        chain: 'EVM',
        chainId: 'evm--1',
        domain: 'vitalik.eth',
      },
      output: {},
    },
  ],
  mismatchedDomainAndChain: [
    {
      input: {
        name: 'francochan',
        address: '0xf81b5B6DA9690191CC6C66829cE665960D06047e',
        chain: 'doge',
        chainId: 'doge--0',
      },
      output: {},
    },
  ],

  returnWithoutSave: [
    {
      input: {
        name: 'btc',
        address: '166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj',
      },
      output: {},
    },
  ],

  reAddingAfterDelete: [
    {
      input: {
        name: 'BIP49',
        address: '166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj',
      },
      output: {},
    },
  ],
  singleDelete: [
    {
      input: {
        name: 'BIP49',
        address: '166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj',
      },
      output: {},
    },
  ],
  multipleDelete: [
    {
      input: {
        addresses: [
          '166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj',
          '0xd9298FB7CF242302ff8396054C98c830A3096dF4',
        ],
      },
      output: {},
    },
  ],

  editAddress: [
    {
      input: {
        name: 'BIP49',
        address: '166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj',
      },
      output: {
        name: '222BIP49',
        address: '16gF4eBDR849rpbCFdSwQ3Ym13x73KRiHE',
      },
    },
  ],
  editDomainAddress: [
    {
      input: {
        name: 'BIP49',
        address: '166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj',
      },
      output: {
        name: '222BIP49',
        address: '16gF4eBDR849rpbCFdSwQ3Ym13x73KRiHE',
      },
    },
  ],
  editMismatchChainAndAddress: [
    {
      input: {
        name: 'eth',
        address: '0xd9298FB7CF242302ff8396054C98c830A3096dF4',
        chain: 'doge',
        chainId: 'doge--0',
      },
      output: {},
    },
  ],

  copyAfterAdd: [
    {
      input: {
        address: '166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj',
      },
      output: {},
    },
  ],
  copyAfterEdit: [
    {
      input: {
        form: {
          address: '166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj',
        },
        to: {
          name: 'eth2',
          address: '0x6BA0aDBa815f4C347A5d1082770ff106910B3834',
          chain: 'EVM',
          chainId: 'evm--1',
        },
      },
      output: {},
    },
  ],
  search: [
    {
      input: {
        term: 'BIP49',
      },
      output: {
        result: ['166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj'],
      },
    },
  ],
  searchNoResult: [
    {
      input: {
        term: 'BIP499999',
      },
      output: {
        result: [],
      },
    },
  ],
  searchAfterDelete: [
    {
      input: {
        term: 'eth',
        addresses: ['166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj'],
      },
      output: {
        result: ['0xd9298FB7CF242302ff8396054C98c830A3096dF4'],
      },
    },
  ],
  postAdditionSorting: [
    {
      input: {},
      output: {
        result: [
          '166PLTxRDzE4ecGR2oox4HEBCEAiUkt7Uj',
          '0xd9298FB7CF242302ff8396054C98c830A3096dF4',
        ],
      },
    },
  ],
  catDisplay: [
    {
      input: {
        chainId: 'evm--1',
        chain: 'EVM',
      },
      output: {
        addresses: ['0xd9298FB7CF242302ff8396054C98c830A3096dF4'],
      },
    },
  ],
};
