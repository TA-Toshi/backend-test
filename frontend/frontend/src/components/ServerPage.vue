<template>
    <q-page class="row">
        <div class="q-pa-md col">
            <q-table title="Сервера" row-key="id" :rows="rows" :columns="columns" selection="multiple"
                v-model:selected="selected"
                @row-click="(evt, row, index) => { addRow=false; dialog = true;CurrentIndex = index; cloneCurrentRow = Object.assign({}, this.rows[this.CurrentIndex]);}">
                <template v-slot:top>
                    <div class="row justify-between">
                        <div class="q-table__title">Сервера</div>
                        <div>
                            <q-btn label="Добавить строку" color="primary"
                                v-on:click="() => { dialog = true; addRow = true }" />
                            <q-btn label="Удалить строку" color="primary" v-on:click="deleteRows" />
                        </div>
                    </div>
                </template>
            </q-table>
            <q-dialog v-model="dialog">
                <q-card style="min-width: 450px">
                    <q-card-section>
                        <div class="text-h6">Изменение строки</div>
                    </q-card-section>
                    <q-card-section v-model="cloneCurrentRow">
                        <q-input label="Название сервера" v-model="cloneCurrentRow.server_name"></q-input>
                        <q-input label="Нахождение" v-model="cloneCurrentRow.appointment"></q-input>
                        <q-select outlined v-model="cloneCurrentRow.backup_id" :options="backup" label="Бэкап" />
                        <q-select outlined v-model="cloneCurrentRow.os_id" :options="os" label="Операционная система" />
                        <q-input label="Cpu" v-model="cloneCurrentRow.cpu"></q-input>
                        <q-input label="Ядер" v-model="cloneCurrentRow.cores"></q-input>
                        <q-input label="Потоков" v-model="cloneCurrentRow.streams"></q-input>
                        <q-select outlined v-model="cloneCurrentRow.memory_type_id" :options="memory" label="Тип памяти" />
                        <q-select outlined v-model="cloneCurrentRow.zabbix_agent_id" :options="zabbix" label="Zabbix" />
                        <q-select outlined v-model="cloneCurrentRow.location_id" :options="location" label="Нахождение" />
                        <q-input label="Ip" v-model="cloneCurrentRow.ip"></q-input>
                        <q-select outlined v-model="cloneCurrentRow.disk_id" :options="disk" label="Диск" />
                        <q-select outlined v-model="cloneCurrentRow.backup_physical_machine_id" :options="backupPhysical" label="Резервное копирование физ" />
                        <q-input label="Vlan" v-model="cloneCurrentRow.vlan"></q-input>
                        <q-input label="Port" v-model="cloneCurrentRow.port"></q-input>
                        <q-input label="Комментарий" v-model="cloneCurrentRow.comment"></q-input>
                    </q-card-section>
                    <q-card-actions class="text-primary">
                        <q-btn flat label="Сохранить" v-close-popup v-on:click="saveRow" />
                        <q-btn flat label="Отмена" v-close-popup v-on:click="cancelSave" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </q-page>
</template>
  
<style></style>
  
