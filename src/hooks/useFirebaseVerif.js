import { useEffect, useState } from "react";
import { firestore } from '../firebase/firebase';
import { collection, onSnapshot, updateDoc, doc, getDoc } from '@firebase/firestore';
const useFirebaseVerif = (collectionName) => {
    const [verifdata, setVerifData] = useState([]);
    const testCollectionRef = collection(firestore, collectionName);

    useEffect(() => {
        const unsubscribe = onSnapshot(testCollectionRef, (querySnapshot) => {
            const FirebaseData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setVerifData(FirebaseData.reverse());
        });

        return () => {
            unsubscribe();
        };
    }, [])


    const handleVerif = async (docId, updatedFields) => {
        try {
            const docRef = doc(testCollectionRef, docId);

            // Fetch the existing document data
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                // Merge the existing data with the updated fields
                const existingData = docSnapshot.data();
                const newData = { ...existingData, ...updatedFields };

                // Update the document with the merged data
                await updateDoc(docRef, newData);

                console.log('Document successfully updated!');
            } else {
                console.error('Document does not exist.');
            }
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };



    return { verifdata, handleVerif }
};


export default useFirebaseVerif;