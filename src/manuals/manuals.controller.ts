import { Body, Controller, Get, Post } from '@nestjs/common';
import { create_dto_manuals } from './dto/create_manuals.dto';
import { ManualsService } from './manuals.service';

@Controller('manuals')
export class ManualsController {

    constructor(private manuals_service: ManualsService) {}

    // os
    @Post('create_os')
    create_os(@Body() create_dto_manuals: create_dto_manuals) {
        return this.manuals_service.os_status_create(create_dto_manuals);
    }

    @Get('all_os')
    getAll_os() {
        return this.manuals_service.os_status_get_all();
    }

    // memory_type
    @Post('create_memory_type')
    create_memory_type(@Body() create_dto_manuals: create_dto_manuals) {
        return this.manuals_service.memory_type_status_create(create_dto_manuals);
    }

    @Get('all_memory_type')
    getAll_memory_type() {
        return this.manuals_service.memory_type_status_get_all();
    }

    // disk
    @Post('create_disk')
    create_disk(@Body() create_dto_manuals: create_dto_manuals) {
        return this.manuals_service.disk_status_create(create_dto_manuals);
    }

    @Get('all_disk')
    getAll_disk() {
        return this.manuals_service.disk_status_get_all();
    }

    // backup
    @Post('create_backup')
    create_backup(@Body() create_dto_manuals: create_dto_manuals) {
        return this.manuals_service.backup_status_create(create_dto_manuals);
    }

    @Get('all_backup')
    getAll_backup() {
        return this.manuals_service.backup_status_get_all();
    }

    // zabbix_agent
    @Post('create_zabbix_agent')
    create_zabbix_agent(@Body() create_dto_manuals: create_dto_manuals) {
        return this.manuals_service.zabbix_agent_status_create(create_dto_manuals);
    }

    @Get('all_zabbix_agent')
    getAll_zabbix_agent() {
        return this.manuals_service.zabbix_agent_status_get_all();
    }

    // location
    @Post('create_location')
    create_location(@Body() create_dto_manuals: create_dto_manuals) {
        return this.manuals_service.location_status_create(create_dto_manuals);
    }

    @Get('all_location')
    getAll_location() {
        return this.manuals_service.location_status_get_all();
    }

    // backup_physical_machine
    @Post('create_backup_physical_machine')
    create_backup_physical_machine(@Body() create_dto_manuals: create_dto_manuals) {
        return this.manuals_service.backup_physical_machine_status_create(create_dto_manuals);
    }

    @Get('all_backup_physical_machine')
    getAll_backup_physical_machine() {
        return this.manuals_service.backup_physical_machine_status_get_all();
    }

    // vm_status
    @Post('create_vm_status')
    create_vm_status(@Body() create_dto_manuals: create_dto_manuals) {
        return this.manuals_service.vm_status_status_create(create_dto_manuals);
    }

    @Get('all_vm_status')
    getAll_vm_status() {
        return this.manuals_service.vm_status_status_get_all();
    }

    // disk_location
    @Post('create_disk_location')
    create_disk_location(@Body() create_dto_manuals: create_dto_manuals) {
        return this.manuals_service.disk_location_status_create(create_dto_manuals);
    }

    @Get('all_disk_location')
    getAll_disk_location() {
        return this.manuals_service.disk_location_status_get_all();
    }

    // backup_creation_mechanism
    @Post('create_backup_creation_mechanism')
    create_backup_creation_mechanism(@Body() create_dto_manuals: create_dto_manuals) {
        return this.manuals_service.backup_creation_mechanism_status_create(create_dto_manuals);
    }

    @Get('all_backup_creation_mechanism')
    getAll_backup_creation_mechanism() {
        return this.manuals_service.backup_creation_mechanism_status_get_all();
    }
}
