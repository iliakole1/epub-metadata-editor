// Sinterklaas gift lists — settings
// Edit this file to change who is in the group and to connect the Firebase database.

window.SINT_CONFIG = {
  // The people in the group (shown alphabetically).
  names: ['Anne', 'Esmée', 'Estelle', 'Harrie', 'Ilia', 'Ize', 'Lea', 'Mathijs'],

  // Keeps an existing account when a name's spelling changes: { 'New spelling': 'old-key' }.
  keys: { 'Mathijs': 'matthijs' },

  // Little ones who don't log in: their parents write their wish lists for them.
  kids: { 'Ize': ['Anne', 'Mathijs'], 'Lea': ['Anne', 'Mathijs'] },

  // Paste the firebaseConfig object from the Firebase console here (see README.md).
  // While this is null the app runs in demo mode: data is only stored on this device.
  firebase: {
    apiKey: "AIzaSyA10SngSMlozQkbRq2inSlydBHeVz9zLlI",
    authDomain: "sinterklaas-d0541.firebaseapp.com",
    databaseURL: "https://sinterklaas-d0541-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sinterklaas-d0541",
    storageBucket: "sinterklaas-d0541.firebasestorage.app",
    messagingSenderId: "800460549118",
    appId: "1:800460549118:web:0b09216553f83db79e2eaf",
  },
};
