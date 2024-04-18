import SymbolEmu from './supportSymbolEmu';

const types = {
  [SymbolEmu.BTC]: {
    SEGWIT_NATIVE: 'segwit_native',
    SEGWIT_NESTED: 'segwit_nested',
    SEGWIT_TAPROOT: 'segwit_taproot',
  },
};

export default types;
