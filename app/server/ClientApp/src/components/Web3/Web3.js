import { Statics } from '../Statics';
import { ViraCoinTokenABI } from './ViraCoinTokenABI';
import history from '../history';
const ViraCoinTokenRopsNetAddress = '0x11dfa93fb8d3c35c3472557d5ccbc76dbda289f3';
const ViraCoinCartRopsNetAddress = '0xdc079ca42012a7b6bd3056ec0e3099da2658014';
var NewTokenFee = 100000000000000000;
var ShopFee = 1000000000000000;
var Acc = "null";
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

    // static Sign() {
    //     var p = window.web3.eth.sign(Web3s.GetAccount(),"hamed", (err, res) => {
    //         alert(err);
    //         if (!err) console.log(JSON.stringify(res));
    //         else console.error(err);
    //     });
    //     console.log(JSON.stringify(p));
    // }
}
export class ViraCoinToken {
    static ViraToken() {
        var ViraTokenContract = window.web3.eth.contract(ViraCoinTokenABI);
        var instance = ViraTokenContract.at(ViraCoinCartRopsNetAddress);
        return instance;
    }
    static Fee() {
        ViraCoinToken.ViraToken().Fee();
    }
}