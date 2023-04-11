import { Injectable } from '@nestjs/common';
import { backup, backup_creation_mechanism, backup_physical_machine, disk, disk_location, location, memory_type, os, vm_status, zabbix_agent } from './manuals.model';
import { InjectModel } from '@nestjs/sequelize';
import { create_dto_manuals } from './dto/create_manuals.dto';

@Injectable()
export class ManualsService {
    
    constructor(
    @InjectModel(os) private os_repository?: typeof os,
    @InjectModel(memory_type) private memory_type_repository?: typeof memory_type,
    @InjectModel(disk) private disk_repository?: typeof disk,
    @InjectModel(backup) private backup_repository?: typeof backup,
    @InjectModel(zabbix_agent) private zabbix_agent_repository?: typeof zabbix_agent,
    @InjectModel(location) private location_repository?: typeof location,
    @InjectModel(backup_physical_machine) private backup_physical_machine_repository?: typeof backup_physical_machine,
    @InjectModel(vm_status) private vm_status_repository?: typeof vm_status,
    @InjectModel(disk_location) private disk_location_repository?: typeof disk_location,
    @InjectModel(backup_creation_mechanism) private backup_creation_mechanism_repository?: typeof backup_creation_mechanism,


    ){}

    // os
    async os_status_create(dto: create_dto_manuals) {
        const os = await this.os_repository.create(dto);
        return os;
    }

    async os_status_get_all() {
        const all_os = await this.os_repository.findAll();
        return all_os;
    }

    async os_status_check(id: string) {
        const os = await this.os_repository.findOne({where:{"id": id}})
        return os;
    }

    // memory_type
    async memory_type_status_create(dto: create_dto_manuals) {
        const memory_type = await this.memory_type_repository.create(dto);
        return memory_type;
    }

    async memory_type_status_get_all() {
        const all_memory_type = await this.memory_type_repository.findAll();
        return all_memory_type;
    }

    async memory_type_status_check(id: string) {
        const memory_type = await this.memory_type_repository.findOne({where:{"id": id}})
        return memory_type;
    }

    // disk
    async disk_status_create(dto: create_dto_manuals) {
        const disk = await this.disk_repository.create(dto);
        return disk;
    }

    async disk_status_get_all() {
        const all_disk = await this.disk_repository.findAll();
        return all_disk;
    }

    async disk_status_check(id: string) {
        const disk = await this.disk_repository.findOne({where:{"id": id}})
        return disk;
    }

    // backup
    async backup_status_create(dto: create_dto_manuals) {
        const backup = await this.backup_repository.create(dto);
        return backup;
    }

    async backup_status_get_all() {
        const all_backup = await this.backup_repository.findAll();
        return all_backup;
    }

    async backup_status_check(id: string) {
        const backup = await this.backup_repository.findOne({where:{"id": id}})
        return backup;
    }

    // zabbix_agent
    async zabbix_agent_status_create(dto: create_dto_manuals) {
        const zabbix_agent = await this.zabbix_agent_repository.create(dto);
        return zabbix_agent;
    }

    async zabbix_agent_status_get_all() {
        const all_zabbix_agent = await this.zabbix_agent_repository.findAll();
        return all_zabbix_agent;
    }

    async zabbix_agent_status_check(id: string) {
        const zabbix_agent = await this.zabbix_agent_repository.findOne({where:{"id": id}})
        return zabbix_agent;
    }

    // location
    async location_status_create(dto: create_dto_manuals) {
        const location = await this.location_repository.create(dto);
        return location;
    }

    async location_status_get_all() {
        const all_location = await this.location_repository.findAll();
        return all_location;
    }

    async location_status_check(id: string) {
        const location = await this.location_repository.findOne({where:{"id": id}})
        return location;
    }

    // backup_physical_machine
    async backup_physical_machine_status_create(dto: create_dto_manuals) {
        const backup_physical_machine = await this.backup_physical_machine_repository.create(dto);
        return backup_physical_machine;
    }

    async backup_physical_machine_status_get_all() {
        const all_backup_physical_machine = await this.backup_physical_machine_repository.findAll();
        return all_backup_physical_machine;
    }

    async backup_physical_machine_status_check(id: string) {
        const backup_physical_machine = await this.backup_physical_machine_repository.findOne({where:{"id": id}})
        return backup_physical_machine;
    }

    // vm_status
    async vm_status_status_create(dto: create_dto_manuals) {
        const vm_status = await this.vm_status_repository.create(dto);
        return vm_status;
    }

    async vm_status_status_get_all() {
        const all_vm_status = await this.vm_status_repository.findAll();
        return all_vm_status;
    }

    async vm_status_status_check(id: string) {
        const vm_status = await this.vm_status_repository.findOne({where:{"id": id}})
        return vm_status;
    }

    // disk_location
    async disk_location_status_create(dto: create_dto_manuals) {
        const disk_location = await this.disk_location_repository.create(dto);
        return disk_location;
    }

    async disk_location_status_get_all() {
        const all_disk_location = await this.disk_location_repository.findAll();
        return all_disk_location;
    }

    async disk_location_status_check(id: string) {
        const disk_location = await this.disk_location_repository.findOne({where:{"id": id}})
        return disk_location;
    }

    // backup_creation_mechanism
    async backup_creation_mechanism_status_create(dto: create_dto_manuals) {
        const backup_creation_mechanism = await this.backup_creation_mechanism_repository.create(dto);
        return backup_creation_mechanism;
    }

    async backup_creation_mechanism_status_get_all() {
        const all_backup_creation_mechanism = await this.backup_creation_mechanism_repository.findAll();
        return all_backup_creation_mechanism;
    }

    async backup_creation_mechanism_status_check(id: string) {
        const backup_creation_mechanism = await this.backup_creation_mechanism_repository.findOne({where:{"id": id}})
        return backup_creation_mechanism;
    }
}
