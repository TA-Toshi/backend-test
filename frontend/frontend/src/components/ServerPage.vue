<template>
    <q-page class="row">
        <div class="q-pa-md col">
            <q-table title="Сервера" :rows="rows" :columns="columns" row-key="name" />
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
                { name: 'server_name', align: 'center', label: 'server_name', field: 'server_name', sortable: true },
                { name: 'appointment', align: 'center', label: 'appointment', field: 'appointment', sortable: true },
                { name: 'backup_id', align: 'center', label: 'backup_id', field: 'backup_id', sortable: true },
                { name: 'os_id', align: 'center', label: 'os_id', field: 'os_id', sortable: true },
                { name: 'cpu', align: 'center', label: 'cpu', field: 'cpu', sortable: true },
                { name: 'cores', align: 'center', label: 'cores', field: 'cores', sortable: true },
                { name: 'streams', align: 'center', label: 'streams', field: 'streams', sortable: true },
                { name: 'memory_type_id', align: 'center', label: 'memory_type_id', field: 'memory_type_id', sortable: true },
                { name: 'zabbix_agent_id', align: 'center', label: 'zabbix_agent_id', field: 'zabbix_agent_id', sortable: true },
                { name: 'location_id', align: 'center', label: 'location_id', field: 'location_id', sortable: true },
                { name: 'ip', align: 'center', label: 'ip', field: 'ip', sortable: true },
                { name: 'disk_id', align: 'center', label: 'disk_id', field: 'disk_id', sortable: true },
                { name: 'backup_physical_machine_id', align: 'center', label: 'backup_physical_machine_id', field: 'backup_physical_machine_id', sortable: true },
                { name: 'vlan', align: 'center', label: 'vlan', field: 'vlan', sortable: true },
                { name: 'port', align: 'center', label: 'port', field: 'port', sortable: true },
                { name: 'comment', align: 'center', label: 'comment', field: 'comment', sortable: true },
            ],
            rows: []
        }
    },
    async created() {
        axios('http://localhost:7000/physical-servers').then(data => {
            this.rows = data.data
        })
    }
}
</script>