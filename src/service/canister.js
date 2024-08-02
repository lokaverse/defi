import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";
import { Principal } from "@dfinity/principal";
import { fromHexString } from "@dfinity/candid/lib/cjs/utils/buffer";
import { createActor } from "../ic/icloka";
import { createActor as createActorCKBTC } from "../ic/icLedgerCkbtc";
import { createActor as createActorLOKBTC } from "../ic/icLOKBTC";

export const getUserIdentity = (privKey) => {
  try {
    const userIdentity = Secp256k1KeyIdentity.fromSecretKey(
      fromHexString(privKey)
    );

    return userIdentity;
  } catch (error) {
    return null;
  }
};

export const getUserPrincipal = (privKey) => {
  try {
    const userIdentity = Secp256k1KeyIdentity.fromSecretKey(
      fromHexString(privKey)
    );

    return userIdentity.getPrincipal();
  } catch (error) {
    return null;
  }
};

export const getUserPrincipalFromText = (walletAddress) => {
  try {
    return Principal.fromText(walletAddress);
  } catch (error) {
    return null;
  }
};

export const lokaDefiAgentCreation = (privKey) => {
  try {
    const userIdentity = getUserIdentity(privKey);

    const userLokaIdentity = createActor(
      process.env.REACT_APP_LOKA_DEFI_CANISTER_ID,
      {
        identity: userIdentity,
      }
    );

    return userLokaIdentity;
  } catch (error) {
    return null;
  }
};

export const lokBTCAgentCreation = (privKey) => {
  try {
    const userIdentity = getUserIdentity(privKey);

    const userLokaIdentity = createActorLOKBTC(
      process.env.REACT_APP_LOKBTC_CANISTER_ID,
      {
        identity: userIdentity,
      }
    );

    return userLokaIdentity;
  } catch (error) {
    return null;
  }
};

export const ckBTCAgentCreation = (privKey) => {
  try {
    const userIdentity = getUserIdentity(privKey);

    const userckBTCIdentity = createActorCKBTC(
      process.env.REACT_APP_CKBTC_LEDGER_ID,
      {
        identity: userIdentity,
      }
    );

    return userckBTCIdentity;
  } catch (error) {
    return null;
  }
};

export const mptsAgentCreation = (privKey) => {
  try {
    const userIdentity = getUserIdentity(privKey);

    const userckBTCIdentity = createActorCKBTC(
      "qnxxg-3qaaa-aaaak-qinda-cai",
      {
        identity: userIdentity,
      }
    );

    return userckBTCIdentity;
  } catch (error) {
    return null;
  }
};

export const lptsAgentCreation = (privKey) => {
  try {
    const userIdentity = getUserIdentity(privKey);

    const userckBTCIdentity = createActorCKBTC(
      "qkwrs-wiaaa-aaaak-qindq-cai",
      {
        identity: userIdentity,
      }
    );

    return userckBTCIdentity;
  } catch (error) {
    return null;
  }
};
