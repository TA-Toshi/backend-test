import { Injectable } from '@nestjs/common';
import { virtual_servers } from './virtual_servers.model';
import { InjectModel } from '@nestjs/sequelize';
import { create_dto_virtual_servers } from './dto/create_virtual_servers.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class VirtualServersService {

    constructor(
        @InjectModel(virtual_servers) private virtual_servers_repository: typeof virtual_servers,
        
    
    ){}

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

                [Sequelize.fn(
                    "",  
                    Sequelize.col("vm_status_status.status"), 
                    ), 
                    'vm_status'],

                [Sequelize.fn(
                    "",  
                    Sequelize.col("os_status.status"), 
                    ), 
                    'os'],
                
                [Sequelize.fn(
                    "",  
                    Sequelize.col("disk_location_status.status"), 
                    ), 
                    'disk_location'],   
                    
                [Sequelize.fn(
                    "",  
                    Sequelize.col("backup_status.status"), 
                    ), 
                    'backup'],

                [Sequelize.fn(
                    "",  
                    Sequelize.col("location_status.status"), 
                    ), 
                    'location'],

                [Sequelize.fn(
                    "",  
                    Sequelize.col("backup_creation_mechanism_status.status"), 
                    ), 
                    'backup_creation_mechanism'],

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

            //  Парсим number_stored_copies_vm 
            for (let vr_server in all_virtual_servers) {
                const a = (await all_virtual_servers)[vr_server].vm_status_status.status.match(/\d+/g).join(' ').split(' ').map(Number)
                let num: number;
                if (a.length == 4) {
                    num = a[1] + (a[2]*a[3])
                }
                if (a.length == 2) {
                    num = a[1]
                }
                (await all_virtual_servers)[vr_server].number_stored_copies_vm = num

                let su:number;
                su = num + (await all_virtual_servers)[vr_server].disk_gb;
                (await all_virtual_servers)[vr_server].maximum_storage_size_gb = su
            }
        
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

                [Sequelize.fn(
                    "",  
                    Sequelize.col("vm_status_status.status"), 
                    ), 
                    'vm_status'],

                [Sequelize.fn(
                    "",  
                    Sequelize.col("os_status.status"), 
                    ), 
                    'os'],
                
                [Sequelize.fn(
                    "",  
                    Sequelize.col("disk_location_status.status"), 
                    ), 
                    'disk_location'],   
                    
                [Sequelize.fn(
                    "",  
                    Sequelize.col("backup_status.status"), 
                    ), 
                    'backup'],

                [Sequelize.fn(
                    "",  
                    Sequelize.col("location_status.status"), 
                    ), 
                    'location'],

                [Sequelize.fn(
                    "",  
                    Sequelize.col("backup_creation_mechanism_status.status"), 
                    ), 
                    'backup_creation_mechanism'],
         
            ]},
            include:[
                {
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
            ]
    });
    //  Парсим number_stored_copies_vm 
    const a = (await vr_server).vm_status_status.status.match(/\d+/g).join(' ').split(' ').map(Number)
    let num: number;
    if (a.length == 4) {
        num = a[1] + (a[2]*a[3])
    }
    if (a.length == 2) {
        num = a[1]
    }

    (await vr_server).number_stored_copies_vm = num

    // maximum_storage_size_gb
    let su:number;
    su = num + (await vr_server).disk_gb;
    (await vr_server).maximum_storage_size_gb = su


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
