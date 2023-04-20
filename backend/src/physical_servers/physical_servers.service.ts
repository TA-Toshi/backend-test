import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { physical_servers } from './physical_servers.model';
import { create_dto_physical_servers } from './dto/create_physical_servers.dto';
import { Sequelize } from 'sequelize-typescript';


@Injectable()
export class PhysicalServersService {

    constructor(
        @InjectModel(physical_servers) private physical_servers_repository: typeof physical_servers,
    ){}

    async physical_servers_get_all() {
        let all_physical_servers = await this.physical_servers_repository.findAll({
            where:{},
            attributes: 
                {include:[
                [Sequelize.fn(
                    "",  
                    Sequelize.col("memory_type_status.status"), 
                    ), 
                    'memory_type'],

                [Sequelize.fn(
                    "",  
                    Sequelize.col("os_status.status"), 
                    ), 
                    'os'],
                
                [Sequelize.fn(
                    "",  
                    Sequelize.col("disk_status.status"), 
                    ), 
                    'disk'],   
                    
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
                    Sequelize.col("backup_physical_machine_status.status"), 
                    ), 
                    'backup_physical_machine'],
                [Sequelize.fn(
                    "",  
                    Sequelize.col("zabbix_agent_status.status"), 
                    ), 
                    'zabbix_agent'],    
                ]},
            include:[{
                association: "memory_type_status",
                attributes: ["status"]
            },
            {
                association: "os_status",
                attributes: ["status"]
            },
            {
                association: "disk_status",
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
                association: "backup_physical_machine_status",
                attributes: ["status"]
            },
            {
                association: "zabbix_agent_status",
                attributes: ["status"]
            },
        ]
        });
        
        return all_physical_servers;
    }

    async physical_servers_create(dto: create_dto_physical_servers) {
        const physical_servers = this.physical_servers_repository.create(dto);
        return physical_servers;
    }

    async physical_servers_check(id: string) {
        let physical_server = await this.physical_servers_repository.findOne({
            where: {"id": id},
            attributes: 
                {include:[
                [Sequelize.fn(
                    "",  
                    Sequelize.col("memory_type_status.status"), 
                    ), 
                    'memory_type'],

                [Sequelize.fn(
                    "",  
                    Sequelize.col("os_status.status"), 
                    ), 
                    'os'],
                
                [Sequelize.fn(
                    "",  
                    Sequelize.col("disk_status.status"), 
                    ), 
                    'disk'],   
                    
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
                    Sequelize.col("backup_physical_machine_status.status"), 
                    ), 
                    'backup_physical_machine'],
                [Sequelize.fn(
                    "",  
                    Sequelize.col("zabbix_agent_status.status"), 
                    ), 
                    'zabbix_agent'],
                ]},
        include:[
            {
                association: "memory_type_status",
                attributes: ["status"]
            },
            {
                association: "os_status",
                attributes: ["status"]
            },
            {
                association: "disk_status",
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
                association: "backup_physical_machine_status",
                attributes: ["status"]
            },
            {
                association: "zabbix_agent_status",
                attributes: ["status"]
            },
        ]
    });
        return physical_server;
    }

    async physical_servers_delete(id: string) {
        const physical_server = await this.physical_servers_repository.destroy({where: {"id": id}});
        return physical_server;
    }

    async physical_servers_update(dto: create_dto_physical_servers ,id: string) {
        const physical_server = await this.physical_servers_repository.update(dto, {where: {"id": id}})
        return physical_server
    }
}

