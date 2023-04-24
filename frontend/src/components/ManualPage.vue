<template>
    <q-table :separator="'cell'" row-key="id" :rows="rows" :columns="columns" selection="multiple" v-model:selected="selected"
        @row-click="(evt, row, index) => { addRow = false; dialog = true; CurrentIndex = index; cloneCurrentRow = Object.assign({}, this.rows[this.CurrentIndex]); }">
        <template v-slot:top>
            <div class="row justify-between col">
                <div class="q-table__title">{{ this.title }}</div>
                <div>
                    <q-btn class="q-mr-md" label="Добавить строку" color="primary" v-on:click="() => { dialog = true; addRow = true }" />
                    <q-btn label="Удалить строку" color="primary" v-on:click="deleteRows" />
                </div>
            </div>
        </template>
    </q-table>
    <q-dialog v-model="dialog">
        <q-card style="min-width: 450px">
            <q-card-section>
                <div class="text-h5 text-bold"> {{ !addRow?'Изменение строки':'Добавление строки' }}</div>
            </q-card-section>
            <q-card-section v-model="cloneCurrentRow">
                <q-input filled class="q-mb-md" label="Статус" v-model="cloneCurrentRow.status"></q-input>
            </q-card-section>
            <q-card-actions class="text-primary">
                <q-btn flat label="Сохранить" v-close-popup v-on:click="saveRow" />
                <q-btn flat label="Отмена" v-close-popup v-on:click="cancelSave" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
  
<style></style>
  
<script>
import axios from 'axios'
export default {
    name: 'MainPage',
    props: {
        name: String,
        title: String
    },
    data() {
        return {
            columns: [
                { name: 'id', align: 'center', label: 'Номер', field: 'id', sortable: true },
                { name: 'status', align: 'center', label: 'Статус', field: 'status', sortable: true },
                { name: 'createdAt', align: 'center', label: 'Дата создания', field: 'createdAt', sortable: true },
                { name: 'updatedAt', align: 'center', label: 'Дата редактирования', field: 'updatedAt', sortable: true },
            ],
            rows: [],
            selected: [],
            CurrentIndex: -1,
            cloneCurrentRow: {},
            dialog: false,
            addRow: false,
            model: null,
        }
    },
    async created() {
        this.pullData()
    },
    methods: {
        pullData() {
            axios('http://localhost:7000/manuals/all_' + this.name).then(data => this.rows = data.data)
        },
        saveRow() {
            if (this.addRow) {
                delete this.cloneCurrentRow.id
                axios("http://localhost:7000/manuals/create_" + this.name, {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: this.cloneCurrentRow
                }).then(() => {
                    console.log("Строка добавлена")
                    this.pullData()
                })
                this.addRow = false
            }
            else {
                this.rows[this.CurrentIndex] = Object.assign({}, this.cloneCurrentRow)
                delete this.cloneCurrentRow.id
                axios("http://localhost:7000/manuals/" + this.name + "/" + this.rows[this.CurrentIndex].id, {
                    method: "put",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: this.cloneCurrentRow
                }).then(() => {
                    console.log("Данные обновлены")
                })
            }
            this.cloneCurrentRow={}
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
                axios.all(axions).then(() => { this.pullData() })
            }
        },
        cancelSave() {
            this.cloneCurrentRow = {}
        }
    }
}
</script>