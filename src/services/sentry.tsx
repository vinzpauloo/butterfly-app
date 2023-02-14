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

// How to use:
// 1. In your target component, create a variable 'route':
//
//    const route = useRoute<any>()
//
// 2. Import the functions captureError and captureSuccess
//
// 3. In your 'useQuery', 'useQueries', you may attach the function captureSuccess and captureError on your 'onSuccess' and 'onError', please see the code below as an example:

    // const { example } = useQuery({
    //     queryKey: ["exampleKey"],
    //     queryFn: hookFunction,
    //     onSuccess:
    //         //Your code here...
    //         captureSuccess(route.name)
    //     },
    //     onError: (error) => {
    //         captureError(error, route.name)
    //     },
    // });

// IMPORTANT NOTE: Please make sure to download the ".env" file from our team chat for the Sentry "dsn"

