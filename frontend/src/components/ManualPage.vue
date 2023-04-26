<template>
    <q-table :separator="'cell'" row-key="id" :rows="rows" :columns="columns" selection="multiple"
        v-model:selected="selected"
        @row-click="(evt, row, index) => { addRow = false; dialog = true; CurrentIndex = index; cloneCurrentRow = Object.assign({}, this.rows[this.CurrentIndex]);const mas =  cloneCurrentRow.status.match(/\d+/g).join(' ').split(' ').map(Number); this.cloneCurrentRow.days = mas[0];this.cloneCurrentRow.keeping = mas[1];this.cloneCurrentRow.monthly = mas[2];this.cloneCurrentRow.month = mas[3]; }">
        <template v-slot:top>
            <div class="row justify-between col">
                <div class="q-table__title">{{ this.title }}</div>
                <div>
                    <q-btn class="q-mr-md" label="Добавить" color="primary"
                        v-on:click="() => { dialog = true; addRow = true }" />
                    <q-btn label="Удалить" color="primary" v-on:click="deleteRows" />
                </div>
            </div>
        </template>
    </q-table>
    <q-dialog v-model="dialog" @hide="cancelSave">
        <q-card style="min-width: 450px">
            <q-form v-if="this.name != 'backup'" @submit="saveRow" @reset="cancelSave">
                <q-card-section>
                    <div class="text-h5 text-bold"> {{ !addRow ? 'Изменение строки' : 'Добавление строки' }}</div>
                </q-card-section>
                <q-card-section v-model="cloneCurrentRow">
                    <q-input :rules="[val => val && val.length > 0 || 'Это поле обязательно для заполнения']" filled
                        class="q-mb-md" label="Статус" v-model="cloneCurrentRow.status"></q-input>
                </q-card-section>
                <q-card-actions class="text-primary">
                    <q-btn type="submit" label="Сохранить" />
                    <q-btn type="reset" label="Отмена" />
                </q-card-actions>
            </q-form>
            <q-form v-else @submit="saveRow" @reset="cancelSave">
                <q-card-section>
                    <div class="text-h5 text-bold"> {{ !addRow ? 'Изменение строки' : 'Добавление строки' }}</div>
                </q-card-section>
                <q-card-section v-model="cloneCurrentRow">
                    <div class="row q-mb-md items-center justify-between">
                        <span class="q-mr-md col">Количество в день</span>
                        <q-select v-model="cloneCurrentRow.days" :rules="[ val => val  || 'Это поле обязательно для заполнения']" class="col" filled :options="days"></q-select>
                    </div>
                    <div class="row q-mb-md items-center justify-between">
                        <span class="q-mr-md col">Количество хранимых копий</span>
                        <q-select v-model="cloneCurrentRow.keeping" :rules="[ val => val || 'Это поле обязательно для заполнения']" class="col" filled :options="keeping"></q-select>
                    </div>
                    <div class="row q-mb-md items-center justify-between">
                        <span class="q-mr-md col">Количество ежемесячных копий</span>
                        <q-select v-model="cloneCurrentRow.monthly" :rules="[ val => val || 'Это поле обязательно для заполнения']" class="col" filled :options="monthly"></q-select>
                    </div>
                    <div class="row q-mb-md items-center justify-between">
                        <span class="q-mr-md col">Количество месяцев</span>
                        <q-select v-model="cloneCurrentRow.month" :rules="[ val => val || 'Это поле обязательно для заполнения']" filled :options="month" class="col"></q-select>
                    </div>
                </q-card-section>
                <q-card-actions class="text-primary">
                    <q-btn type="submit" label="Сохранить" />
                    <q-btn type="reset" label="Отмена" />
                </q-card-actions>
            </q-form>
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
            keeping: Array.from(
                { length: 30 },
                (_, index) => index + 1
            ),
            month: Array.from(
                { length: 6 },
                (_, index) => (index+1) * 6
            ),
            days: Array.from(
                { length: 10 },
                (_, index) => index + 1
            ),
            monthly: Array.from(
                { length: 4 },
                (_, index) => index + 1
            ),
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
            if(this.name == 'backup'){
                    this.cloneCurrentRow.status = "Ежедневно " + this.cloneCurrentRow.days +" раз в день, хранение "+ this.cloneCurrentRow.keeping + " последних копий + "+this.cloneCurrentRow.monthly+" ежемесячных копии в течении "+this.cloneCurrentRow.month+" месяцев"
                }
            if (this.addRow) {
                delete this.cloneCurrentRow.id
                console.log(this.cloneCurrentRow.status)
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
            this.cloneCurrentRow = {}
            this.dialog = false
        },
        deleteRows() {
            if (this.selected.length != 0) {
                const axions = []
                this.selected.forEach((item) => {
                    axions.push(axios("http://localhost:7000/manuals/"+this.name+"/" + item.id, {
                        method: "delete",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: this.cloneCurrentRow
                    }))
                })
                axios.all(axions).then(() => { this.pullData() })
                this.selected = []
            }
        },
        cancelSave() {
            this.cloneCurrentRow = {}
            this.dialog = false
        }
    }
}
</script>