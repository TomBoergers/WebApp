export class User {
    id!: number;
    email!: string;
    password!: string;
    vorname!: string;
    nachname!: string;
    geburtsdatum!: Date;
    favTableID!: number;
    favTable!:string;
    friendrequests!: number[];
    friendlist!: number[];
    privacy!: boolean;
    profilePrivacy!: boolean;

}

