from pyteal import *

def escrow():

    contract_deployment = Seq([
            App.globalPut(Bytes("ADMIN"), Txn.application_args[0]), 
            Approve(),
        ])

    valid_caller = Txn.sender() == App.globalGet(Bytes("ADMIN"))

    amount = Btoi(Txn.application_args[1])
    receiver = Txn.sender()
    transfer = Seq([
        Assert(valid_caller), 
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields({
            TxnField.type_enum: TxnType.Payment, 
            TxnField.amount: amount,
            TxnField.receiver: receiver,
            }),
        InnerTxnBuilder.Submit(),
        Approve(),
    ])


    on_call_method = Txn.application_args[0]
    contract_interface = Cond(
        [on_call_method == Bytes("transfer"), transfer], 
    )

    program_calls = Cond ( 
        [Txn.application_id() == Int(0), contract_deployment],
        [Txn.on_completion() == OnComplete.NoOp, contract_interface],
    )

    return program_calls

if __name__ == "__main__":
    with open("escrowSSC.teal", "w") as f:
        compiled = compileTeal(escrow(), mode=Mode.Application, version=5)
        f.write(compiled)