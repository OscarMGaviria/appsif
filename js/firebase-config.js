// Importar las funciones necesarias de los SDKs de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCu-xGv-XYPRURgr663shm-0wVzym0_VXc",
    authDomain: "appsif-78ded.firebaseapp.com",
    projectId: "appsif-78ded",
    storageBucket: "appsif-78ded.firebasestorage.app",
    messagingSenderId: "946349392819",
    appId: "1:946349392819:web:09a04880e9aed24e40c1c6"
  };


// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar los servicios de Firebase
const auth = getAuth(app);            // Autenticación
const database = getDatabase(app);    // Base de datos en tiempo real
const storage = getStorage(app);      // Almacenamiento

// Exportar los servicios para usarlos en otras partes de la aplicación
export { auth, database, storage };
