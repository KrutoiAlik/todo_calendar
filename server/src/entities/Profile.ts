class Profile {

    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    getProfile() {
        return {
            id: this.id,
            name: this.name,
        }
    }
}

export {
    Profile
}