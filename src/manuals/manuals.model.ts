import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { physical_servers } from "src/physical_servers/physical_servers.model";

interface os_add {
    status: string;
}

@Table({tableName: 'os'})
export class os extends Model<os, os_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: true, unique: true})
    status: string;
    
    @HasMany(() => physical_servers)
    phys_serve: physical_servers[];
}


// interface backup_add {
//     status: string;
// }

// @Table({tableName: 'backup'})
// export class backup extends Model<backup, backup_add>{

//     @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
//     id: number;

//     @Column({type: DataType.STRING, allowNull: true, unique: true})
//     status: string;


// }