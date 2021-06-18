import firebaseApp from '../core/firebaseConfig';

class FirebaseSerices {
    init(callback) {
        // User authentication
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                // If user loggined
                callback(null, user);
            } else {
                // Else login as Annoumous
                firebaseApp
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error)
                    })
            }
        })
    }
}

export default FirebaseSerices;