import { defineStore } from 'pinia';
import type { ToDo } from "../ToDoType"

export const useToDoListStore = defineStore("ToDoListStore", {

    state: () => ({
        itemList: [] as ToDo[],
        errorr: "",
        piniaErrorState: false
  
    }),

    actions: {
        fetchData() {
            console.log("Entered fetchData action?")
            fetch('http://192.168.68.105:9200/data/todo-app/get-todos.json')
                .then((response) =>
                    response.json(),
                )
                .then((data) => {
                    if(data.resultCode == "500"){
                        console.log(data.resultCode)
                        this.errorr = "System busy please go away."
                        this.piniaErrorState = true
                        return data.resultCode
                    }
                    for (let i = 0; i < data.Todos.length; i++) {
                        this.itemList[i] = { id: data.Todos[i].id, text: data.Todos[i].text }
                        this.errorr = ""
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
            // return this.itemList.fin
            return 0
        },
        editItem(id: number, text: string) {
            this.itemList[id].text = text;
        }
    }
});
