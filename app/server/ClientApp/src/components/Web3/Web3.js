import { Statics } from '../Statics';
import { ViraCoinTokenABI } from './ViraCoinTokenABI';
import { CartABI } from './ViraCoinCartABI';
import history from '../history';
const ViraCoinTokenRopsNetAddress = '0x11dfa93fb8d3c35c3472557d5ccbc76dbda289f3';
const ViraCoinCartRopsNetAddress = '0xff20ca396e7fbafe06e879e3950eab5c5834f0e5';
var NewTokenFee = 100000000000000000;
var ShopFee = 1000000000000000;
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
export class ViraCoinToken {
    static ViraToken() {
        var ViraTokenContract = window.web3.eth.contract(ViraCoinTokenABI);
        var instance = ViraTokenContract.at(ViraCoinTokenRopsNetAddress);
        return instance;
    }
    static Fee() {
        ViraCoinToken.ViraToken().Fee((e, r) => {
            if (!e) alert(r);
            else console.error(e);
        });
    }
    static Issue(IV, Tok, Proud, callback, th, pr, reg, img, meta) {
        ViraCoinToken.ViraToken().IssueNewToken(IV, Tok, Proud,
            { value: NewTokenFee },
            (e, r) => {
                if (!e) {
                    window.open(EtherScanBaseUrl + r, '_blank');
                    callback(r, IV, th, pr, reg, img, meta);
                }
                else console.error(e);
            });
    }
    static Transfer(Address, Tok, callback, ID, from) {
        ViraCoinToken.ViraToken().Transfer(Tok, Address, {}, (e, r) => {
            if (!e) {
                window.open(EtherScanBaseUrl + r, '_blank');
                callback(ID, from, Address, r);
            }
            else console.error(e);
        })
    }
    static Mine(Tok) {
        ViraCoinToken.ViraToken().GetData(Tok, (e, r) => {
            if (!e) {
                //if correct slice it for conflict check
                if (String(r).includes(Tok)) alert('Yours.');
                else alert('Not Yours.');
            }
            else console.error(e);
        })
    }
    static Burn(Tok, callback, ID) {
        ViraCoinToken.ViraToken().Burn(Tok, (e, r) => {
            if (!e) {
                window.open(EtherScanBaseUrl + r, '_blank');
                callback(ID, r);
            }
            else console.error(e);
        })
    }
    static SetAttorny(Tok, Address, callback, ID) {
        ViraCoinToken.ViraToken().SetAttorney(Tok, Address, (e, r) => {
            if (!e) {
                window.open(EtherScanBaseUrl + r, '_blank');
                callback(ID, Address);
            }
            else console.error(e);
        });
    }
    static ClearAttorny(Tok, callback, ID) {
        ViraCoinToken.ViraToken().ClearAttorney(Tok, (e, r) => {
            if (!e) {
                window.open(EtherScanBaseUrl + r, '_blank');
                callback(ID, 'Cls');
            }
            else console.error(e);
        });
    }
    static AttorneyGet(Tok) {
        ViraCoinToken.ViraToken().AttorneyGet(Tok, (e, r) => {
            if (!e) LatestTokenData = r;
            else console.error(e);
        });
    }
}
export class ViraCoinCart {
    static GetAddress() {
        return ViraCoinCartRopsNetAddress;
    }
    static ViraCart() {
        var ViraTokenContract = window.web3.eth.contract(CartABI);
        var instance = ViraTokenContract.at(ViraCoinCartRopsNetAddress);
        return instance;
    }
    static NewAsset(Tok, Price, CallBack, ID, acc) {
        ViraCoinCart.ViraCart().NewAsset(Tok, Price, { value: ShopFee }, (e, r) => {
            if (!e) {
                window.open(EtherScanBaseUrl + r, '_blank');
                CallBack(ID, r, Price, acc);
            }
            else console.error(e);
        })
    }
    static GetData() {
        return LatestTokenData;
    }
}