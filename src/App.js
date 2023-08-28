import { useEffect, useState } from "react";
import Board from "./Board";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
initializeApp(firebaseConfig);
const db = getFirestore();

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // get board data
  const getBoardData = async () => {
    try {
      const docRef = doc(db, "tickets", "iWj94AE2jyZAcNMXrW2Z");
      const res = await getDoc(docRef);
      setData(res.data());
      setLoading(false);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    getBoardData()
  }, [])


  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="overflow-hidden">
        <Navbar />
        <div className="pt-16 xs:mx-4 lg:mx-0 flex justify-center">
          <Board data={data} setData={setData} />
        </div>
      </div>
    );
  }
}

export default App;
