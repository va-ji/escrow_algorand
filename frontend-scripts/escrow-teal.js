const escrowSource = `
#pragma version 5
txn ApplicationID
int 0
==
bnz main_l10
txn OnCompletion
int NoOp
==
bnz main_l3
err
main_l3:
txna ApplicationArgs 0
byte "opt_nft"
==
bnz main_l9
txna ApplicationArgs 0
byte "transfer"
==
bnz main_l8
txna ApplicationArgs 0
byte "transfernft"
==
bnz main_l7
err
main_l7:
itxn_begin
int axfer
itxn_field TypeEnum
txna Assets 0
itxn_field XferAsset
int 1
itxn_field AssetAmount
txn Sender
itxn_field AssetReceiver
itxn_submit
itxn_begin
int acfg
itxn_field TypeEnum
txna Assets 0
itxn_field ConfigAsset
txn Sender
itxn_field ConfigAssetManager
itxn_submit
int 1
return
main_l8:
txn Sender
byte "ADMIN"
app_global_get
==
assert
itxn_begin
int pay
itxn_field TypeEnum
txna ApplicationArgs 1
btoi
itxn_field Amount
txn Sender
itxn_field Receiver
itxn_submit
int 1
return
main_l9:
txn Sender
byte "ADMIN"
app_global_get
==
assert
itxn_begin
int axfer
itxn_field TypeEnum
txna Assets 0
itxn_field XferAsset
int 0
itxn_field AssetAmount
global CurrentApplicationAddress
itxn_field AssetReceiver
itxn_submit
int 1
return
main_l10:
byte "ADMIN"
txna ApplicationArgs 0
app_global_put
int 1
return
`;

module.exports = escrowSource;