<script>
import axios from 'axios'
export default {
    name: 'ServerPage',
    data() {
        return {
            columns: [
                { name: 'server_name', align: 'center', label: 'Имя сервера', field: 'server_name', sortable: true },
                { name: 'appointment', align: 'center', label: 'Назначение', field: 'appointment', sortable: true },
                { name: 'backup_id', align: 'center', label: 'Резервное копирование данных', field: 'backup_id', sortable: true },
                { name: 'os_id', align: 'center', label: 'Операционная система ', field: 'os_id', sortable: true },
                { name: 'cpu', align: 'center', label: 'CPU', field: 'cpu', sortable: true },
                { name: 'cores', align: 'center', label: 'Ядер', field: 'cores', sortable: true },
                { name: 'streams', align: 'center', label: 'Потоков', field: 'streams', sortable: true },
                { name: 'memory_type_id', align: 'center', label: 'Тип памяти ', field: 'memory_type_id', sortable: true },
                { name: 'zabbix_agent_id', align: 'center', label: 'Zabbix Agent ', field: 'zabbix_agent_id', sortable: true },
                { name: 'location_id', align: 'center', label: 'Нахождение', field: 'location_id', sortable: true },
                { name: 'ip', align: 'center', label: 'IP', field: 'ip', sortable: true },
                { name: 'disk_id', align: 'center', label: 'Диски', field: 'disk_id', sortable: true },
                { name: 'backup_physical_machine_id', align: 'center', label: 'Резервное копирование физической машины ', field: 'backup_physical_machine_id', sortable: true },
                { name: 'vlan', align: 'center', label: 'VLAN', field: 'vlan', sortable: true },
                { name: 'port', align: 'center', label: 'PORT', field: 'port', sortable: true },
                { name: 'comment', align: 'center', label: 'Комментарий', field: 'comment', sortable: true },
            ],
            rows: [],
            selected: [],
            CurrentIndex: -1,
            cloneCurrentRow: {},
            dialog: false,
            addRow: false,
            model: null,
            backup: [],
            os: [],
            memory:[],
            zabbix:[],
            location:[],
            disk:[],
            backupPhysical:[]
        }
    },
    async created() {
        this.pullServers()
        this.pullManuals()
    },
    methods: {
        pullServers() {
            axios('http://localhost:7000/physical-servers').then(data => {
                this.rows = data.data
                this.rowsClone = data.data.map(object => ({ ...object }))
            })
        },
        pullManuals() {
            axios.all([
                axios('http://localhost:7000/manuals/all_backup'),
                axios('http://localhost:7000/manuals/all_os'),
                axios('http://localhost:7000/manuals/all_memory_type'),
                axios('http://localhost:7000/manuals/all_zabbix_agent'),
                axios('http://localhost:7000/manuals/all_location'),
                axios('http://localhost:7000/manuals/all_disk'),
                axios('http://localhost:7000/manuals/all_backup_physical_machine'),
            ]).then(data => {
                data[0].data.forEach((item) => {
                    this.backup.push({ id: item.id, label: item.status })
                })
                data[1].data.forEach((item) => {
                    this.os.push({ id: item.id, label: item.status })
                })
                data[2].data.forEach((item) => {
                    this.memory.push({ id: item.id, label: item.status })
                })
                data[3].data.forEach((item) => {
                    this.zabbix.push({ id: item.id, label: item.status })
                })
                data[4].data.forEach((item) => {
                    this.location.push({ id: item.id, label: item.status })
                })
                data[5].data.forEach((item) => {
                    this.disk.push({ id: item.id, label: item.status })
                })
                data[6].data.forEach((item) => {
                    this.backupPhysical.push({ id: item.id, label: item.status })
                })
            })
        },
        saveRow() {
            this.cloneCurrentRow.backup_id = this.cloneCurrentRow.backup_id.id ? this.cloneCurrentRow.backup_id.id : this.cloneCurrentRow.backup_id
            this.cloneCurrentRow.os_id = this.cloneCurrentRow.os_id.id ? this.cloneCurrentRow.os_id.id : this.cloneCurrentRow.os_id
            this.cloneCurrentRow.memory_type_id = this.cloneCurrentRow.memory_type_id.id ? this.cloneCurrentRow.memory_type_id.id : this.cloneCurrentRow.memory_type_id
            this.cloneCurrentRow.zabbix_agent_id = this.cloneCurrentRow.zabbix_agent_id.id ? this.cloneCurrentRow.zabbix_agent_id.id : this.cloneCurrentRow.zabbix_agent_id
            this.cloneCurrentRow.location_id = this.cloneCurrentRow.location_id.id ? this.cloneCurrentRow.location_id.id : this.cloneCurrentRow.location_id
            this.cloneCurrentRow.disk_id = this.cloneCurrentRow.disk_id.id ? this.cloneCurrentRow.disk_id.id : this.cloneCurrentRow.disk_id
            this.cloneCurrentRow.backup_physical_machine_id = this.cloneCurrentRow.backup_physical_machine_id.id ? this.cloneCurrentRow.backup_physical_machine_id.id : this.cloneCurrentRow.backup_physical_machine_id
            if (this.addRow) {
                delete this.cloneCurrentRow.id
                axios("http://localhost:7000/physical-servers", {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: this.cloneCurrentRow
                }).then(() => {
                    console.log("Строка добавлена")
                    this.pullServers()
                })
                this.addRow = false
            }
            else {
                this.rows[this.CurrentIndex] = Object.assign({}, this.cloneCurrentRow)
                delete this.cloneCurrentRow.id
                axios("http://localhost:7000/physical-servers/" + this.rows[this.CurrentIndex].id, {
                    method: "put",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: this.cloneCurrentRow
                }).then(() => {
                    console.log("Данные обновлены")
                })
            }
        },
        deleteRows() {
            if (this.selected.length != 0) {
                const axions = []
                this.selected.forEach((item) => {
                    axions.push(axios("http://localhost:7000/physical-servers/" + item.id, {
                        method: "delete",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: this.cloneCurrentRow
                    }))
                })
                axios.all(axions).then(() => { this.pullServers() })
            }
        },
        cancelSave() {
            this.cloneCurrentRow = {}
        }
    },
}
</script>