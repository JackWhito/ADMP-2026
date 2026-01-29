import Realm from "realm";
import { AuthUser } from "./schemas/AuthUser";

let realmInstance = null;

export const getRealm = async () => {
  if (!realmInstance) {
    realmInstance = await Realm.open({
      schema: [AuthUser],
      schemaVersion: 1
    });
  }
  return realmInstance;
};
