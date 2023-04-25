<template>
  <q-page class="row">
    <q-splitter v-model="splitterModel" style="width:100%;height: 100%;">
      <template v-slot:before>
        <q-tabs v-model="tab" w="10" vertical  >
          <q-tab style="min-height: 40px;" name="os" icon="laptop" label="Операционные системы" />
          <q-tab style="min-height: 40px;" name="memory" icon="memory" label="Память" />
          <q-tab style="min-height: 40px;" name="backup" icon="content_copy" label="Резервное копирование данных" />
          <q-tab style="min-height: 40px;" name="zabbix" icon="support_agent" label="Zabbix" />
          <q-tab style="min-height: 40px;" name="backupPhysical" icon="file_copy" label="Резервное копирование физической машины" />
          <q-tab style="min-height: 40px;" name="vm" icon="pets" label="Виртуальная машина" />
          <q-tab style="min-height: 40px;" name="disk_location" icon="gps_not_fixed" label="Нахождение диска" />
          <q-tab style="min-height: 40px;" name="backup_creation_mechanism" icon="set_meal" label="Механизм создания резервной копии" />
          <q-tab style="min-height: 40px;" name="location" icon="place" label="Нахождение" />
          <q-tab style="min-height: 40px;" name="disk" icon="album" label="Диск" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="os">
            <manual-page :title="'\nОперационные\nсистемы'" :name="'os'" />
          </q-tab-panel>
          <q-tab-panel name="memory">
            <manual-page :title="'Память'" :name="'memory_type'" />
          </q-tab-panel>
          <q-tab-panel name="backup">
            <manual-page :title="'Резервное копирование данных'" :name="'backup'" />
          </q-tab-panel>
          <q-tab-panel name="zabbix">
            <manual-page :title="'Zabbix'" :name="'zabbix_agent'" />
          </q-tab-panel>
          <q-tab-panel name="backupPhysical">
            <manual-page :title="'Резервное копирование физической машины'" :name="'backup_physical_machine'" />
          </q-tab-panel>
          <q-tab-panel name="vm">
            <manual-page :title="'Виртуальная машина'" :name="'vm_status'" />
          </q-tab-panel>
          <q-tab-panel name="disk_location">
            <manual-page :title="'Нахождение диска'" :name="'disk_location'" />
          </q-tab-panel>
          <q-tab-panel name="backup_creation_mechanism">
            <manual-page :title="'Механизм создания резервной копии'" :name="'backup_creation_mechanism'" />
          </q-tab-panel>
          <q-tab-panel name="location">
            <manual-page :title="'Нахождение'" :name="'location'" />
          </q-tab-panel>
          <q-tab-panel name="disk">
            <manual-page :title="'Диск'" :name="'disk'" />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>

<style>
.q-tab__label {
  white-space: pre-wrap;
}
</style>

<script>
import ManualPage from './ManualPage.vue'
export default {
  name: 'MainPage',
  components: {
    ManualPage
  },
  data() {
    return {
      tab: 'os',
      splitterModel:25
    }
  },
}
</script>
