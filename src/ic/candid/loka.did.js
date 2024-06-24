export const idlFactory = ({ IDL }) => {
  const AddLiquidityResult = IDL.Variant({
    transferFailed: IDL.Text,
    success: IDL.Nat,
  });
  const TransferResult = IDL.Variant({
    error: IDL.Text,
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
    burnTestCKBTC: IDL.Func([], [TransferResult], []),
    claimCKBTC: IDL.Func([IDL.Nat], [TransferRes], []),
    claimLPTS: IDL.Func([], [TransferRes], []),
    claimMPTS: IDL.Func([], [TransferRes], []),
    clearData: IDL.Func([], [], []),
    distributeLPTS: IDL.Func([IDL.Nat], [], []),
    distributeMPTS: IDL.Func([IDL.Nat, IDL.Text], [], []),
    fetchUserById: IDL.Func([IDL.Nat], [], ["query"]),
    fetchUserByPrincipal: IDL.Func([IDL.Principal], [], ["query"]),
    getCKBTCBalance: IDL.Func([], [IDL.Nat], []),
    getCKBTCMinter: IDL.Func([], [IDL.Text], []),
    getCanisterTimeStamp: IDL.Func([], [IDL.Int], ["query"]),
    getCurrentScheduler: IDL.Func([], [IDL.Nat], ["query"]),
    getNextRebaseHour: IDL.Func([], [IDL.Int], ["query"]),
    getUserData: IDL.Func(
      [],
      [
        IDL.Record({
          staked: IDL.Nat,
          ckBTCClaimList: IDL.Vec(IDL.Tuple(IDL.Nat, Claimable)),
          ckbtc: IDL.Nat,
          lpts: IDL.Nat,
          mpts: IDL.Nat,
          lokbtc: IDL.Nat,
        }),
      ],
      []
    ),
    init: IDL.Func([], [IDL.Nat], []),
    isNotPaused: IDL.Func([], [IDL.Bool], ["query"]),
    pauseCanister: IDL.Func([IDL.Bool], [IDL.Bool], []),
    requestRedeem: IDL.Func(
      [IDL.Nat],
      [IDL.Variant({ error: IDL.Text, success: Claimable })],
      []
    ),
    routine24Force: IDL.Func([], [IDL.Text], []),
    setCKBTCPool: IDL.Func([IDL.Text], [IDL.Principal], []),
    setJwalletVault: IDL.Func([IDL.Text], [IDL.Text], []),
    setLOKBTC: IDL.Func([IDL.Text], [], []),
    setPoolCanister: IDL.Func([IDL.Text], [], []),
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
