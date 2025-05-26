import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function saveUserPreferences(uid, preferences) {
  const ref = doc(db, 'users', uid);
  console.log('✅ Salvataggio preferenze in Firestore:', uid, preferences);
  try {
    await setDoc(ref, {
      preferences: {
        selectedCoin: preferences.selectedCoin
      }
    }, { merge: true });
  } catch (error) {
    console.error('❌ Errore salvataggio Firestore:', error);
  }
}
