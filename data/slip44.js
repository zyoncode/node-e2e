import constants from 'bip44-constants';

const HD_HARDENED = 0x80000000;
export const toHardened = n => (n | HD_HARDENED) >>> 0;
export const fromHardened = n => (n & ~HD_HARDENED) >>> 0;

let obj = {};

constants.forEach(constant => {
  const symbol = constant[1].toLocaleUpperCase();
  obj[symbol] = {
    type: fromHardened(constant[0]),
    symbol,
    name: constant[2],
  };
});

export default obj;
