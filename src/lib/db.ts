export interface Assignment {
    id?: number,
    created_at: string,
    user_id: string,
    class_id: number,
    name: string
}

export interface Class {
    id?: number,
    name: string,
    grades: number[]
}

export interface Class_User {
    id?: number,
    class_id: number,
    user_id: string
}

export interface Question {
    id?: number,
    number: number,
    is_freeresponse: boolean,
    is_file: boolean,
    text: string,
    answer: string,
    assignment_id: number
}