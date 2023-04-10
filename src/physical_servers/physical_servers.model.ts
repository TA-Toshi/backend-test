import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { backup, backup_physical_machine, disk, location, memory_type, os, zabbix_agent } from "src/manuals/manuals.model";

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

    @ForeignKey(() => backup)
    @Column({type: DataType.INTEGER})
    backup_id: number

    @ForeignKey(() => os)
    @Column({type: DataType.INTEGER})
    os_id: number;

    @Column({type: DataType.STRING, allowNull: true})
    cpu: string;

    @Column({type: DataType.INTEGER, allowNull: true})
    cores: number;

    @Column({type: DataType.INTEGER, allowNull: true})
    streams: number;

    @ForeignKey(() => memory_type)
    @Column({type: DataType.INTEGER})
    memory_type_id: number; 
    
    @ForeignKey(() => zabbix_agent)
    @Column({type: DataType.INTEGER})
    zabbix_agent_id: number; 

    @ForeignKey(() => location)
    @Column({type: DataType.INTEGER})
    location_id: number; 

    @Column({type: DataType.CHAR, allowNull: true})
    ip: any;
    
    @ForeignKey(() => disk)
    @Column({type: DataType.INTEGER})
    disk_id: number; 

    @ForeignKey(() => backup_physical_machine)
    @Column({type: DataType.INTEGER})
    backup_physical_machine_id: number;

    @Column({type: DataType.CHAR, allowNull: true})
    vlan: any;

    @Column({type: DataType.INTEGER, allowNull: true})
    port: number;

    @Column({type: DataType.STRING, allowNull: true})
    comment: string; 

    


    @BelongsTo(() => os)
    os_status: os

    @BelongsTo(() => memory_type)
    memory_type_status: memory_type

    @BelongsTo(() => disk)
    disk_status: disk

    @BelongsTo(() => backup)
    backup_status: backup

    @BelongsTo(() => zabbix_agent)
    zabbix_agent_status: zabbix_agent

    @BelongsTo(() => location)
    location_status: location

    @BelongsTo(() => backup_physical_machine)
    backup_physical_machine_status: backup_physical_machine
    
}
