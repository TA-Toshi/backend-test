<template>
  <q-page class="row">
    <div class="q-pa-md col">
      <q-table title="Справочники" :rows="rows"  row-key="id" />
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
        { name: 'os', align: 'center', label: 'os', field: 'os', sortable: true },
        { name: 'memory', align: 'center', label: 'memory', field: 'memory', sortable: true },
        { name: 'disk', align: 'center', label: 'disk', field: 'disk', sortable: true },
        { name: 'backup', align: 'center', label: 'backup', field: 'backup', sortable: true },
        { name: 'zabbix', align: 'center', label: 'zabbix', field: 'zabbix', sortable: true },
        { name: 'location', align: 'center', label: 'location', field: 'location', sortable: true },
        { name: 'backup_physical_machine', align: 'center', label: 'backup_physical_machine', field: 'backup_physical_machine', sortable: true },
        { name: 'vm', align: 'center', label: 'vm', field: 'vm', sortable: true },
        { name: 'disk_location', align: 'center', label: 'disk_location', field: 'disk_location', sortable: true },
        { name: 'backup_creation_mechanism', align: 'center', label: 'backup_creation_mechanism', field: 'backup_creation_mechanism', sortable: true },
      ],
      rows: [],
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
      const rows = [];
      for (let i = 0; i < Math.max(...data.map(el=>el.data.length)); i++) {
        const row = {};
        row.os = data[0]?.data[i]?.status
        row.memory = data[1]?.data[i]?.status
        row.disk = data[2]?.data[i]?.status
        row.backup = data[3]?.data[i]?.status
        row.zabbix = data[4]?.data[i]?.status
        row.location = data[5]?.data[i]?.status
        row.backup_physical_machine = data[6]?.data[i]?.status
        row.vm = data[7]?.data[i]?.status
        row.disk_location = data[8]?.data[i]?.status
        row.backup_creation_mechanism = data[9]?.data[i]?.status

        rows.push(row)
      }
      this.rows = rows
    })
  }
}
</script>
