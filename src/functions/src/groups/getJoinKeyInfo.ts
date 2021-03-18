import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import getJoinKeyData from './utils/getJoinKeyData';
interface submitToProblemArgs {
  key: string;
}

if (admin.apps.length === 0) {
  admin.initializeApp();
}

export default functions.https.onCall(
  async ({ key }: submitToProblemArgs, context) => {
    let keyData;
    try {
      keyData = await getJoinKeyData(key);
    } catch (e) {
      return {
        success: false,
        ...e,
      };
    }
    return {
      success: true,
      name: keyData.name,
    };
  }
);
