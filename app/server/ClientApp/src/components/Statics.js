import history from './history';
var Token = 'Null';
var SignInCookieName = 'a';
export class Statics {
    static IsLogin() {
        var res = Statics.CheckCookie(SignInCookieName, Token);
        if (!res) history.push('/');
        return res;
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
        // todo server
        Statics.SetCookie(SignInCookieName, Token, 10);
    }
    static LogOut() {
        // todo server
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
}