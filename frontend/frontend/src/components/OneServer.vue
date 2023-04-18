<template>
    
</template>
  
<style></style>
  
<script>
import axios from 'axios'
export default {
    name: 'OneServer',
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
            rowChange: -1,
            dialog:false
        }
    },
    async created() {
        axios('http://localhost:7000/physical-servers').then(data => {
            this.rows = data.data
            this.rowsClone = data.data.map(object => ({ ...object }))
        })
    },
    watch: {
        rows: {
            handler() {
                if (this.rowChange != -1) {
                    console.log(1)
                    const row = Object.assign({}, this.rows[this.rowChange])
                    delete row.id
                    console.log(this.rows[this.rowChange].id)
                    console.log(JSON.stringify(row))
                    axios("http://localhost:7000/physical-servers/" + this.rows[this.rowChange].id, {
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