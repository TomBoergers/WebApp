export class User {
    id!: number;
    email!: string;
    password!: string;
    vorname!: string;
    nachname!: string;
    geburtsdatum!: Date;
    friendrequests!: number[];
    friendlist!: number[];
    privacy!: boolean;

}

