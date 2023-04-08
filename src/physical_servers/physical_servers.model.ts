import { Column, DataType, Model, Table } from "sequelize-typescript";

interface physical_servers_add {
    server_name: string;
    appointment: string;
    cpu: string;
    cores: number;
    streams: number;
    ip: any;
    vlan: any;
    port: number;
    comment: string;
}


@Table({tableName: 'physical_servers'})
export class physical_servers extends Model<physical_servers, physical_servers_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: true})
    server_name: string;

    @Column({type: DataType.STRING, allowNull: true})
    appointment: string;

    // @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    // backup: string;

    // @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    // os: string;

    @Column({type: DataType.STRING, allowNull: true})
    cpu: string;

    @Column({type: DataType.INTEGER, allowNull: true})
    cores: number;

    @Column({type: DataType.INTEGER, allowNull: true})
    streams: number;

    // @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    // memory_type: string;

    // @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    // zabbix_agent: string;

    // @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    // location: string;

    @Column({type: DataType.CHAR, allowNull: true})
    ip: any;

    // @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    // disk: string;

    @Column({type: DataType.CHAR, allowNull: true})
    vlan: any;

    @Column({type: DataType.INTEGER, allowNull: true})
    port: number;

    @Column({type: DataType.STRING, allowNull: true})
    comment: string;

}
