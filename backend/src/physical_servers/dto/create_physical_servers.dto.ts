export class create_dto_physical_servers {
    
    readonly server_name: string;
    readonly appointment: string;
    readonly backup_id: number;
    readonly os_id: number;
    readonly cpu: string;
    readonly cores: number;
    readonly streams: number;
    readonly memory_type_id: number;
    readonly zabbix_agent_id: number;
    readonly location_id: number;
    readonly ip: any;
    readonly disk_id: number;
    readonly backup_physical_machine_id: number;
    readonly vlan: any;
    readonly port: number;
    readonly comment: string;
}