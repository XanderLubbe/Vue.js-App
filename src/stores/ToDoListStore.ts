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

            fetch('http://10.103.184.35:9200/data/todo-app/get-todos.json')
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
                        this.itemList[i] = { id: data.Todos[i].id, text: data.Todos[i].text, action: "add", textTreatment: undefined }
                        this.datahubError = ""
                    }
                }).catch(error => {
                    this.datahubError = error
                    this.piniaErrorState = true
                    return 500
                })
        },
        addItem(item: ToDo) {
            this.itemList.push(item)
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
            const index = this.findIndexOfSelectedItem(id)
            this.itemList[index].text = text;
            this.itemList[index].action = "edit"
        },
        addUndoItem(item: ToDo) {
            this.undoList.push(item)
        },
        holdUndoValues(item: ToDo) {
            if (item.action == "add") {
                this.removeItem(item.id)
            } else if (item.action == "edit") {
                // FIXME: ID is not an index!
                this.editItem(item.id, item.text)
            } else if (item.action == "remove") {
                this.addItem(item)
            }
        }
    }
});
