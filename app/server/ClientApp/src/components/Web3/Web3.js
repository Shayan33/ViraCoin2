import { Statics } from '../Statics';
import { ViraICOABI } from './ViraICOABI';
import history from '../history';
const ViraICoRopstenAddress = '0x37d609fce87dc53015ceda0f938e2c3a74a32494';
var Acc = "null";
var EtherScanBaseUrl = 'https://ropsten.etherscan.io/tx/';
var LatestTokenData = '';
export class Web3s {
    static CheckWeb3() {
        if (typeof window.web3 !== 'undefined') {
            return true;
        } else {
            return false;
        }
    }
    static CheckMainNet() {
        if (window.web3.version.network === Statics.GetMainNetID()) {
            return true;
        } else {
            return false;
        }
    }
    static CheckOnline() {
        return window.web3.isConnected();
    }

    static GetAccount() {
        if (Acc === "null")
            Acc = String(window.web3.eth.defaultAccount);
        else if (Acc !== String(window.web3.eth.defaultAccount)) {
            Acc = String(window.web3.eth.defaultAccount);
            Statics.LogOut();
            alert('Account Changed.');
        }
        return Acc;
    }
    static CheckWeb3Initaited() {
        return Web3s.CheckWeb3() && Web3s.CheckMainNet() && Web3s.CheckOnline() && (String(Web3s.GetAccount()) !== 'undefined');
    }
    static Hex(Data) {
        return window.web3.toHex(Data);
    }
    static Ascii(Data) {
        return window.web3.toAscii(Data);
    }
    static Wei(Data) {
        return window.web3.toWei(Data);
    }
    // static Sign() {
    //     var p = window.web3.eth.sign(Web3s.GetAccount(),"hamed", (err, res) => {
    //         alert(err);
    //         if (!err) console.log(JSON.stringify(res));
    //         else console.error(err);
    //     });
    //     console.log(JSON.stringify(p));
    // }
    static Sha3(data) {
        return window.web3.sha3(data);
    }
    static IsAddress(address) {
        return window.web3.isAddress(address);
    }
}
export class ViraICO {
    static ViraICO() {
        var ViraICOContract = window.web3.eth.contract(ViraICOABI);
        var instance = ViraICOContract.at(ViraICoRopstenAddress);
        return instance;
    }
    //#region  Admin

    static Owner() {
        ViraICO.ViraICO().Owner((e, r) => {
            if (!e) {
                if (String(r) !== 'true') {
                    alert('only admin');
                    history.push('/');
                }
            }
            else console.error(e);
        });
    }
    static Withdraw() {
        ViraICO.ViraICO().Withdraw((e, r) => {
            if (!e) {
                window.open(EtherScanBaseUrl + r, '_blank');
            }
            else console.error(e);
        })
    }
    static GetFunds(CallBack) {
        ViraICO.ViraICO().GetFunds((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }
    static Kill() {
        ViraICO.ViraICO().Kill((e, r) => {
            if (!e) {
                window.open(EtherScanBaseUrl + r, '_blank');
            }
            else console.error(e);
        })
    }
    static TotallSupply(CallBack) {
        ViraICO.ViraICO().totalSupply((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }

    static SpentSupply(CallBack) {
        ViraICO.ViraICO().SpentSupply((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }


    static UpdatePrice(price) {
        ViraICO.ViraICO().UpdatePrice(price, (e, r) => {
            if (!e) {
                window.open(EtherScanBaseUrl + r, '_blank');
            }
            else console.error(e);
        })
    }
    //#endregion

    //#region  Carpet

    static AddCarpet(IV, Tok, Proud, callback, pr, img, meta) {
        ViraICO.ViraICO().AddCarpet(IV, Tok, Proud,
            (e, r) => {
                if (!e) {
                    window.open(EtherScanBaseUrl + r, '_blank');
                    callback(r, IV, Tok, pr, img, meta);
                }
                else console.error(e);
            });
    }

    static GetCount(CallBack) {
        ViraICO.ViraICO().GetCount((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }

    static Exist(no, CallBack) {
        ViraICO.ViraICO().Existe(no, (e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }
    static InitiatingIsOver(CallBack) {
        ViraICO.ViraICO().InitiatingIsOver((e, r) => {
            if (!e) {
                window.open(EtherScanBaseUrl + r, '_blank');
                CallBack();
            }
            else console.error(e);
        })
    }

    static GetCarpet(CallBack, no) {
        ViraICO.ViraICO().GetCarpet(no, (e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }
    //#endregion

    //#region Tokens

    static GetMyBalance(CallBack) {
        ViraICO.ViraICO().myBalance((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        });
    }

    static Transfer(to, value, CallBack) {
        ViraICO.ViraICO().transfer(to, value,
            (e, r) => {
                if (!e) {
                    window.open(EtherScanBaseUrl + r, '_blank');
                    CallBack(r);
                }
                else console.error(e);
            });
    }
    static Deposite(value) {
        ViraICO.ViraICO().Deposite({ value: value },
            (e, r) => {
                if (!e) {
                    window.open(EtherScanBaseUrl + r, '_blank');
                }
                else console.error(e);
            });
    }
    static GetPrice(CallBack) {
        ViraICO.ViraICO().price((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        });
    }
    //#endregion

    //#region  ICO

    static ICO(to, value, CallBack) {
        ViraICO.ViraICO().ICO(to, value,
            (e, r) => {
                if (!e) {
                    window.open(EtherScanBaseUrl + r, '_blank');
                    CallBack(r);
                }
                else console.error(e);
            });
    }

    static ICOAdd(to, value, CallBack) {
        ViraICO.ViraICO().ICOAdd(to, value,
            (e, r) => {
                if (!e) {
                    window.open(EtherScanBaseUrl + r, '_blank');
                    CallBack(r);
                }
                else console.error(e);
            });
    }
    //#endregion

    //#region phasing functions

    static ReservedSupply(CallBack) {
        ViraICO.ViraICO().ReservedSupply((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }
    static TeamSupply(CallBack) {
        ViraICO.ViraICO().TeamSupply((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }
    static CrowdSaleSupply(CallBack) {
        ViraICO.ViraICO().CrowdSaleSupply((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }
    static CrowdSaleSpentSupply(CallBack) {
        ViraICO.ViraICO().CrowdSaleSpentSupply((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }
    static PhaseSupply(CallBack) {
        ViraICO.ViraICO().GetPhaseSupply((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }
    static PhaseSpentSupply(CallBack) {
        ViraICO.ViraICO().GetPhaseSpentSupply((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }
    static PhaseMax(CallBack) {
        ViraICO.ViraICO().GetPhaseMax((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }

    static AddEceptionalContract(address, CallBack) {
        ViraICO.ViraICO().AddExceptionalContract(address, (e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }

    static ConfirmForICO(address, CallBack) {
        ViraICO.ViraICO().ConfirmForICO(address, (e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }

    static Register(CallBack) {
        ViraICO.ViraICO().Register((e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }
    static SetPhase(Supply, maxStake, CallBack) {
        ViraICO.ViraICO().SetPhase(Supply, maxStake, (e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }

    static UpdatePhase(Supply, maxStake, CallBack) {
        ViraICO.ViraICO().UpdatePhase(Supply, maxStake, (e, r) => {
            if (!e) {
                CallBack(r);
            }
            else console.error(e);
        })
    }
    //#endregion
}