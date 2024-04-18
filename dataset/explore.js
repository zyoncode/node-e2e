export default {
  preloadData: [],
  blank: [
    {
      input: {
        search: 'pond',
      },
      output: {},
    },
  ],
  threeTab: [
    {
      input: {
        searchTerms: ['pond', 'v3', 'one'],
      },
      output: {},
    },
  ],
  twoTab: [
    {
      input: {
        searchTerms: ['pond', 'v3'],
      },
      output: {},
    },
  ],
  oneTab: [
    {
      input: {
        searchTerms: 'uniswap',
      },
      output: {},
    },
  ],
  maxTab: [
    {
      input: {
        searchTerms: [
          'pond',
          'v3',
          'onekey',
          'nostr',
          'lightningassets',
          'lightsats',
          'stacker',
          'manta',
          'lncal',
          'sats4likes',
          'celestia',
          'amboss',
          'mempool',
          'icy',
          'ethscriptions',
          'lightningassets',
          'lightsats',
          'stacker',
          'manta',
          'icy',
          'pond',
        ],
      },
      output: {},
    },
  ],

  illegalURL: [
    {
      input: {
        searchTerm: 'https://localhost:8000',
      },
      output: {},
    },
  ],
};
