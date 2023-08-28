import { getFirestore, setDoc, arrayUnion, doc } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// add new task
export const addTask = async (columnName, data) => {
    const docRef = doc(db, "tickets", "iWj94AE2jyZAcNMXrW2Z");
    await setDoc(docRef, {
        [columnName]: arrayUnion(data),
        nextId: Number(data["id"]) + 1
    }, { merge: true });
}

// edit task
export const updateTask = async (columnName, data) => {
    const docRef = doc(db, "tickets", "iWj94AE2jyZAcNMXrW2Z");
    const res = await setDoc(docRef, {
        [columnName]: data
    }, { merge: true });
    return res;
}

// delete task
export const deleteTask = async (columnName, data) => {
    const docRef = doc(db, "tickets", "iWj94AE2jyZAcNMXrW2Z");
    const res = await setDoc(docRef, {
        [columnName]: data
    }, { merge: true });
    return res;
}

//move task
export const moveTask = async (sourceColumn, destColumn, sourceData, destData) => {
    const docRef = doc(db, "tickets", "iWj94AE2jyZAcNMXrW2Z");
    const res = await setDoc(docRef, {
        [sourceColumn]: sourceData,
        [destColumn]: destData
    }, { merge: true });
    return res;
}