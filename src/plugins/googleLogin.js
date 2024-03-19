import vue3GoogleLogin from 'vue3-google-login'
import {GOOGLE_CLIENT_ID} from "@/constants/login/client.js";

export const initGoogleLogin = (app) => {
    app.use(vue3GoogleLogin, {clientId : GOOGLE_CLIENT_ID})
}

