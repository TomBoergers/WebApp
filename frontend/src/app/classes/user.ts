export class User {
    id!: number;
    email!: string;
    password!: string;
    vorname!: string;
    nachname!: string;
    geburtsdatum!: Date;
    favTableID!: number;
    friendrequests!: number[];
    friendlist!: number[];
    privacy!: boolean;

}

