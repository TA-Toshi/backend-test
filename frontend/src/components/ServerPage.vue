<template>
    <q-page class="row">
        <div class="q-pa-md col">
            <q-table :separator="'cell'" title="Сервера" row-key="id" :rows="rows" :columns="columns" selection="multiple"
                v-model:selected="selected"
                @row-click="(evt, row, index) => { addRow = false; dialog = true; CurrentIndex = index; cloneCurrentRow = Object.assign({}, this.rows[this.CurrentIndex]); }">
                <template v-slot:top>
                    <div class="row justify-between col">
                        <div class="q-table__title">Сервера</div>
                        <div>
                            <q-btn class="q-mr-md" label="Добавить строку" color="primary"
                                v-on:click="() => { dialog = true; addRow = true }" />
                            <q-btn label="Удалить строку" color="primary" v-on:click="deleteRows" />
                        </div>
                    </div>
                </template>
            </q-table>
            <q-dialog v-model="dialog">
                <q-card class="col" style="max-width: 650px">
                    <q-card-section>
                        <div class="text-h5 text-bold">{{ !addRow ? 'Изменение строки' : 'Добавление строки' }}</div>
                    </q-card-section>
                    <q-card-section v-model="cloneCurrentRow">
                        <q-list>
                            <q-input filled class="q-mb-md" label="Название сервера" v-model="cloneCurrentRow.server_name"></q-input>
                            <q-input filled class="q-mb-md" label="Нахождение" v-model="cloneCurrentRow.appointment"></q-input>
                            <q-select class="q-mb-md" outlined v-model="cloneCurrentRow.backup" :options="backup" label="Бэкап" />
                            <q-select class="q-mb-md" outlined v-model="cloneCurrentRow.os" :options="os" label="Операционная система" />
                            <q-input filled class="q-mb-md" label="Cpu" v-model="cloneCurrentRow.cpu"></q-input>
                            <q-input type="number" filled class="q-mb-md" label="Ядер" v-model="cloneCurrentRow.cores"></q-input>
                            <q-input type="number" filled class="q-mb-md" label="Потоков" v-model="cloneCurrentRow.streams"></q-input>
                            <q-select class="q-mb-md" outlined v-model="cloneCurrentRow.memory_type" :options="memory"
                                label="Тип памяти" />
                            <q-select class="q-mb-md" outlined v-model="cloneCurrentRow.zabbix_agent" :options="zabbix" label="Zabbix" />
                            <q-select class="q-mb-md" outlined v-model="cloneCurrentRow.location" :options="location"
                                label="Нахождение" />
                            <q-input filled class="q-mb-md" label="Ip" v-model="cloneCurrentRow.ip"></q-input>
                            <q-select class="q-mb-md" outlined v-model="cloneCurrentRow.disk" :options="disk" label="Диск" />
                            <q-select class="q-mb-md" outlined v-model="cloneCurrentRow.backup_physical_machine"
                                :options="backupPhysical" label="Резервное копирование физ" />
                            <q-input filled class="q-mb-md" label="Vlan" v-model="cloneCurrentRow.vlan"></q-input>
                            <q-input filled class="q-mb-md" label="Port" v-model="cloneCurrentRow.port"></q-input>
                            <q-input filled label="Комментарий" v-model="cloneCurrentRow.comment"></q-input>
                        </q-list>
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
                { name: 'backup', align: 'center', label: 'Резервное копирование данных', field: 'backup', sortable: true },
                { name: 'os', align: 'center', label: 'Операционная система ', field: 'os', sortable: true },
                { name: 'cpu', align: 'center', label: 'CPU', field: 'cpu', sortable: true },
                { name: 'cores', align: 'center', label: 'Ядер', field: 'cores', sortable: true },
                { name: 'streams', align: 'center', label: 'Потоков', field: 'streams', sortable: true },
                { name: 'memory_type', align: 'center', label: 'Тип памяти ', field: 'memory_type', sortable: true },
                { name: 'zabbix_agent', align: 'center', label: 'Zabbix Agent ', field: 'zabbix_agent', sortable: true },
                { name: 'location', align: 'center', label: 'Нахождение', field: 'location', sortable: true },
                { name: 'ip', align: 'center', label: 'IP', field: 'ip', sortable: true },
                { name: 'disk', align: 'center', label: 'Диски', field: 'disk', sortable: true },
                { name: 'backup_physical_machine', align: 'center', label: 'Резервное копирование физической машины ', field: 'backup_physical_machine', sortable: true },
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
            memory: [],
            zabbix: [],
            location: [],
            disk: [],
            backupPhysical: [],
            vm: []
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
                console.log(this.rows)
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
                axios('http://localhost:7000/manuals/all_vm_status'),
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
                data[7].data.forEach((item) => {
                    this.vm.push({ id: item.id, label: item.status })
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
            this.cloneCurrentRow = {}
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