export function refreshTokenPresent(req, res, next) {

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) { return res.sendStatus(400) };  // raises error if there is NO refresh token

    next();

}

export function refreshTokenAbsent(req, res, next) {

    const refreshToken = req.cookies.refreshToken;
    if (!!refreshToken) { return res.sendStatus(400) };  // raises error if there IS a refresh token

    next();

}