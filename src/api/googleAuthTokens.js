import { googleAuth } from '@/services/network/googleAuth.js'

export const getGoogleAccessToken = (authorizationCode) => {
  return googleAuth.post('', {
    code: authorizationCode,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    redirect_uri: window.location.origin,
    grant_type: 'authorization_code',
    access_type: 'offline',
  })
}

export const refreshGoogleAccessToken = (refreshToken) => {
  return googleAuth.post('', {
    refresh_token: refreshToken,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    grant_type: 'refresh_token',
  })
}
