<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Toast />

  </div>
</template>


<script setup>
/******************* Plugins *******************/
const toast = useToast();

// Store
const store = useAuthStore();
const { notificationToken } = storeToRefs(store);

/******************* FCM *******************/
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

onMounted(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyB708OhVOfUbSGTlXMz8_KMIbNbsVxBC6E",
    authDomain: "murouj-a4aa4.firebaseapp.com",
    projectId: "murouj-a4aa4",
    storageBucket: "murouj-a4aa4.appspot.com",
    messagingSenderId: "258880669628",
    appId: "1:258880669628:web:1ebfa2d2fc8a13d5fc4db9",
    measurementId: "G-LZQ2GT6WVD"
  };
  
  const app = initializeApp(firebaseConfig);
  
  const messaging = getMessaging();
  
  onMessage(messaging, (payload) => {
    toast.add({ severity: 'info', summary: `${payload.notification.title}`, detail: `${payload.notification.body}`, life: 3500 });
  });
  
  getToken(messaging, { vapidKey: 'BDklS8cl2dsha7qKdB7qiGN30HCOEjK3qt6q_BXDE2Ej8aM3n4QEmQCfvOpHWA5N7xA8QGM2tU7E6_5T_Wj-7yY' }).then((currentToken) => {
    if (currentToken) {
      notificationToken.value = currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
  
});

</script>