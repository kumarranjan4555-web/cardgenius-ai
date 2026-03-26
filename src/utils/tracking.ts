import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './errorHandlers';

export const trackAffiliateClick = async (cardId: string, applyUrl: string) => {
  const path = 'affiliateClicks';
  try {
    // Track click in Firestore
    await addDoc(collection(db, path), {
      cardId,
      applyUrl,
      uid: auth.currentUser?.uid || 'anonymous',
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
    });
    
    // In a real app, you would append your affiliate ID to the URL here
    // e.g., const finalUrl = `${applyUrl}?affiliate_id=YOUR_ID&sub_id=${auth.currentUser?.uid}`;
    
  } catch (error) {
    // We don't want to block the user from clicking the link if tracking fails
    console.error("Failed to track affiliate click:", error);
    // handleFirestoreError(error, OperationType.CREATE, path); // Optional: if we want to throw
  }
};
