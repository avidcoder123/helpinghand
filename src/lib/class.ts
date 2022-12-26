import Assignment from "./assignment"
import User from "./user"
import _ from "lodash"

export default class Class {

    id: number
    name: string
    grades: number[]

    private users: number[] = []

    private assignments: Assignment[] = []


    static classList: Class[] = [
        new Class(0, "Imposter Studies", [10, 11, 12]),
        new Class(1, "Task Studies", [8,9]),
        new Class(2,  "Deception 101", [10, 11, 12])
    ]

    async getAssignments(): Promise<Assignment[][]> {
        let list = this.assignments.sort((a, b) => new Date(a.date_created).getTime() - new Date(b.date_created).getTime())
        let grouped = _.groupBy(list, x => new Date(x.date_created).toDateString())
        return _.sortBy(grouped, (x, y) => y)
    }

    async addAssignment(name: string) {
        this.assignments.push(
            new Assignment()
        )
    }

    constructor(id: number, name: string, grades: number[]) {
        //In reality, Classes will be created by admin
        this.id = id
        this.name = name
        this.grades = grades
    }

    async addUser(userId: number) {
        this.users.push(
            userId
        )
    }

    async userHasAccess(userId: number) {
        return this.users.findIndex(x => x === userId) !== -1
    }

    static async getByGrade(grade: number) {
        return Class.classList.filter(x => x.grades.includes(grade))
    }

    static async getById(classId: number) {
        const c = Class.classList.find(x => x.id === classId)
        if(c) {
            return c
        } else {
            throw "Class with that ID not found."
        }
    }
}