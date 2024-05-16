import axios from "axios";

import ICON_BCA from "../assets/icons/BCA.png";
import ICON_MANDIRI from "../assets/icons/MANDIRI.png";
import ICON_BNI from "../assets/icons/BNI.png";

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const axiosIntance = axios.create({
  baseURL: process.env.REACT_APP_JWALLET_ENDPOINT,
  timeout: 30000,
  headers: {
    "x-api-key": process.env.REACT_APP_JWALLET_API_KEY,
    "x-api-secret": process.env.REACT_APP_JWALLET_API_SECRET,
  },
});

export const getBankList = async () => {
  try {
    const url = `open/v1/supported-banks`;
    const response = await axiosIntance.get(url);

    // jwallet not provide icon for bank list

    const mappBankIcon = {
      BCA: ICON_BCA,
      MANDIRI: ICON_MANDIRI,
      BNI: ICON_BNI,
    };
    return response.data.map((bank) => ({
      ...bank,
      iconUrl: mappBankIcon[bank.name],
    }));
  } catch (error) {
    console.log("<<<<< failed get bank list from jwallet");
    throw error;
  }
};

export const getEwalletList = async () => {
  try {
    const url = `open/v1/supported-ewallets`;
    const response = await axiosIntance.get(url);
    return response.data;
  } catch (error) {
    console.log("<<<<< failed get bank list from jwallet");
    throw error;
  }
};

export const createBeneficiaryAccount = async (type, beneficiaryDetail) => {
  try {
    const url = `open/v1/${type}-account`;
    const response = await axiosIntance.post(url, beneficiaryDetail);

    return response.data;
  } catch (error) {
    console.log("<<<<< failed create beneficiary account jwallet");
    throw error;
  }
};

export const checkBeneficiaryAccount = async (type, beneficiaryId) => {
  try {
    const url = `open/v1/${type}-account/${beneficiaryId}`;

    const response = await axiosIntance.get(url);
    return response.data;
  } catch (error) {
    console.log("<<<<< failed checking beneficiary account jwallet");
    throw error;
  }
};

export const checkBTCRate = async (from_amount) => {
  try {
    const url = `open/v1/quote`;
    const response = await axiosIntance.get(url, {
      params: {
        from_asset: process.env.REACT_APP_JWALLET_CURRENCY,
        to_asset: "JIDR",
        from_amount,
      },
    });

    return response.data;
  } catch (error) {
    console.log("<<<<< failed to get quote from jwallet");
    throw error;
  }
};

export const checkTransactionStatus = async (trxId) => {
  try {
    const url = `open/v1/transaction/${trxId}`;
    const response = await axiosIntance.get(url);
    await timeout(2000);
    return response.data;
  } catch (error) {
    console.log("<<<<< failed check transactionSTatus");
    throw error;
  }
};
