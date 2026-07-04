import { openDB } from 'idb';

const DB_NAME = 'carelink-db';
const DB_VERSION = 4;

const STORES = {
  residents: 'residents',
  notifications: 'notifications',
  activityHistory: 'activityHistory',
  settings: 'settings',
  caregivers: 'caregivers',
  caregiverActivityHistory: 'caregiverActivityHistory',
  welfareSyncEvents: 'welfareSyncEvents',
};

const CURRENT_USER_KEY = 'currentUser';

let dbPromise;

export async function initDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORES.residents)) {
          db.createObjectStore(STORES.residents, { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains(STORES.notifications)) {
          db.createObjectStore(STORES.notifications, { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains(STORES.activityHistory)) {
          db.createObjectStore(STORES.activityHistory, { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains(STORES.settings)) {
          db.createObjectStore(STORES.settings, { keyPath: 'key' });
        }

        if (!db.objectStoreNames.contains(STORES.caregivers)) {
          db.createObjectStore(STORES.caregivers, { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains(STORES.caregiverActivityHistory)) {
          db.createObjectStore(STORES.caregiverActivityHistory, { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains(STORES.welfareSyncEvents)) {
          db.createObjectStore(STORES.welfareSyncEvents, { keyPath: 'eventId' });
        }
      },
    });
  }

  return dbPromise;
}

export async function saveResidents(residents = []) {
  const db = await initDB();
  const tx = db.transaction(STORES.residents, 'readwrite');
  const records = Array.isArray(residents) ? residents : [];

  await tx.store.clear();
  await Promise.all(records.map((resident) => tx.store.put(resident)));
  await tx.done;
}

export async function getResidents() {
  const db = await initDB();
  return db.getAll(STORES.residents);
}

export async function saveNotifications(notifications = []) {
  const db = await initDB();
  const tx = db.transaction(STORES.notifications, 'readwrite');
  const records = Array.isArray(notifications) ? notifications : [];

  await tx.store.clear();
  await Promise.all(records.map((notification) => tx.store.put(notification)));
  await tx.done;
}

export async function getNotifications() {
  const db = await initDB();
  return db.getAll(STORES.notifications);
}

export async function saveActivityHistory(activityHistory = []) {
  const db = await initDB();
  const tx = db.transaction(STORES.activityHistory, 'readwrite');
  const records = Array.isArray(activityHistory) ? activityHistory : [];

  await tx.store.clear();
  await Promise.all(records.map((entry) => tx.store.put(entry)));
  await tx.done;
}

export async function getActivityHistory() {
  const db = await initDB();
  return db.getAll(STORES.activityHistory);
}

export async function saveCurrentUser(user) {
  const db = await initDB();

  await db.put(STORES.settings, {
    key: CURRENT_USER_KEY,
    value: user,
  });
}

export async function getCurrentUser() {
  const db = await initDB();
  const setting = await db.get(STORES.settings, CURRENT_USER_KEY);

  return setting?.value ?? null;
}

export async function saveAlerts(alerts = []) {
  const db = await initDB();
  await db.put(STORES.settings, {
    key: 'alerts',
    value: alerts
  });
}

export async function getAlerts() {
  const db = await initDB();
  const setting = await db.get(STORES.settings, 'alerts');
  return setting?.value ?? [];
}

export async function saveCaregivers(caregivers = []) {
  const db = await initDB();
  const tx = db.transaction(STORES.caregivers, 'readwrite');
  const records = Array.isArray(caregivers) ? caregivers : [];

  await tx.store.clear();
  await Promise.all(records.map((caregiver) => tx.store.put(caregiver)));
  await tx.done;
}

export async function getCaregivers() {
  const db = await initDB();
  return db.getAll(STORES.caregivers);
}

export async function saveCaregiverActivityHistory(history = []) {
  const db = await initDB();
  const tx = db.transaction(STORES.caregiverActivityHistory, 'readwrite');
  const records = Array.isArray(history) ? history : [];

  await tx.store.clear();
  await Promise.all(records.map((entry) => tx.store.put(entry)));
  await tx.done;
}

export async function getCaregiverActivityHistory() {
  const db = await initDB();
  return db.getAll(STORES.caregiverActivityHistory);
}

export async function saveWelfareSyncEvents(events = []) {
  const db = await initDB();
  const tx = db.transaction(STORES.welfareSyncEvents, 'readwrite');
  const records = Array.isArray(events) ? events : [];

  await tx.store.clear();
  await Promise.all(records.map((entry) => tx.store.put(entry)));
  await tx.done;
}

export async function getWelfareSyncEvents() {
  const db = await initDB();
  return db.getAll(STORES.welfareSyncEvents);
}

export async function saveSystemSettings(settings = {}) {
  const db = await initDB();
  await db.put(STORES.settings, {
    key: 'systemSettings',
    value: settings
  });
}

export async function getSystemSettings() {
  const db = await initDB();
  const setting = await db.get(STORES.settings, 'systemSettings');
  return setting?.value ?? {};
}
