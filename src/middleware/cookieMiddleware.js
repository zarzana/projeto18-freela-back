export function readRefreshToken(req, res, next) {

    res.locals.accessToken = req.cookies.accessToken;
    res.locals.refreshToken = req.cookies.refreshToken;

    if (!res.locals.refreshToken) { return res.sendStatus(400) };  // raises error if there is NO refresh token

    next();

}

export function refreshTokenAbsent(req, res, next) {

    const refreshToken = req.cookies.refreshToken;
    if (!!refreshToken) { return res.sendStatus(400) };  // raises error if there IS a refresh token

    next();

}

export function clearCookies(req, res, next) {

    res
        .clearCookie('accessToken', { path: '/' })
        .clearCookie('refreshToken', { path: '/auth' });

    next()

}