import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("t_client")
export class Client implements Record<string, unknown> {
    [key: string]: unknown;
    
    @PrimaryGeneratedColumn({ name: "client_id" })
    private id!: number;

    @Column({ name: "name", type: "varchar" })
    private name!: string;

    @Column({ name: "email", type: "varchar" })
    private email!: string;

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        };
    }

    public getId = (): number => {
        return this.id;
    }
} 