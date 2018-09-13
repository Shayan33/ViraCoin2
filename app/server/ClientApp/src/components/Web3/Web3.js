import { Statics } from '../Statics'
const ViraCoinTokenRopsNetAddress = "0x11dfa93fb8d3c35c3472557d5ccbc76dbda289f3";
const ViraCoinCartRopsNetAddress = "0xdc079ca42012a7b6bd3056ec0e3099da2658014";
var NewTokenFee = 100000000000000000;
var ShopFee = 1000000000000000;

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
        return window.web3.eth.defaultAccount;
    }
    static CheckWeb3Initaited() {
        return Web3s.CheckWeb3() && Web3s.CheckMainNet() && Web3s.CheckOnline();
    }
}