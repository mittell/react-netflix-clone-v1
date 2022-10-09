import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { seedDatabase } from '../seed';

const config = {
	apiKey: process.env.APIKEY,
	authDomain: process.env.AUTHDOMAIN,
	databaseURL: process.env.DATABASEURL,
	projectId: process.env.PROJECTID,
	storageBucket: process.env.STORAGEBUCKET,
	messagingSenderId: process.env.MESSAGINGSENDERID,
	appId: process.env.APPID,
};

const fb = firebase.initializeApp(config);

// seedDatabase(fb);

export { fb };
