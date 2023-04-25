<template>
    <q-page class="row">
        <div class="q-pa-md col">
            <q-table :separator="'cell'" title="Виртуальные сервера" row-key="id" :rows="rows" :columns="columns"
                selection="multiple" v-model:selected="selected"
                @row-click="(evt, row, index) => { addRow = false; dialog = true; CurrentIndex = index; cloneCurrentRow = Object.assign({}, this.rows[this.CurrentIndex]); }">
                <template v-slot:top>
                    <div class="row justify-between col">
                        <div class="q-table__title">Виртуальные сервера</div>
                        <div>
                            <q-btn class="q-mr-md" label="Добавить" color="primary"
                                v-on:click="() => { dialog = true; addRow = true }" />
                            <q-btn label="Удалить" color="primary" v-on:click="deleteRows" />
                        </div>
                    </div>
                </template>
            </q-table>
            <q-dialog v-model="dialog" @hide="cancelSave">
                <q-card class="col" style="max-width: 650px">
                    <q-form @submit="saveRow" @reset="cancelSave">
                        <q-card-section class="row">
                            <div class="text-h5 text-bold col">{{ !addRow ? 'Изменение строки' : 'Добавление строки' }}
                            </div>
                            <div class="col">
                                <div class="row">
                                    <q-btn color="primary" class="col q-mr-md" label="Сохранить" type="submit" />
                                    <q-btn color="primary" class="col" label="Отмена" type="reset" />
                                </div>
                            </div>
                        </q-card-section>
                        <q-card-section v-model="cloneCurrentRow">
                            <q-input filled class="q-mb-md" label="Клиент*" v-model="cloneCurrentRow.client"
                                :rules="[val => val && val.length > 0 || 'Это поле обязательно для заполнения']"></q-input>
                            <q-input filled class="q-mb-md" :rules="[val2 => val2 && val2.length > 0 || 'Это поле обязательно для заполнения']" label="Сервис*" v-model="cloneCurrentRow.service"></q-input>
                            <q-input filled class="q-mb-md" :rules="[val3 => val3 && val3.length > 0 || 'Это поле обязательно для заполнения']" label="Окружение*"
                                v-model="cloneCurrentRow.environment"></q-input>
                            <div class="row">
                                <q-select class="q-mb-md col q-mr-md" outlined v-model="cloneCurrentRow.backup"
                                    :options="backup" label="Бэкап" />
                                <q-select class="q-mb-md col" outlined v-model="cloneCurrentRow.os" :options="os"
                                    label="Операционная система" />
                            </div>
                            <div class="row">
                                <q-select class="q-mb-md col q-mr-md" outlined v-model="cloneCurrentRow.vm_status"
                                    :options="vm" label="Статус виртуальной машины" />
                                <q-select class="q-mb-md col" outlined v-model="cloneCurrentRow.zabbix_agent"
                                    :options="zabbix" label="Zabbix" />
                            </div>
                            <div class="row">
                                <q-input filled type="number" class="q-mb-md col q-mr-md" label="Cpu"
                                    v-model="cloneCurrentRow.cpu"></q-input>
                                <q-input filled type="number" class="q-mb-md col" label="Оперативная память"
                                    v-model="cloneCurrentRow.ram"></q-input>
                            </div>
                            <div class="row">
                                <q-input filled type="number" class="q-mb-md col q-mr-md" label="Память,мб"
                                    v-model="cloneCurrentRow.mb"></q-input>
                                <q-input filled type="number" class="q-mb-md col" label="Диск,гб"
                                    v-model="cloneCurrentRow.disk_gb"></q-input>
                            </div>
                            <div class="row">
                                <q-select class="q-mb-md col q-mr-md" outlined v-model="cloneCurrentRow.location"
                                    :options="location" label="Нахождение" />
                                <q-select class="q-mb-md col" outlined v-model="cloneCurrentRow.disk_location"
                                    :options="disk" label="Нахождение диска" />
                            </div>
                            <q-input filled class="q-mb-md" label="Ip" mask="###.###.###.###"
                                v-model="cloneCurrentRow.ip"></q-input>
                            <div class="row">
                                <q-input filled class="q-mb-md col q-mr-md" label="Vlan" mask="###.###.###.###/##"
                                    v-model="cloneCurrentRow.vlan"></q-input>
                                <q-input type="number" filled class="q-mb-md col" label="Port"
                                    v-model="cloneCurrentRow.port"></q-input>
                            </div>
                            <q-input filled class="q-mb-md" label="Требуемая дата отключения"
                                v-model="cloneCurrentRow.required_date_vm_shutdown"></q-input>
                            <div class="row">
                                <q-select class="q-mb-md col q-mr-md" outlined
                                    v-model="cloneCurrentRow.backup_physical_machine" :options="backupPhysical"
                                    label="Резервное копирование физ" />
                                <q-select class="q-mb-md col" outlined v-model="cloneCurrentRow.backup_creation_mechanism"
                                    :options="mech" label="Механизм резервного копирования" />
                            </div>
                            <q-input filled class="q-mb-md" label="Доменное имя"
                                v-model="cloneCurrentRow.domain_names"></q-input>
                            <div class="row">
                                <q-input filled class="q-mb-md col q-mr-md" label="Автоматическое внутренее доменное имя"
                                    v-model="cloneCurrentRow.automatic_internal_domain_name"></q-input>
                                <q-input filled class="q-mb-md col" label="Дополнительное внутренее доменное имя"
                                    v-model="cloneCurrentRow.additional_internal_domain_name"></q-input>
                            </div>
                            <q-input filled type="textarea" class="q-mb-md" label="Комментарий"
                                v-model="cloneCurrentRow.comment"></q-input>
                        </q-card-section>
                    </q-form>
                </q-card>
            </q-dialog>
        </div>
    </q-page>
