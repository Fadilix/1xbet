import { useEffect, useRef, useState } from "react";
import { firestore } from '../firebase/firebase';
import { collection, onSnapshot, updateDoc, doc } from '@firebase/firestore';
import notificationSound from "../sounds/alertNotif.mp3"
import { useNotif } from "../contexts/NotificationContext";

const useFirebase = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const testCollectionRef = collection(firestore, collectionName);
  const audioRef = useRef(new Audio(notificationSound));
  const [isActiveNotif, setIsActiveNotif] = useNotif();
  
  useEffect(() => {
    const unsubscribe = onSnapshot(testCollectionRef, (querySnapshot) => {
      const FirebaseData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if(isActiveNotif){
        if (data.length < FirebaseData.length) {
          audioRef.current.play();
        }
      }

      setData(FirebaseData.reverse());
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAction = async (itemId, action) => {
    try {
      const itemRef = doc(testCollectionRef, itemId);
      const updatedata = {
        etat: action === 'valider' ? "1"
          : action === "accepter" ? "0"
            : action === "echouer" ? "2"
              : action === "refuser" && "4"
      };

      await updateDoc(itemRef, updatedata);
    } catch (error) {
      console.error('Error updating data: ', error);
    }
  };

  return { data, loading, handleAction };
};

export default useFirebase;
