import { Injectable } from '@nestjs/common';
import { virtual_servers } from './virtual_servers.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VirtualServersService {

    constructor(@InjectModel(virtual_servers) private virtual_servers_repository: typeof virtual_servers){}

    async virtual_servers_get_all() {
        const all_virtual_servers = await this.virtual_servers_repository.findAll();
        return all_virtual_servers;
    }
}
