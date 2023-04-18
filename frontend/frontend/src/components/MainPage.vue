<template>
  <q-page class="row">
    <div class="q-pa-md col">
      <q-table title="Операционные системы" :rows="rowsOs" :columns="columns" row-key="id">
        <template v-slot:top>
          <q-btn label="Добавить строку" color="primary" @click="dialog = true" />
          <q-dialog v-model="dialog">
            <q-card>
              <q-card-section class="row items-center q-gutter-sm">
                <q-btn no-caps label="Open menu" color="primary">
                  <q-menu>
                    <q-list dense style="min-width: 100px">
                      <q-item clickable v-close-popup="2">
                        <q-item-section>Open...</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup="2">
                        <q-item-section>New</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item clickable>
                        <q-item-section>Preferences</q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" />
                        </q-item-section>

                        <q-menu anchor="top end" self="top start">
                          <q-list>
                            <q-item v-for="n in 3" :key="n" dense clickable>
                              <q-item-section>Submenu Label</q-item-section>
                              <q-item-section side>
                                <q-icon name="keyboard_arrow_right" />
                              </q-item-section>
                              <q-menu anchor="top end" self="top start">
                                <q-list>
                                  <q-item v-for="n in 3" :key="n" dense clickable v-close-popup="2">
                                    <q-item-section>3rd level Label</q-item-section>
                                  </q-item>
                                </q-list>
                              </q-menu>
                            </q-item>
                          </q-list>
                        </q-menu>

                      </q-item>
                      <q-separator />
                      <q-item clickable v-close-popup="2">
                        <q-item-section>Quit</q-item-section>
                      </q-item>
                    </q-list>

                  </q-menu>
                </q-btn>

                <q-btn no-caps label="Close dialog" color="primary" v-close-popup />
              </q-card-section>
            </q-card>
          </q-dialog>
          <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Удалить строку" @click="removeRow" />
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status }}
              <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }" v-model="props.row.status"
                v-slot="scope" buttons>
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="updatedAt" :props="props">
              {{ props.row.updatedAt }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-table title="Память" :rows="rowsMemory" :columns="columns" row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status }}
              <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }" v-model="props.row.status"
                v-slot="scope" buttons>
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="updatedAt" :props="props">
              {{ props.row.updatedAt }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-table title="Диск" :rows="rowsDisk" :columns="columns" row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status }}
              <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }" v-model="props.row.status"
                v-slot="scope" buttons>
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="updatedAt" :props="props">
              {{ props.row.updatedAt }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-table title="Резервное копирование данных" :rows="rowsBackup" :columns="columns" row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status }}
              <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }" v-model="props.row.status"
                v-slot="scope" buttons>
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="updatedAt" :props="props">
              {{ props.row.updatedAt }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-table title="Zabbix" :rows="rowsZabbix" :columns="columns" row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status }}
              <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }" v-model="props.row.status"
                v-slot="scope" buttons>
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="updatedAt" :props="props">
              {{ props.row.updatedAt }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-table title="Нахождение" :rows="rowsLocation" :columns="columns" row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status }}
              <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }" v-model="props.row.status"
                v-slot="scope" buttons>
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="updatedAt" :props="props">
              {{ props.row.updatedAt }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-table title="Резервное копирование физической машины" :rows="rowsPhysical" :columns="columns" row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status }}
              <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }" v-model="props.row.status"
                v-slot="scope" buttons>
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="updatedAt" :props="props">
              {{ props.row.updatedAt }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-table title="Виртуальная машина" :rows="rowsVm" :columns="columns" row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status }}
              <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }" v-model="props.row.status"
                v-slot="scope" buttons>
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="updatedAt" :props="props">
              {{ props.row.updatedAt }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-table title="Нахождение диска" :rows="rowsDiskLocation" :columns="columns" row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status }}
              <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }" v-model="props.row.status"
                v-slot="scope" buttons>
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="updatedAt" :props="props">
              {{ props.row.updatedAt }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-table title="backup_creation_mechanism" :rows="rowsMechanism" :columns="columns" row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status }}
              <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }" v-model="props.row.status"
                v-slot="scope" buttons>
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="updatedAt" :props="props">
              {{ props.row.updatedAt }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<style></style>

<script>
import axios from 'axios'
export default {
  name: 'MainPage',
  data() {
    return {
      columns: [
        { name: 'id', align: 'center', label: 'Номер', field: 'id', sortable: true },
        { name: 'status', align: 'center', label: 'Статус', field: 'status', sortable: true },
        { name: 'createdAt', align: 'center', label: 'Дата создания', field: 'createdAt', sortable: true },
        { name: 'updatedAt', align: 'center', label: 'Дата редактирования', field: 'updatedAt', sortable: true },
      ],
      rowsOs: [],
      rowsMemory: [],
      rowsDisk: [],
      rowsBackup: [],
      rowsZabbix: [],
      rowsLocation: [],
      rowsPhysical: [],
      rowsVm: [],
      rowsDiskLocation: [],
      rowsMechanism: [],
      rowChange: -1,
      dialog: false,
      filter: ''
    }
  },
  async created() {
    axios.all([
      axios('http://localhost:7000/manuals/all_os'),
      axios('http://localhost:7000/manuals/all_memory_type'),
      axios('http://localhost:7000/manuals/all_disk'),
      axios('http://localhost:7000/manuals/all_backup'),
      axios('http://localhost:7000/manuals/all_zabbix_agent'),
      axios('http://localhost:7000/manuals/all_location'),
      axios('http://localhost:7000/manuals/all_backup_physical_machine'),
      axios('http://localhost:7000/manuals/all_vm_status'),
      axios('http://localhost:7000/manuals/all_disk_location'),
      axios('http://localhost:7000/manuals/all_backup_creation_mechanism'),
    ]).then(data => {
      this.rowsOs = data[0].data
      this.rowsMemory = data[1].data
      this.rowsDisk = data[2].data
      this.rowsBackup = data[3].data
      this.rowsZabbix = data[4].data
      this.rowsLocation = data[5].data
      this.rowsPhysical = data[6].data
      this.rowsVm = data[7].data
      this.rowsDiskLocation = data[8].data
      this.rowsMechanism = data[9].data
    })
  },
  watch: {
    rowsOs: {
      handler() {
        if (this.rowChange != -1) {
          const row = Object.assign({}, this.rowsOs[this.rowChange])
          delete row.id
          console.log(JSON.stringify(row))
          axios("http://localhost:7000/manuals/os/" + this.rowsOs[this.rowChange].id, {
            method: "put",
            headers: {
              'Content-Type': 'application/json'
            },
            data: row
          }).then(() => {
            console.log(1)
          })
        }
      },
      deep: true
    }
  },
}
</script>
