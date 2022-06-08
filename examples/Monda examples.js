

// Future -> Promise 
let userFcmToken = Future(() => await localStorage.getItem("userFcmToken"))

const convertToBody = (userFcmToken) => {
  return {
    fcm_token: userFcmToken,
  };
};

convertToBody('AAA3029309') // { fcm_token: 'AAA3029309' }

sendFcmTokenRequest(
    body,
    async () => {
      await AsyncStorage.setItem("fcmSaved", "true");
      checkLocationPermissionHandler();
    },
    null,
    false
  );