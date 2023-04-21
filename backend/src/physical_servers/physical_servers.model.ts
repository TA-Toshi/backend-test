import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { backup, backup_physical_machine, disk, location, memory_type, os, zabbix_agent } from "src/manuals/manuals.model";

interface physical_servers_add {
    server_name: string;
    appointment: string;
    backup_id: number;
    os_id: number;
    cpu: string;
    cores: number;
    streams: number;
    memory_type_id: number;
    zabbix_agent_id: number;
    location_id: number;
    ip: any;
    disk_id: number;
    backup_physical_machine_id: number;
    vlan: any;
    port: number;
    comment: string;
}


@Table({tableName: 'physical_servers'})
export class physical_servers extends Model<physical_servers, physical_servers_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    server_name: string;

    @Column({type: DataType.STRING, allowNull: false})
    appointment: string;

    @ForeignKey(() => backup)
    @Column({type: DataType.INTEGER, allowNull: false})
    backup_id: number

    @ForeignKey(() => os)
    @Column({type: DataType.INTEGER})
    os_id: number;

    @Column({type: DataType.STRING, allowNull: false})
    cpu: string; 

    @Column({type: DataType.INTEGER, allowNull: false})
    cores: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    streams: number;

    @ForeignKey(() => memory_type)
    @Column({type: DataType.INTEGER, allowNull: false})
    memory_type_id: number; 
    
    @ForeignKey(() => zabbix_agent)
    @Column({type: DataType.INTEGER, allowNull: false})
    zabbix_agent_id: number; 

    @ForeignKey(() => location)
    @Column({type: DataType.INTEGER, allowNull: false})
    location_id: number; 

    @Column({type: DataType.CHAR, allowNull: false})
    ip: any;
    
    @ForeignKey(() => disk)
    @Column({type: DataType.INTEGER, allowNull: false})
    disk_id: number; 

    @ForeignKey(() => backup_physical_machine)
    @Column({type: DataType.INTEGER, allowNull: false})
    backup_physical_machine_id: number;

    @Column({type: DataType.CHAR, allowNull: false})
    vlan: any;

    @Column({type: DataType.INTEGER, allowNull: false})
    port: number;

    @Column({type: DataType.STRING, allowNull: false})
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
