export const TOKEN_KEY = 'jwt_token';

export const login = (token) => {
    debugger;
    return localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

