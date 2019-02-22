import firebase from 'firebase';

class Fire {

    constructor() {
        this.init();
        this.observeAuth();
    }

    observeAuth = () => firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if(!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch({ message }) {
                alert(message);
            }
        }
    };
    
    get ref() {
        return firebase.database().ref('messages');
    }

    on = callback => this.ref.limitToLast(20).on('child_added', snapshot => callback(this.parse(snapshot)));

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;

        const timestamp = new Date(numberStamp);

        const message = {
            _id,
            timestamp,
            text,
            user
        };

        return message;
    };

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    send = messages => {
        for(let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.ref.push(message);
       }
    }

    off() {
        this.ref.off();
    }

    init = () => firebase.initializeApp({
        apiKey: "AIzaSyDfL5elP0ha1O8MSNPVGnOjvWw1gYrZovQ",
        authDomain: "first-chat-app-cbb33.firebaseapp.com",
        databaseURL: "https://first-chat-app-cbb33.firebaseio.com",
        projectId: "first-chat-app-cbb33",
        storageBucket: "first-chat-app-cbb33.appspot.com",
        messagingSenderId: "231142488680"    
    });

}

Fire.shared = new Fire();
export default Fire;

