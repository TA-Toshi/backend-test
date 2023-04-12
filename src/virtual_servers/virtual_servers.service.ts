import { Injectable } from '@nestjs/common';
import { virtual_servers } from './virtual_servers.model';
import { InjectModel } from '@nestjs/sequelize';
import { create_dto_virtual_servers } from './dto/create_virtual_servers.dto';

@Injectable()
export class VirtualServersService {

    constructor(@InjectModel(virtual_servers) private virtual_servers_repository: typeof virtual_servers){}

    async virtual_servers_get_all() {
        const all_virtual_servers = await this.virtual_servers_repository.findAll();
        return all_virtual_servers;
    }

    async virtual_server_create(dto: create_dto_virtual_servers) {
        const vr_server = this.virtual_servers_repository.create(dto);
        return vr_server;
    }

    async virtual_server_check(id: string) {
        const vr_server = this.virtual_servers_repository.findOne({where: {"id": id}});
        return vr_server;
    }

    async virtual_server_delete(id: string) {
        const vr_server = this.virtual_servers_repository.destroy({where: {"id": id}});
        return vr_server;
    }

    async virtual_server_update(dto: create_dto_virtual_servers, id: string) {
        const vr_server = this.virtual_servers_repository.update(dto, {where: {"id": id}});
        return vr_server;
    } 
}
