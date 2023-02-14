import * as Sentry from "sentry-expo";
import {SENTRY_DSN} from 'react-native-dotenv';
export const initializeSentry =  () => {

    Sentry.init({
        dsn: SENTRY_DSN,
        enableInExpoDevelopment: true,
        debug: true, // If true, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to false in production
    });
}

export const captureSuccess = (route) => {
    Sentry.Native.captureMessage(`SUCCESS! ROUTE/PAGE: ${route}`)
}
export const captureError = (error, route) => {
    const e = JSON.stringify(error)
    Sentry.Native.captureMessage(`ROUTE/PAGE: "${route}", ERROR MESSAGE: "${e}"`)
    Sentry.Native.captureException(error, route)
}
