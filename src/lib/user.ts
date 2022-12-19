export default class User {

    email: string
    name: string

    constructor() {
        this.email = "ummo2564@student.harmonytx.org"
        this.name = "Umar Mohammad"
    }

    private static usersList: User[] = []

    public static currentUser?: User

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
        }
    }

    static async login() {
        //Replaced with Supabase google stuff
        const email = "ummo2564@student.harmonytx.org"
        const name = "Umar Mohammad"
        const userId = User.usersList.findIndex(x => x.email === email)
        if(userId !== -1) {
            User.currentUser = User.usersList[userId]
        } else {
            throw "An account with that email does not exist. Try registering instead."
        }

    }

    static async logout() {
        //Do Supabase logout here
        User.currentUser = undefined
    }
}