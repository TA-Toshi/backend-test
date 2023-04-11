import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { physical_servers } from "src/physical_servers/physical_servers.model";
import { virtual_servers } from "src/virtual_servers/virtual_servers.model";

interface os_add {
    status: string;
}

// +
@Table({tableName: 'os'})
export class os extends Model<os, os_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    status: string;
    
    @HasMany(() => physical_servers)
    phys_serve: physical_servers[];
}

interface memory_type_add {
    status: string;
}

// +
@Table({tableName: 'memory_type'})
export class memory_type extends Model<memory_type, memory_type_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    status: string;

    @HasMany(() => physical_servers)
    phys_serve: physical_servers[];
}

interface disk_add {
    status: string;
}
// +
@Table({tableName: 'disk'})
export class disk extends Model<disk, disk_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    status: string;

    @HasMany(() => physical_servers)
    phys_serve: physical_servers[];
}

interface backup_add {
    status: string;
}
// +
@Table({tableName: 'backup'})
export class backup extends Model<backup, backup_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    status: string;

    @HasMany(() => physical_servers)
    phys_serve: physical_servers[];
}

interface zabbix_agent_add {
    status: string;
}
// +
@Table({tableName: 'zabbix_agent'})
export class zabbix_agent extends Model<zabbix_agent, zabbix_agent_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    status: string;

    @HasMany(() => physical_servers)
    phys_serve: physical_servers[];
}

interface location_add {
    status: string;
}
// +
@Table({tableName: 'location'})
export class location extends Model<location, location_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    status: string;

    @HasMany(() => physical_servers)
    phys_serve: physical_servers[];
}

interface backup_physical_machine_add {
    status: string;
}
// +
@Table({tableName: 'backup_physical_machine'})
export class backup_physical_machine extends Model<backup_physical_machine, backup_physical_machine_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    status: string;

    @HasMany(() => physical_servers)
    phys_serve: physical_servers[];
}

interface vm_status_add {
    status: string;
}
// +
@Table({tableName: 'vm_status'})
export class vm_status extends Model<vm_status, vm_status_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    status: string;

    @HasMany(() => virtual_servers)
    vr_serve: virtual_servers[];
}

interface disk_location_add {
    status: string;
}
// +
@Table({tableName: 'disk_location'})
export class disk_location extends Model<disk_location, disk_location_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    status: string;

    @HasMany(() => virtual_servers)
    vr_serve: virtual_servers[];
}

interface backup_creation_mechanism_add {
    status: string;
}

@Table({tableName: 'backup_creation_mechanism'})
export class backup_creation_mechanism extends Model<backup_creation_mechanism, backup_creation_mechanism_add>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    status: string;

    @HasMany(() => virtual_servers)
    vr_serve: virtual_servers[];
}