import jwtDecode from "jwt-decode";
import config from "../config";

let _timeoutId;
const _TEN_SECONDS = 1000;

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  parseJwt(jwt) {
    return jwtDecode(jwt);
  },
  readJwToken() {
    return TokenService.parseJwt(TokenService.getAuthToken());
  },
  _getsMsUntilExpiry(payload) {
    return payload.exp * 1000 - Date.now();
  },
  queCallbackBeforeExpirey(callback) {
    const MsUntilExpiry = TokenService._getsMsUntilExpiry(
      TokenService.readJwToken()
    );
    _timeoutId = setTimeout(callback, MsUntilExpiry - _TEN_SECONDS);
  },
  clearCallbackBeforeExpirey() {
    clearTimeout(_timeoutId);
  },
};

export default TokenService;
