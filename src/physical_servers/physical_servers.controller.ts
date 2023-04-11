import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PhysicalServersService } from './physical_servers.service';
import { create_dto_physical_servers } from './dto/create_physical_servers.dto';

@Controller('physical-servers')
export class PhysicalServersController {

    constructor(private physical_servers_service: PhysicalServersService) {}

    @Get()
    getAll() {
        return this.physical_servers_service.physical_servers_get_all();
    } 

    @Post()
    create(@Body() create_dto_physical_servers:create_dto_physical_servers) {
        return this.physical_servers_service.physical_servers_create(create_dto_physical_servers);
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.physical_servers_service.physical_servers_check(id);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.physical_servers_service.physical_servers_delete(id);
    }

    @Put(':id')
    updateById(@Param('id') id: string, @Body() create_dto_physical_servers:create_dto_physical_servers) {
        return this.physical_servers_service.physical_servers_update(create_dto_physical_servers, id)
    }
}
 