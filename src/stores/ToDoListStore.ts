import { defineStore } from 'pinia';
import type { ToDo } from "../ToDoType"
import type { UndoObject } from '@/UndoObjectType';

export const useToDoListStore = defineStore("ToDoListStore", {

    state: () => ({
        itemList: [] as ToDo[],
        datahubError: "",
        piniaErrorState: false,
        piniaDisplayValue: false,
        undoObject: {} as UndoObject,
    }),

    actions: {
        fetchData() {
            console.log("Entered fetchData action?")
            fetch('http://192.168.46.75:9200/data/todo-app/get-todos.json')
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
            return i
        },
        selectedItem(id: number) {
            return 0
        },
        editItem(id: number, text: string) {
            this.itemList[id].text = text;
        },
        undoPopulate(id: number, text: string){
            this.undoObject.id = id
            this.undoObject.text = text
            this.undoObject.index = this.findIndexOfSelectedItem(id)
            console.log("Here is the undo object: ",this.undoObject)
        },
        undoAction(){
            // needs to populate an object with the most recent actions, and if called upon undo them
            //needs to hold index, id, and text values
            // each function (edit, add, remove) needs to send their latest 3 values to an object to store and then if undo is hit,
            // add must remove, edit must undo edits, delete must add back at that index.
        }
    }
});
