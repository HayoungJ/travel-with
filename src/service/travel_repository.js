import { onValue, ref, set } from 'firebase/database';
import { firebaseDatabase } from './firebase';

class TravelRepository {
  saveTravel(travelId, info) {
    set(ref(firebaseDatabase, 'travels/' + travelId), {
      ...info,
    });
  }

  syncTravel(travelId, onUpdate) {
    const travelRef = ref(firebaseDatabase, `travels/${travelId}`);
    const stopSync = onValue(travelRef, (snapshot) => {
      const data = snapshot.val();
      data && onUpdate(data);
    });

    return () => stopSync;
  }
}

export default TravelRepository;
