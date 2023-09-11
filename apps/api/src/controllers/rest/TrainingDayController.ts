import { TrainingDayModel, TrainingDaysRepository } from "@/generated";
import { Controller, Inject } from "@tsed/di";
import { Get, Returns, Summary } from "@tsed/schema";

@Controller("/training-days")
export class TrainingDayCtrl {
  @Inject()
  protected service: TrainingDaysRepository;

  @Get()
  @Summary("Retrieve all training days")
  @Returns(200, Array)
    .Of(TrainingDayModel)
    .Description("Return a list of TrainingDay")
  getAll() {
    return this.service.findMany();
  }
}
