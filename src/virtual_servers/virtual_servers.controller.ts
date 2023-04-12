import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VirtualServersService } from './virtual_servers.service';
import { create_dto_virtual_servers } from './dto/create_virtual_servers.dto';

@Controller('virtual-servers')
export class VirtualServersController {

    constructor(private virtual_servers_service: VirtualServersService) {}

    @Get()
    getAll() {
        return this.virtual_servers_service.virtual_servers_get_all();
    }

    @Post()
    create(@Body() create_dto_virtual_servers: create_dto_virtual_servers) {
        return this.virtual_servers_service.virtual_server_create(create_dto_virtual_servers);
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.virtual_servers_service.virtual_server_check(id);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.virtual_servers_service.virtual_server_delete(id);
    }

    @Put(':id')
    updateById(@Param('id') id: string, @Body() create_dto_virtual_servers: create_dto_virtual_servers) {
        return this.virtual_servers_service.virtual_server_update(create_dto_virtual_servers, id);
    }
}
