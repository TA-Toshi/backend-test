import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { backup, backup_creation_mechanism, disk_location, location, os, vm_status, zabbix_agent } from "src/manuals/manuals.model";

interface virtual_servers_add {
    client: string;
    service: string;
    environment: string;
    backup_id: number;
    vm_status_id: number;
    os_id: number;
    required_date_vm_shutdown: string;
    automatic_internal_domain_name: string;
    additional_internal_domain_name: string;
    domain_names: string;
    cpu: string;
    mb: number;
    ram: number;
    disk_gb: number;
    disk_location_id: number;
    zabbix_agent_id: number; 
    location_id: number; 
    ip: any;
    vlan: any;
    backup_creation_mechanism_id: number;
    number_stored_copies_vm: number;
    maximum_storage_size_gb: number;
    comment: string;
}


@Table({tableName: 'virtual_servers'})
export class virtual_servers extends Model<virtual_servers, virtual_servers_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: "Client"})
    client: string;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: "Service"})
    service: string;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: "Environment"})
    environment: string;


    @ForeignKey(() => backup)
    @Column({type: DataType.INTEGER})
    backup_id: number;

    @ForeignKey(() => vm_status)
    @Column({type: DataType.INTEGER})
    vm_status_id: number;

    @ForeignKey(() => os)
    @Column({type: DataType.INTEGER})
    os_id: number;

    @Column({type: DataType.STRING, allowNull: true})
    required_date_vm_shutdown: string;

    @Column({type: DataType.STRING, allowNull: true})
    automatic_internal_domain_name: string;

    @Column({type: DataType.STRING, allowNull: true})
    additional_internal_domain_name: string;

    @Column({type: DataType.STRING, allowNull: true})
    domain_names: string;
    
    @Column({type: DataType.STRING, allowNull: true})
    cpu: string;

    @Column({type: DataType.INTEGER, allowNull: true})
    mb: number;

    @Column({type: DataType.INTEGER, allowNull: true})
    ram: number; 

    @Column({type: DataType.INTEGER, allowNull: true})
    disk_gb: number; 

    @ForeignKey(() => disk_location)
    @Column({type: DataType.INTEGER})
    disk_location_id: number;

    @ForeignKey(() => zabbix_agent)
    @Column({type: DataType.INTEGER})
    zabbix_agent_id: number; 

    @ForeignKey(() => location)
    @Column({type: DataType.INTEGER})
    location_id: number; 

    @Column({type: DataType.CHAR, allowNull: true})
    ip: any;

    @Column({type: DataType.CHAR, allowNull: true})
    vlan: any;

    @ForeignKey(() => backup_creation_mechanism)
    @Column({type: DataType.INTEGER})
    backup_creation_mechanism_id: number;
    
    @Column({type: DataType.INTEGER, allowNull: true})
    number_stored_copies_vm: number;

    @Column({type: DataType.INTEGER, allowNull: true})
    maximum_storage_size_gb: number;

    @Column({type: DataType.STRING, allowNull: true})
    comment: string; 

    


    @BelongsTo(() => os)
    os_status: os

    @BelongsTo(() => backup)
    backup_status: backup

    @BelongsTo(() => zabbix_agent)
    zabbix_agent_status: zabbix_agent

    @BelongsTo(() => location)
    location_status: location

    @BelongsTo(() => vm_status)
    vm_status_status: vm_status

    @BelongsTo(() => disk_location)
    disk_location_status: disk_location
    
    @BelongsTo(() => backup_creation_mechanism)
    backup_creation_mechanism_status: backup_creation_mechanism
}
