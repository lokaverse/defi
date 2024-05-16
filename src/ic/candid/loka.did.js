export const idlFactory = ({ IDL }) => {
  const AddLiquidityResult = IDL.Variant({
    transferFailed: IDL.Text,
    success: IDL.Nat,
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
  const TransferRes = IDL.Variant({ error: IDL.Text, success: IDL.Nat });
  const Miner = IDL.Service({
    addLiquidity: IDL.Func([IDL.Nat], [AddLiquidityResult], []),
    clearData: IDL.Func([], [], []),
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
          ckbtc: IDL.Nat,
          lokbtc: IDL.Nat,
        }),
      ],
      []
    ),
    isNotPaused: IDL.Func([], [IDL.Bool], ["query"]),
    pauseCanister: IDL.Func([IDL.Bool], [IDL.Bool], []),
    routine24Force: IDL.Func([], [IDL.Text], []),
    setCKBTCPool: IDL.Func([IDL.Text], [IDL.Principal], []),
    setJwalletVault: IDL.Func([IDL.Text], [IDL.Text], []),
    setLOKBTC: IDL.Func([IDL.Text], [], []),
    startScheduler: IDL.Func([], [IDL.Nat], []),
    transform: IDL.Func(
      [TransformArgs],
      [CanisterHttpResponsePayload],
      ["query"]
    ),
    updateckBTCBalance: IDL.Func([], [], []),
    whoCall: IDL.Func([], [IDL.Text], ["query"]),
    withdrawCKBTC: IDL.Func([IDL.Nat], [TransferRes], []),
  });
  return Miner;
};
export const init = ({ IDL }) => {
  return [IDL.Record({ admin: IDL.Principal })];
};
