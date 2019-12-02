import * as firebase from 'firebase';

export const Config = () => {
  const config = process.env.firebaseConfig; 
  


  firebase.initializeApp(config!);

  return firebase;
};

export default Config;
