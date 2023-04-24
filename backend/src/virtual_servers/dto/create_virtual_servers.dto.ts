export class create_dto_virtual_servers {
    
    readonly client: string;
    readonly service: string;
    readonly environment: string;
    // readonly vm_name: string;
    readonly backup_id: number;
    readonly vm_status_id: number;
    readonly os_id: number;
    readonly required_date_vm_shutdown: string;
    readonly automatic_internal_domain_name: string;
    readonly additional_internal_domain_name: string;
    readonly domain_names: string;
    readonly cpu: string;
    readonly mb: number;
    readonly ram: number;
    readonly disk_gb: number;
    readonly disk_location_id: number;
    readonly zabbix_agent_id: number; 
    readonly location_id: number; 
    readonly ip: any;
    readonly vlan: any;
    readonly backup_creation_mechanism_id: number;
    readonly number_stored_copies_vm: number;
    readonly maximum_storage_size_gb: number;
    readonly comment: string;
}
