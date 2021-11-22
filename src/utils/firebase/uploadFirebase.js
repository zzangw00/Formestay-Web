import firebase from 'firebase';
import { firebaseConfig } from './configFirebase';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
export const storage = firebase.storage();

export function handleFirebaseUpload(path, filename, file) {
    return new Promise(function (resolve, reject) {
        const uploadTask = storage.ref(`${path}/${filename}`).put(file);
        uploadTask.on(
            'state_changed',
            () => {},
            (error) => {
                console.log(error);
                reject();
            },
            () => {
                storage
                    .ref(`${path}`)
                    .child(filename)
                    .getDownloadURL()
                    .then((url) => {
                        resolve(url);
                    });
            },
        );
    });
}
