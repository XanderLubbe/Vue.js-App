enum ItemState {
    Active,
    Archived,
    Deleted
}

type ToDo = {
    id: number;
    text: string;
    itemState: ItemState;
    isCompleted: boolean
}
export type {ToDo}
export {ItemState}