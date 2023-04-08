import { Column, DataType, Model, Table } from "sequelize-typescript";

interface vm_status_add {
    status: string;
}

@Table({tableName: 'vm_status'})
export class vm_status extends Model<vm_status, vm_status_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: true, unique: true})
    status: string;


}