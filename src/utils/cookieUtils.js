export function setAccessTokenCookie(res, accessToken, maxAge = 60 * 60 * 1000) {
    return res.cookie('accessToken', accessToken, { maxAge: maxAge, httpOnly: true })
}

export function setRefreshTokenCookie(res, refreshToken, maxAge = 30 * 24 * 60 * 60 * 1000, path = '/auth') {
    return res.cookie('refreshToken', refreshToken, { maxAge: maxAge, httpOnly: true, path: path })
}

export function clearCookies(res, refreshPath = '/auth') {
    return res
        .clearCookie('accessToken', { path: '/' })
        .clearCookie('refreshToken', { path: refreshPath })
}