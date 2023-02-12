import { defineStore } from 'pinia';
import type { ToDo } from "../ToDoType"

export const useToDoListStore = defineStore("ToDoListStore", {

    state: () => ({
        itemList: [] as ToDo[],
        datahubError: "",
        piniaErrorState: false,
        piniaDisplayValue: false,
        undoList: [] as ToDo[],
    }),
    actions: {
        fetchData() {
            console.log("fetching things")

            fetch('http://192.168.68.113:9200/data/todo-app/get-todos.json')
                .then((response) =>
                    response.json(),
                )
                .then((data) => {

                    if (data.resultCode > 299) {
                        this.datahubError = data.message
                        this.piniaErrorState = true
                        return data.resultCode
                    }

                    for (let i = 0; i < data.Todos.length; i++) {
                        this.piniaErrorState = false
                        this.itemList[i] = { id: data.Todos[i].id, text: data.Todos[i].text, action: "add" }
                        this.datahubError = ""
                    }
                }).catch(error => {
                    this.datahubError = error
                    this.piniaErrorState = true
                    return 500
                })
        },
        addItem(id: number, text: string) {
            this.itemList.push({ id, text, action: "add" })
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
            return i
        },
        selectedItem(id: number) {
            return 0
        },
        editItem(id: number, text: string) {
            this.itemList[id].text = text;
            this.itemList[id].action = "edit"
        },
        addUndoItem(id: number, text: string, action: string) {
            this.undoList.push({ id, text, action })
        },
        holdUndoValues(item: ToDo) {
            if (item.action == "add") {
                this.removeItem(item.id)
            } else if (item.action == "edit") {
                this.editItem(item.id, item.text)
            } else {
                this.addItem(item.id, item.text)
            }
        }
    }
});
