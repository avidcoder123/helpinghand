import Class from "./class"

export default class User {

    id: number
    email: string
    name: string

    private classes: Class[] = []
    private grade: number = 6
    
    async getClasses(){
        return this.classes
    }
    
    async addClass(classId: number) {
        let c = Class.classList.find(x => x.id = classId)
        if (c) {
            this.classes.push(c)
        } else {
            throw "Invalid class."
        }
    }

    constructor() {
        this.id = 1
        this.email = "ummo2564@student.harmonytx.org"
        this.name = "Umar Mohammad"
    }

    private static usersList: User[] = []

    public static currentUser?: User

    async enrollClass(classId: number) {
        this.classes = []
        let _class = Class.classList.find(x => x.id == classId)
        if (_class) {
            this.classes.push(
                _class
            )
        } else {
            throw "Class does not exist."
        }
    }

    async setGrade(level: number) {
        this.grade = level
    }

    static async register() {
        //Replaced with Supabase google login stuff
        const email = "ummo2564@student.harmonytx.org"
        const name = "Umar Mohammad"
        const userId = User.usersList.findIndex(x => x.email === email)
        if(email.split("@")[1] !== "student.harmonytx.org") {
            throw "Email address must belong to a Harmony Student. Try again with your school email."
        } else if(userId !== -1) {
            throw "That user already exists. Try logging in instead."
        } else {
            const newUser = new User()
            User.usersList.push(newUser)
            User.currentUser = newUser

            return newUser
        }
    }

    static async login() {
        //Replaced with Supabase google stuff
        const email = "ummo2564@student.harmonytx.org"
        const name = "Umar Mohammad"
        const userId = User.usersList.findIndex(x => x.email === email)
        if(userId !== -1) {
            User.currentUser = User.usersList[userId]
            return User.usersList[userId]
        } else {
            throw "An account with that email does not exist. Try registering instead."
        }

    }

    static async logout() {
        //Do Supabase logout here
        User.currentUser = undefined
    }
}