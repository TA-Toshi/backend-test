<template>
  <q-layout>
    <q-header>
      <q-tabs v-model="tab">
        <q-tab name="manuals" label="Справочники" />
        <q-tab name="server" label="Сервера" />
        <q-tab name="virtual_server" label="Виртуальные сервера" />
      </q-tabs>
    </q-header>
    <q-page-container>
      <q-tab-panels v-model="tab" animated>
          <q-tab-panel class="q-pl-none q-pt-sm" name="manuals">
            <MainPage />
          </q-tab-panel>
          <q-tab-panel class="q-pl-none q-pt-sm" name="server">
            <ServerPage />
          </q-tab-panel>
          <q-tab-panel class="q-pl-none q-pt-sm" name="virtual_server">
            <VirtualServerPage />
          </q-tab-panel>
        </q-tab-panels>
    </q-page-container>
  </q-layout>
</template>

<script>
import MainPage from './components/MainPage.vue'
import ServerPage from './components/ServerPage.vue';
import VirtualServerPage from './components/VirtualServerPage.vue'

export default {
  name: 'LayoutDefault',

  components: {
    MainPage,
    ServerPage,
    VirtualServerPage
  },
  data(){
    return  {
      tab:'manuals'
    }
  }
}
</script>