</template>
  
<style></style>
  
<script>
import axios from 'axios'
export default {
    name: 'VirtualServerPage',
    data() {
        return {
            columns: [
                { name: 'client', align: 'center', label: 'Клиент', field: 'client', sortable: true },
                { name: 'service', align: 'center', label: 'Сервис', field: 'service', sortable: true },
                { name: 'environment', align: 'center', label: 'Окружение', field: 'environment', sortable: true },
                { name: 'vm_name', align: 'center', label: 'Название виртуальной машины', field: 'vm_name', sortable: true },
                { name: 'backup', align: 'center', label: 'Резервное копирование виртуальной машины ', field: 'backup', sortable: true },
                { name: 'vm_status', align: 'center', label: 'Состояние виртауальной машины', field: 'vm_status', sortable: true },
                { name: 'os', align: 'center', label: 'Операционная система', field: 'os', sortable: true },
                { name: 'machine_name', align: 'center', label: 'Название машины', field: 'machine_name', sortable: true },
                { name: 'required_date_vm_shutdown', align: 'center', label: 'Требуемая дата отключения виртуальной машины', field: 'required_date_vm_shutdown', sortable: true },
                { name: 'automatic_internal_domain_name', align: 'center', label: 'Автоматическое внутреннее доменное имя', field: 'automatic_internal_domain_name', sortable: true },
                { name: 'additional_internal_domain_name', align: 'center', label: 'Дополнительное внутренее доменное имя', field: 'additional_internal_domain_name', sortable: true },
                { name: 'domain_names', align: 'center', label: 'Доменные имена', field: 'domain_names', sortable: true },
                { name: 'cpu', align: 'center', label: 'CPU', field: 'cpu', sortable: true },
                { name: 'mb', align: 'center', label: 'Память,мб', field: 'mb', sortable: true },
                { name: 'ram', align: 'center', label: 'RAM', field: 'ram', sortable: true },
                { name: 'disk_gb', align: 'center', label: 'Диск,гб', field: 'disk_gb', sortable: true },
                { name: 'disk_location', align: 'center', label: 'Расположение диска', field: 'disk_location', sortable: true },
                { name: 'zabbix_agent', align: 'center', label: 'Zabbix agent', field: 'zabbix_agent', sortable: true },
                { name: 'location', align: 'center', label: 'Нахождение', field: 'location', sortable: true },
                { name: 'ip', align: 'center', label: 'IP', field: 'ip', sortable: true },
                { name: 'vlan', align: 'center', label: 'VLAN', field: 'vlan', sortable: true },
                { name: 'backup_creation_mechanism', align: 'center', label: 'Механизм резервного копирования', field: 'backup_creation_mechanism', sortable: true },
                { name: 'number_stored_copies_vm', align: 'center', label: 'Количество хранимых копий виртуальной машины', field: 'number_stored_copies_vm', sortable: true },
                { name: 'maximum_storage_size_gb', align: 'center', label: 'Максимальный размер хранилища резервного копирования', field: 'maximum_storage_size_gb', sortable: true },
                { name: 'comment', align: 'center', label: 'Комментарий', field: 'comment', sortable: true },
            ],
            rows: [],
            selected: [],
            CurrentIndex: -1,
            cloneCurrentRow: {},
            dialog: false,
            addRow: false,
            backup: [],
            os: [],
            memory: [],
            zabbix: [],
            location: [],
            disk: [],
            backupPhysical: [],
            vm: [],
            mech: []
        }
    },
    async created() {
        this.pullServers()
        this.pullManuals()
    },
    methods: {
        pullServers() {
            axios('http://localhost:7000/virtual-servers').then(data => {
                this.rows = data.data
            })
        },
        pullManuals() {
            axios.all([
                axios('http://localhost:7000/manuals/all_backup'),
                axios('http://localhost:7000/manuals/all_os'),
                axios('http://localhost:7000/manuals/all_memory_type'),
                axios('http://localhost:7000/manuals/all_zabbix_agent'),
                axios('http://localhost:7000/manuals/all_location'),
                axios('http://localhost:7000/manuals/all_disk_location'),
                axios('http://localhost:7000/manuals/all_backup_physical_machine'),
                axios('http://localhost:7000/manuals/all_vm_status'),
                axios('http://localhost:7000/manuals/all_backup_creation_mechanism'),
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
                }),
                    data[7].data.forEach((item) => {
                        this.vm.push({ id: item.id, label: item.status })
                    })
                data[8].data.forEach((item) => {
                    this.mech.push({ id: item.id, label: item.status })
                })
            })
        },
        saveRow() {
            this.cloneCurrentRow.backup_id = this.cloneCurrentRow.backup?.id ? this.cloneCurrentRow.backup.id : this.cloneCurrentRow.backup_id
            this.cloneCurrentRow.os_id = this.cloneCurrentRow.os?.id ? this.cloneCurrentRow.os.id : this.cloneCurrentRow.os_id
            this.cloneCurrentRow.zabbix_agent_id = this.cloneCurrentRow.zabbix_agent?.id ? this.cloneCurrentRow.zabbix_agent.id : this.cloneCurrentRow.zabbix_agent_id
            this.cloneCurrentRow.location_id = this.cloneCurrentRow.location?.id ? this.cloneCurrentRow.location.id : this.cloneCurrentRow.location_id
            this.cloneCurrentRow.disk_location_id = this.cloneCurrentRow.disk_location?.id ? this.cloneCurrentRow.disk_location.id : this.cloneCurrentRow.disk_id
            this.cloneCurrentRow.vm_status_id = this.cloneCurrentRow.vm_status?.id ? this.cloneCurrentRow.vm_status.id : this.cloneCurrentRow.vm_status_id
            this.cloneCurrentRow.backup_physical_machine_id = this.cloneCurrentRow.backup_physical_machine?.id ? this.cloneCurrentRow.backup_physical_machine.id : this.cloneCurrentRow.backup_physical_machine_id
            this.cloneCurrentRow.backup_creation_mechanism_id = this.cloneCurrentRow.backup_creation_mechanism?.id ? this.cloneCurrentRow.backup_creation_mechanism.id : this.cloneCurrentRow.backup_creation_mechanism_id

            if (this.addRow) {
                delete this.cloneCurrentRow.id
                axios("http://localhost:7000/virtual-servers", {
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
                axios("http://localhost:7000/virtual-servers/" + this.rows[this.CurrentIndex].id, {
                    method: "put",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: this.cloneCurrentRow
                }).then(() => {
                    console.log("Данные обновлены")
                    this.pullServers()
                })
            }
            this.cloneCurrentRow = {}
            this.dialog = false
        },
        deleteRows() {
            if (this.selected.length != 0) {
                const axions = []
                this.selected.forEach((item) => {
                    axions.push(axios("http://localhost:7000/virtual-servers/" + item.id, {
                        method: "delete",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: this.cloneCurrentRow
                    }))
                })
                axios.all(axions).then(() => { this.pullServers() })
                this.selected = []
            }
        },
        cancelSave() {
            this.cloneCurrentRow = {}
            this.dialog = false
        }
    },
}
</script>