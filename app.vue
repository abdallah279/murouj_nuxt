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

if (process.client) {

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

  getToken(messaging, { vapidKey: 'AAAAPEZ9h7w:APA91bGXZ-bC4MAM74a2r7vjTB6dovOCL6tEbRSCyHb49A5AbYVDPTRqP9ybTxIe1n8Gbh9RtFkAmrWvuY5MOKmFrmG3dftXRupji1dSlR-8ry-V75g1do_nyDszDuS0PP9eh8Dm9yoq' }).then((currentToken) => {
    if (currentToken) {
      localStorage.setItem('notificationToken', currentToken);
      notificationToken.value = currentToken
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}

</script>