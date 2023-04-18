<template>
    <q-page class="row">
        <div class="q-pa-md col">
            <q-table title="Виртуальные сервера" :rows="rows" :columns="columns">
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td key="client" :props="props">
                            {{ props.row.client }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.client" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="service" :props="props">
                            {{ props.row.service }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.service" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="environment" :props="props">
                            {{ props.row.environment }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.environment" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="vm_name" :props="props">
                            {{ props.row.vm_name }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.vm_name" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="backup_id" :props="props">
                            {{ props.row.backup_id }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }" v-model="props.row.backup_id"
                                v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="vm_status_id" :props="props">
                            {{ props.row.vm_status_id }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.vm_status_id" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="os_id" :props="props">
                            {{ props.row.os_id }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.os_id" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="machine_name" :props="props">
                            {{ props.row.machine_name }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.machine_name" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="required_date_vm_shutdown" :props="props">
                            {{ props.row.required_date_vm_shutdown }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.required_date_vm_shutdown" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="automatic_internal_domain_name" :props="props">
                            {{ props.row.automatic_internal_domain_name }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }" v-model="props.row.automatic_internal_domain_name"
                                v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="additional_internal_domain_name" :props="props">
                            {{ props.row.additional_internal_domain_name }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.additional_internal_domain_name" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="domain_names" :props="props">
                            {{ props.row.domain_names }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.domain_names" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="cpu" :props="props">
                            {{ props.row.cpu }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.cpu" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="mb" :props="props">
                            {{ props.row.mb }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.mb" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="ram" :props="props">
                            {{ props.row.ram }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.ram" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="disk_gb" :props="props">
                            {{ props.row.disk_gb }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.disk_gb" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="disk_location_id" :props="props">
                            {{ props.row.disk_location_id }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.disk_location_id" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="zabbix_agent_id" :props="props">
                            {{ props.row.zabbix_agent_id }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.zabbix_agent_id" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="location_id" :props="props">
                            {{ props.row.location_id }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.location_id" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="ip" :props="props">
                            {{ props.row.ip }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.ip" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="vlan" :props="props">
                            {{ props.row.vlan }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.vlan" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="backup_creation_mechanism_id" :props="props">
                            {{ props.row.backup_creation_mechanism_id }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.backup_creation_mechanism_id" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="number_stored_copies_vm" :props="props">
                            {{ props.row.number_stored_copies_vm }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.number_stored_copies_vm" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="maximum_storage_size_gb" :props="props">
                            {{ props.row.maximum_storage_size_gb }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.maximum_storage_size_gb" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="comment" :props="props">
                            {{ props.row.comment }}
                            <q-popup-edit @update:model-value="() => { rowChange = props.rowIndex }"
                                v-model="props.row.comment" v-slot="scope" buttons>
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit>
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
    name: 'VirtualServerPage',
    data() {
        return {
            columns: [
                { name: 'client', align: 'center', label: 'Клиент', field: 'client', sortable: true },
                { name: 'service', align: 'center', label: 'Сервис', field: 'service', sortable: true },
                { name: 'environment', align: 'center', label: 'Окружение', field: 'environment', sortable: true },
                { name: 'vm_name', align: 'center', label: 'Название виртуальной машины', field: 'vm_name', sortable: true },
                { name: 'backup_id', align: 'center', label: 'Резервное копирование виртуальной машины ', field: 'backup_id', sortable: true },
                { name: 'vm_status_id', align: 'center', label: 'Состояние виртауальной машины', field: 'vm_status_id', sortable: true },
                { name: 'os_id', align: 'center', label: 'os_id', field: 'Операционная ситема', sortable: true },
                { name: 'machine_name', align: 'center', label: 'Название машины', field: 'machine_name', sortable: true },
                { name: 'required_date_vm_shutdown', align: 'center', label: 'Требуемая дата отключения виртуальной машины', field: 'required_date_vm_shutdown', sortable: true },
                { name: 'automatic_internal_domain_name', align: 'center', label: 'Автоматическое внутреннее доменное имя', field: 'automatic_internal_domain_name', sortable: true },
                { name: 'additional_internal_domain_name', align: 'center', label: 'Дополнительное внутренее доменное имя', field: 'additional_internal_domain_name', sortable: true },
                { name: 'domain_names', align: 'center', label: 'dДоменные имена', field: 'domain_names', sortable: true },
                { name: 'cpu', align: 'center', label: 'CPU', field: 'cpu', sortable: true },
                { name: 'mb', align: 'center', label: 'Память,мб', field: 'mb', sortable: true },
                { name: 'ram', align: 'center', label: 'RAM', field: 'ram', sortable: true },
                { name: 'disk_gb', align: 'center', label: 'Диск,гб', field: 'disk_gb', sortable: true },
                { name: 'disk_location_id', align: 'center', label: 'Расположение диска', field: 'disk_location_id', sortable: true },
                { name: 'zabbix_agent_id', align: 'center', label: 'Zabbix agent', field: 'zabbix_agent_id', sortable: true },
                { name: 'location_id', align: 'center', label: 'Нахождение', field: 'location_id', sortable: true },
                { name: 'ip', align: 'center', label: 'IP', field: 'ip', sortable: true },
                { name: 'vlan', align: 'center', label: 'VLAN', field: 'vlan', sortable: true },
                { name: 'backup_creation_mechanism_id', align: 'center', label: 'Механизм резервного копирования', field: 'backup_creation_mechanism_id', sortable: true },
                { name: 'number_stored_copies_vm', align: 'center', label: 'Количество хранимых копий виртуальной машины', field: 'number_stored_copies_vm', sortable: true },
                { name: 'maximum_storage_size_gb', align: 'center', label: 'Максимальный размер хранилища резервного копирования', field: 'maximum_storage_size_gb', sortable: true },
                { name: 'comment', align: 'center', label: 'Комментарий', field: 'comment', sortable: true },
            ],
            rows: [],
            rowChange: -1
        }
    },
    async created() {
        axios('http://localhost:7000/virtual-servers').then(data => {
            this.rows = data.data
        })
    },
    watch: {
        rows: {
            handler() {
                if (this.rowChange != -1) {
                    const row = Object.assign({}, this.rows[this.rowChange])
                    delete row.id
                    console.log(this.rows[this.rowChange].id)
                    console.log(JSON.stringify(row))
                    axios("http://localhost:7000/virtual-servers/" + this.rows[this.rowChange].id, {
                        method: "put",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: row
                    }).then(()=>{
                        console.log(1)
                    })
                }
            },
            deep: true
        }
    },
}
</script>