import { NgModule } from "@angular/core";
import { RequestService } from "./http-request/http-requests.service";
import { TickerService } from "./ticker/ticker.service";

@NgModule({
  providers: [
    RequestService,
    TickerService
  ]
})

export class SharedServicesModule {}

