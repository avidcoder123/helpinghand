export default class User {

    email: string
    name: string

    constructor() {
        this.email = "ummo2564@student.harmonytx.org"
        this.name = "Umar Mohammad"
    }

    private static usersList: User[] = []

    public static currentUser?: User

    static register(): {
        success: boolean, message: string
    } {
        try {
            //Replaced with Supabase google login stuff
            const email = "ummo2564@student.harmonytx.org"
            const name = "Umar Mohammad"

            if(email.split("@")[1] !== "student.harmonytx.org") {
                return {
                    success: true,
                    message: "Email address must belong to a Harmony Student. Try again with your school email."
                }
            } else {
                const newUser = new User()
                User.usersList.push(newUser)
                User.currentUser = newUser
    
                return {
                    success: true,
                    message: ""
                }
            }
        } catch(error) {
            return {
                success: false,
                message: String(error)
            }
        }
    }

    static login(): {
        success: boolean, message: string
    } {
        try {
            //Replaced with Supabase google stuff
            const email = "ummo2564@student.harmonytx.org"
            const name = "Umar Mohammad"

            const userId = User.usersList.findIndex(x => x.email === email)

            if(userId !== -1) {
                User.currentUser = User.usersList[userId]

                return {
                    success: true,
                    message: ""
                }
            } else {
                //Autoregister user
                if(email.split("@")[1] !== "student.harmonytx.org") {
                    return {
                        success: true,
                        message: "Email address must belong to a Harmony Student. Try again with your school email."
                    }
                } else {
                    const newUser = new User()
                    User.usersList.push(newUser)
                    User.currentUser = newUser
        
                    return {
                        success: true,
                        message: ""
                    }
                }
            }
        } catch(error) {
            return {
                success: false,
                message: String(error)
            }
        }
    }

    static logout() {
        //Do Supabase logout here
        User.currentUser = undefined
    }
}