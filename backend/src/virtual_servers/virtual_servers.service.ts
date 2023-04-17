import { Injectable } from '@nestjs/common';
import { virtual_servers } from './virtual_servers.model';
import { InjectModel } from '@nestjs/sequelize';
import { create_dto_virtual_servers } from './dto/create_virtual_servers.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class VirtualServersService {

    constructor(@InjectModel(virtual_servers) private virtual_servers_repository: typeof virtual_servers){}

    async virtual_servers_get_all() {
        const all_virtual_servers = await this.virtual_servers_repository.findAll({
            where:{},
            // number_stored_copies_vm
            // maximum_storage_size_gb
            attributes: 
                {include:[
                    [Sequelize.fn(
                    "concat", 
                    Sequelize.col("virtual_servers.id"), 
                    " ", 
                    Sequelize.col("client"), 
                    " ", 
                    Sequelize.col("service"), 
                    " ", 
                    Sequelize.col("environment")), 
                    'vm_name'],

                [Sequelize.fn(
                    "concat",  
                    Sequelize.col("client"), 
                    " ", 
                    Sequelize.col("service"), 
                    " ", 
                    Sequelize.col("environment")), 
                    'machine_name'],

                // [Sequelize.fn(
                //     "",  
                //     Sequelize.col("client"), 
                //     ), 
                //     'machine_name'],
                ]},
                           
            include:[{
                association: "vm_status_status",
                attributes: ["status"]
            },
            {
                association: "os_status",
                attributes: ["status"]
            },
            {
                association: "disk_location_status",
                attributes: ["status"]
            },
            {
                association: "backup_status",
                attributes: ["status"]
            },
            {
                association: "location_status",
                attributes: ["status"]
            },
            {
                association: "backup_creation_mechanism_status",
                attributes: ["status"]
            },
            
        ]}
        );

        // const s: any = "Ежедневно 1 раз в день, хранение 30 последних копий + 2 ежемесячных копии в течении 36 месяцев"
        // const a = s.match(/\d+/g).join(' ').split(' ').map(Number)[1]
        // const b = s.match(/\d+/g).join(' ').split(' ').map(Number)[2]
        // if (s.match(/\d+/g).join(' ').split(' ').map(Number)) {
        //     console.log(a+(b*s.match(/\d+/g).join(' ').split(' ').map(Number)[3]))
        //     console.log(b)
        //     console.log(a)
        //     console.log(s.match(/\d+/g).join(' ').split(' ').map(Number)[3])
        // }
        
        return all_virtual_servers;
    }

    async virtual_server_create(dto: create_dto_virtual_servers) {
        let vr_server = this.virtual_servers_repository.create(dto);
        return vr_server;
    }

    async virtual_server_check(id: string) {
        const vr_server = this.virtual_servers_repository.findOne({
            where: {"id": id},

            attributes: 
                {include:[
                [Sequelize.fn(
                    "concat", 
                    Sequelize.col("virtual_servers.id"), 
                    " ", 
                    Sequelize.col("client"), 
                    " ", 
                    Sequelize.col("service"), 
                    " ", 
                    Sequelize.col("environment")), 
                    'vm_name'],

                [Sequelize.fn(
                    "concat",  
                    Sequelize.col("client"), 
                    " ", 
                    Sequelize.col("service"), 
                    " ", 
                    Sequelize.col("environment")), 
                    'machine_name'],

                // [Sequelize.fn(
                //     "",  
                //     Sequelize.col("client"), 
                //     ), 
                //     'machine_name'],
            ]},
            include:[{
                association: "vm_status_status",
                attributes: ["status"]
            },
            {
                association: "os_status",
                attributes: ["status"]
            },
            {
                association: "disk_location_status",
                attributes: ["status"]
            },
            {
                association: "backup_status",
                attributes: ["status"]
            },
            {
                association: "location_status",
                attributes: ["status"]
            },
            {
                association: "backup_creation_mechanism_status",
                attributes: ["status"]
            },
        ]});
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
