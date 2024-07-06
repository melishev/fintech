/** Method implements export of local IndexDB database to JSON format */
export async function exportIndexedDBToJson(dbInstance: IDBDatabase) {
  try {
    const exportedData = {}

    const objectStoreNames = Array.from(dbInstance.objectStoreNames)

    for (const storeName of objectStoreNames) {
      const transaction = dbInstance.transaction(storeName, 'readonly')
      const objectStore = transaction.objectStore(storeName)

      const storeData = await readAllDataFromObjectStore(objectStore)

      exportedData[storeName] = storeData
    }

    return JSON.stringify(exportedData, null, 2)
  } catch (error) {
    console.error('Error when exporting the database:', error)
    throw error
  }
}

function readAllDataFromObjectStore(objectStore) {
  return new Promise((resolve, reject) => {
    const data = []
    const request = objectStore.openCursor()

    request.onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        data.push(cursor.value)
        cursor.continue()
      } else {
        resolve(data)
      }
    }

    request.onerror = (event) => {
      reject('Ошибка при чтении из хранилища объектов: ' + event.target.error)
    }
  })
}
