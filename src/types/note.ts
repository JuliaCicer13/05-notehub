export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shooping";

export interface Note {
     title: string;
     id: number,
     content: string,
     createdAt: number,
     updatedAt: number,
     tag: NoteTag,
}