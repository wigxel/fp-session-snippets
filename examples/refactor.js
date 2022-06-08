const saveFcmToken = async () => {
  let userFcmToken = await localStorage.getItem("userFcmToken");
  let body = {
    fcm_token: userFcmToken,
  };

  sendFcmTokenRequest(
    body,
    async () => {
      await AsyncStorage.setItem("fcmSaved", "true");
      checkLocationPermissionHandler();
    },
    null,
    false
  );
};

const sendFcmTokenWithError = async () => {
  await AsyncStorage.setItem("fcmSaved", "false");
  checkLocationPermissionHandler();
};


