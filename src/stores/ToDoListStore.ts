import { defineStore } from 'pinia';
import type { ToDo } from "../ToDoType"

export const useToDoListStore = defineStore("ToDoListStore", {

    state: () => ({
        itemList: [] as ToDo[],
        datahubError: "",
        piniaErrorState: false,
        piniaDisplayValue: false

    }),

    actions: {
        fetchData() {
            console.log("Entered fetchData action?")
            fetch('http://10.103.184.171:9200/data/todo-app/get-todos.json')
                .then((response) =>
                    response.json(),
                )
                .then((data) => {
                    if (data.resultCode == "500") {
                        console.log(data.resultCode)
                        this.datahubError = data.message
                        this.piniaErrorState = true
                        return data.resultCode
                    }
                    for (let i = 0; i < data.Todos.length; i++) {
                        this.piniaErrorState = false
                        this.itemList[i] = { id: data.Todos[i].id, text: data.Todos[i].text }
                        this.datahubError = ""
                    }


                })
        },
        addItem(id: number, text: string) {
            this.itemList.push({ id, text })
        },
        removeItem(id: number) {
            const i = this.itemList.findIndex((item) => {
                return item.id == id
            })

            if (i > -1) this.itemList.splice(i, 1)
        },
        findIndexOfSelectedItem(id: number) {
            const i = this.itemList.findIndex((item) => {
                return item.id == id
            })
        },
        selectedItem(id: number) {
            return 0
        },
        editItem(id: number, text: string) {
            this.itemList[id].text = text;
        }
    }
});
