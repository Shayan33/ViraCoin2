import { Web3s } from './Web3/Web3';
import history from './history';
var Token = 'Null';
var SignInCookieName = 'a';
var MainNetID = "3";
export class Statics {
    static IsLogin() {
        var res = Statics.CheckCookie(SignInCookieName, Token);
        if (!res) {
            history.push('/');
            return res;
        } else {
            fetch('api/api/Account/Login', {
                method: 'GET',
                headers: {
                    'PubKey': Web3s.GetAccount(),
                    'PrivateToken': Statics.GetToken(),
                }
            })
                .then(r => r.status === 200 ? {} : history.push('/'))
            //.then(s => alert(s.status));
            return res;
        }
    }
    static NavMenueLogin() {
        return Statics.CheckCookie(SignInCookieName, Token);
    }
    static GetToken() {
        return Token;
    }

    static SetCookie(CName, CValue, ExMinutes) {
        var d = new Date();
        d.setTime(d.getTime() + (ExMinutes * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = CName + "=" + CValue + ";" + expires + ";path=/";
    }
    static ClearCookie(CName) {
        Statics.SetCookie(CName, 'null', -1);
    }
    static Login() {
        if (Web3s.CheckWeb3Initaited()) {
            fetch('Login', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'PubKey': Web3s.GetAccount(),
                }
            }).then(res => {
                if (res.status === 200) {
                    Token = res.headers.get('Session');
                    SignInCookieName = res.headers.get('Cookie');
                    Statics.SetCookie(SignInCookieName, Token, 10);
                    setTimeout(
                        function () {
                            history.push('/Inventory');
                        }
                            .bind(this),
                        1500
                    );
                }
                else if (res.status === 201) {
                    Token = res.headers.get('Session');
                    SignInCookieName = res.headers.get('Cookie');
                    Statics.SetCookie(SignInCookieName, Token, 10);
                    setTimeout(
                        function () {
                            history.push('/Account');
                        }
                            .bind(this),
                        1500
                    );

                } else {
                    console.error('sth went wrong');
                }
            });
        }
    }
    static LogOut() {
        Statics.ClearCookie(SignInCookieName);
        history.push('/');
    }
    static GetCookie(CName) {
        var name = CName + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static CheckCookie(CName, Value) {
        var ca = Statics.GetCookie(CName);
        if (ca !== "") {
            return ca === Value ? true : false;
        } else {
            return false;
        }
    }

    static GetMainNetID() {
        return MainNetID;
    }
}