export const idlFactory = ({ IDL }) => {
  const AddLiquidityResult = IDL.Variant({
    transferFailed: IDL.Text,
    success: IDL.Nat,
  });
  const TransferRes = IDL.Variant({ error: IDL.Text, success: IDL.Nat });
  const Claimable = IDL.Record({
    id: IDL.Nat,
    time: IDL.Int,
    amount: IDL.Nat,
  });
  const HttpHeader = IDL.Record({ value: IDL.Text, name: IDL.Text });
  const HttpResponsePayload = IDL.Record({
    status: IDL.Nat,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HttpHeader),
  });
  const TransformArgs = IDL.Record({
    context: IDL.Vec(IDL.Nat8),
    response: HttpResponsePayload,
  });
  const CanisterHttpResponsePayload = IDL.Record({
    status: IDL.Nat,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HttpHeader),
  });
  return IDL.Service({
    addLiquidity: IDL.Func([IDL.Nat], [AddLiquidityResult], []),
    claimCKBTC: IDL.Func([], [TransferRes], []),
    claimLPTS: IDL.Func([], [TransferRes], []),
    claimMPTS: IDL.Func([], [TransferRes], []),
    clearDefiData: IDL.Func([IDL.Bool], [], []),
    distributeLPTS: IDL.Func([IDL.Nat], [], []),
    distributeMPTS: IDL.Func([IDL.Nat, IDL.Text], [], []),
    getCKBTCBalance: IDL.Func([], [IDL.Nat], []),
    getCKBTCMinter: IDL.Func([], [IDL.Text], []),
    getCanisterTimeStamp: IDL.Func([], [IDL.Int], ["query"]),
    getCounter: IDL.Func([], [IDL.Nat], ["query"]),
    getCurrentScheduler: IDL.Func([], [IDL.Nat], ["query"]),
    getLPTS: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))], []),
    getMPTS: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))], []),
    getNextRebaseHour: IDL.Func([], [IDL.Int], ["query"]),
    getTime: IDL.Func([], [IDL.Bool], []),
    getUserData: IDL.Func(
      [],
      [
        IDL.Record({
          staked: IDL.Nat,
          ckBTCClaimList: IDL.Vec(IDL.Tuple(IDL.Nat, Claimable)),
          totalPendingCKBTC: IDL.Nat,
          ckbtc: IDL.Nat,
          lpts: IDL.Nat,
          mpts: IDL.Nat,
          claimableLPTS: IDL.Nat,
          claimableMPTS: IDL.Nat,
          lokbtc: IDL.Nat,
          totalWithdrawableCKBTC: IDL.Nat,
        }),
      ],
      []
    ),
    isNotPaused: IDL.Func([], [IDL.Bool], ["query"]),
    pauseCanister: IDL.Func([IDL.Bool], [IDL.Bool], []),
    rebaseLOKBTC: IDL.Func([], [IDL.Text], []),
    requestRedeem: IDL.Func(
      [IDL.Nat],
      [IDL.Variant({ error: IDL.Text, success: Claimable })],
      []
    ),
    setCKBTCPool: IDL.Func([IDL.Text], [IDL.Principal], []),
    setJwalletVault: IDL.Func([IDL.Text], [IDL.Text], []),
    setLOKBTC: IDL.Func([IDL.Text], [], []),
    setPoolCanister: IDL.Func([IDL.Text], [], []),
    swapToLPTS: IDL.Func([IDL.Nat], [TransferRes], []),
    swapToMPTS: IDL.Func([IDL.Nat], [TransferRes], []),
    transform: IDL.Func(
      [TransformArgs],
      [CanisterHttpResponsePayload],
      ["query"]
    ),
    updateckBTCBalance: IDL.Func([], [], []),
    whoCall: IDL.Func([], [IDL.Text], ["query"]),
  });
};
export const init = ({ IDL }) => {
  return [];
};
