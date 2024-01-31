import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getFireStoreDatabyUserID = async (userID) => {
    try{
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No document data");
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return;
    }
}
