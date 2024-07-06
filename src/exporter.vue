<script setup lang="ts">
import { useFileSystemAccess } from '@vueuse/core'
import { exportIndexedDBToJson } from './db/exporter'
import { useDBStore } from './db/index'

const dbStore = useDBStore()
const { instance } = storeToRefs(dbStore)

const { data, open, save, create } = useFileSystemAccess({
  types: [
    {
      description: 'text',
      accept: {
        'text/plain': ['.json'],
      },
    },
  ],
  excludeAcceptAllOption: true,
  dataType: 'Text',
})

function loadBackUP() {
  open()
}

async function updateBackUP() {
  const sourceData = await exportIndexedDBToJson(instance.value)

  data.value = sourceData
  save()
}

async function saveBackUP() {
  const sourceData = await exportIndexedDBToJson(instance.value)

  data.value = sourceData
  await create({ suggestedName: 'fintech.json', startIn: 'documents' })
}
</script>

<template>
  <button @click="loadBackUP()">open</button>
  <button @click="updateBackUP()">update</button>
  <button @click="saveBackUP()">save</button>
</template>
