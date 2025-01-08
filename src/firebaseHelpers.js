import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set, get, child } from 'firebase/database';
import { app } from './firebase';
import { db } from './firebase';

const auth = getAuth(app);

export const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const registerUser = async (email, password, userData) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        await set(ref(db, `patients/${userId}`), userData);
        return userCredential;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const fetchUserData = async (userId) => {
    try {
        const snapshot = await get(child(ref(db), `patients/${userId}`));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            throw new Error("No user data found");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const logOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error(error.message);
    }
};
