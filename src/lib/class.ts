import type User from "./user"

export default class Class {

    id: number
    name: string
    grades: number[]

    private users: User[] = []


    static classList: Class[] = [
        new Class(0, "Imposter Studies", [10, 11, 12]),
        new Class(1, "Task Studies", [8,9]),
        new Class(2,  "Deception 101", [10, 11, 12])
    ]

    constructor(id: number, name: string, grades: number[]) {
        //In reality, Classes will be created by admin
        this.id = id
        this.name = name
        this.grades = grades
    }

    async userHasAccess(userId: number) {
        return this.users.findIndex(x => x.id === userId) !== -1
    }

    static async getByGrade(grade: number) {
        return Class.classList.filter(x => x.grades.includes(grade))
    }
}