import { Loader, AdaWallet } from '@okxweb3/coin-cardano';
import { AptosWallet } from '@okxweb3/coin-aptos';
import {
  BtcWallet,
  DogeWallet,
  TBtcWallet,
  LtcWallet,
} from '@okxweb3/coin-bitcoin';
import {
  AtomWallet,
  CronosWallet,
  JunoWallet,
  SecretWallet,
  TerraWallet,
} from '@okxweb3/coin-cosmos';

import { EthWallet } from '@okxweb3/coin-ethereum';
import { KaspaWallet } from '@okxweb3/coin-kaspa';

import SymbolEmu from './supportSymbolEmu.js';
import Slip44 from './slip44.js';

const createWallet = async (
  walletType,
  walletClass,
  path,
  preAction = Promise.resolve(),
) => {
  await preAction();

  const walletInstance = new walletClass();

  return {
    symbol: walletType,
    coinType: Slip44[walletType].type,
    name: Slip44[walletType].name,
    path: path,
    getDerivedPrivateKey: (mnemonic, hdPath = path) => {
      return walletInstance.getDerivedPrivateKey({ mnemonic, hdPath });
    },
    validAddress: address => {
      return walletInstance.validAddress({ address });
    },
    getNewAddressByPk: (privateKey, addressType = '') => {
      return walletInstance.getNewAddress({ privateKey, addressType });
    },
    getNewAddressByMm: async (mnemonic, hdPath = path, addressType = '') => {
      const privateKey = await walletInstance.getDerivedPrivateKey({
        mnemonic,
        hdPath,
      });
      return walletInstance.getNewAddress({ privateKey, addressType });
    },
  };
};

const wallets = {
  get [SymbolEmu.ADA]() {
    return createWallet(
      SymbolEmu.ADA,
      AdaWallet,
      "m/1852'/1815'/0'/0/0",
      () => {
        return new Promise((resolve, reject) => {
          Loader.setCardanoUrl(
            'http://localhost:63344/ada-test/node_modules/@okxweb3/coin-cardano/dist/cardano_multiplatform_lib_bg.wasm',
          );
          Loader.setMessageUrl(
            'http://localhost:63344/ada-test/node_modules/@okxweb3/coin-cardano/dist/cardano_message_signing_bg.wasm',
          );
          resolve();
        });
      },
    );
  },

  get [SymbolEmu.APT]() {
    return createWallet(
      SymbolEmu.APT,
      AptosWallet,
      `m/44'/${Slip44[SymbolEmu.APT]}'/0'/0'/0'`,
    );
  },

  get [SymbolEmu.BTC]() {
    return createWallet(
      SymbolEmu.BTC,
      BtcWallet,
      `m/44'/${Slip44[SymbolEmu.BTC]}'/0'/0'/0'`,
    );
  },
  get [SymbolEmu.DOGE]() {
    return createWallet(
      SymbolEmu.DOGE,
      DogeWallet,
      `m/44'/${Slip44[SymbolEmu.DOGE]}'/0'/0'/0'`,
    );
  },
  get [SymbolEmu.LTC]() {
    return createWallet(
      SymbolEmu.LTC,
      LtcWallet,
      `m/44'/${Slip44[SymbolEmu.LTC]}'/0'/0'/0'`,
    );
  },
  get [SymbolEmu.TBTC]() {
    return createWallet(
      SymbolEmu.TBTC,
      TBtcWallet,
      `m/44'/${Slip44[SymbolEmu.TBTC]}'/0'/0'/0'`,
    );
  },

  get [SymbolEmu.ATOM]() {
    return createWallet(
      SymbolEmu.ATOM,
      AtomWallet,
      `m/44'/${Slip44[SymbolEmu.ATOM]}'/0'/0'/0'`,
    );
  },
  get [SymbolEmu.CRO]() {
    return createWallet(
      SymbolEmu.CRO,
      CronosWallet,
      `m/44'/${Slip44[SymbolEmu.CRO]}'/0'/0'/0'`,
    );
  },
  get [SymbolEmu.JUNO]() {
    return createWallet(
      SymbolEmu.JUNO,
      JunoWallet,
      `m/44'/${Slip44[SymbolEmu.JUNO]}'/0'/0'/0'`,
    );
  },
  get [SymbolEmu.SCRT]() {
    return createWallet(
      SymbolEmu.SCRT,
      SecretWallet,
      `m/44'/${Slip44[SymbolEmu.SCRT]}'/0'/0'/0'`,
    );
  },
  get [SymbolEmu.LUNA]() {
    return createWallet(
      SymbolEmu.LUNA,
      TerraWallet,
      `m/44'/${Slip44[SymbolEmu.LUNA]}'/0'/0'/0'`,
    );
  },

  get [SymbolEmu.ETH]() {
    return createWallet(
      SymbolEmu.ETH,
      EthWallet,
      `m/44'/${Slip44[SymbolEmu.ETH]}'/0'/0'/0'`,
    );
  },

  get [SymbolEmu.KAS]() {
    return createWallet(
      SymbolEmu.KAS,
      KaspaWallet,
      `m/44'/${Slip44[SymbolEmu.KAS]}'/0'/0'/0'`,
    );
  },

  get [SymbolEmu.KAS]() {
    return createWallet(
      SymbolEmu.KAS,
      KaspaWallet,
      `m/44'/${Slip44[SymbolEmu.KAS]}'/0'/0'/0'`,
    );
  },
};

export default wallets;
