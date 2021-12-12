import { Module } from "@nestjs/common";
import { FreightController } from "./freight.controller";
import { FreightService } from "./freight.service";

@Module({
    controllers: [FreightController],
    providers: [FreightService],
    exports: [FreightService],
})

export class FreightModule {}