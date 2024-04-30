import { googleAuthApiClient } from '@/services/network/googleAuthApiClient.js'

export const getGoogleAccessToken = (authorizationCode) => {
  return googleAuthApiClient.post('', {
    code: authorizationCode,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    redirect_uri: window.location.origin,
    grant_type: 'authorization_code',
    access_type: 'offline',
  })
}

export const refreshGoogleAccessToken = (refreshToken) => {
  return googleAuthApiClient.post('', {
    refresh_token: refreshToken,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    grant_type: 'refresh_token',
  })
}
