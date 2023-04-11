import { Controller, Get } from '@nestjs/common';
import { VirtualServersService } from './virtual_servers.service';

@Controller('virtual-servers')
export class VirtualServersController {

    constructor(private virtual_servers_service: VirtualServersService) {}

    @Get()
    getAll() {
        return this.virtual_servers_service.virtual_servers_get_all();
    } 

}
