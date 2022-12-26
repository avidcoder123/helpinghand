import Class from "./class";
import User from "./user";

export default class Assignment {

    private creator: User
    private ownedClass: Class

    id: number
    name: string
    date_created: string


    //questions: Question[]

    constructor() {
        this.id = 0
        this.name = "Do Now"
        this.creator = User.currentUser!
        this.ownedClass = Class.classList[0]
        this.date_created = new Date().toISOString()
    }


}