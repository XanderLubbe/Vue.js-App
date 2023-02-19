import { Actions, type Undo } from '@/UndoType';
import { defineStore } from 'pinia';
import { ItemState, type ToDo } from "../ToDoType"

export const useToDoListStore = defineStore("ToDoListStore", {

    state: () => ({
        itemList: [] as ToDo[],
        datahubError: "",
        piniaErrorState: false,
        piniaDisplayValue: false,
        undoList: [] as Undo[],
    }),
    actions: {
        fetchData() {

            fetch('http://192.168.68.101:9200/data/todo/todo.json')
                .then((response) =>
                    response.json(),
                )
                .then((data) => {
                    // fix
                    if (data.resultCode == "500") {
                        this.datahubError = data.message
                        this.piniaErrorState = true
                        return data.resultCode
                    }
                    //todo - list is more right
                    for (let i = 0; i < data.Todos.length; i++) {
                        this.piniaErrorState = false
                        this.itemList[i] = { id: data.Todos[i].id, text: data.Todos[i].text, itemState: ItemState.Active, isCompleted: false }
                        this.datahubError = ""
                    }
                }).catch(error => {
                    this.datahubError = error
                    this.piniaErrorState = true
                    return 500
                })
        },

        // CRUD
        addItem(item: ToDo) {
            this.itemList.push(item)
        },
        permanentlyRemoveItem(id: number) {
            const i = this.itemList.findIndex((item) => {
                return item.id == id
            })

            if (i > -1) this.itemList.splice(i, 1)
        },
        editItem(item: ToDo) {
            const index = this.findIndexOfSelectedItem(item.id)
            this.itemList[index].text = item.text
            this.itemList[index].itemState = item.itemState
            this.itemList[index].isCompleted = item.isCompleted
        },
        addUndoItem(item: Undo) {
            this.undoList.push(item)
        },
        determineUndoAction(item: Undo) {
            switch (item.action) {
                case Actions.Add:
                    this.permanentlyRemoveItem(item.ToDo.id);
                    break;
                case Actions.Edit:
                case Actions.Remove:
                    this.editItem(item.ToDo)
                    break;
            }
        },

        // item state modifiers
        setToActiveItem(item: ToDo) {
            this.changeItemState(item, Actions.Add, ItemState.Active)
        },
        setToArchiveItem(item: ToDo) {
            this.changeItemState(item, Actions.Edit, ItemState.Archived)
        },
        setToDeletedItem(item: ToDo) {
            this.changeItemState(item, Actions.Remove, ItemState.Deleted)
        },

        // helper functions
        findIndexOfSelectedItem(id: number) {
            const i = this.itemList.findIndex((item) => {
                return item.id == id
            })
            return i
        },
        changeItemState(item: ToDo, action: Actions, itemState: ItemState) {
            const newUndoItem: Undo = { action, ToDo: { ...item } }
            this.addUndoItem(newUndoItem)
            item.itemState = itemState
        },
        showAll() {
            console.log("Items in your store", this.itemList)
        }
    }
});
