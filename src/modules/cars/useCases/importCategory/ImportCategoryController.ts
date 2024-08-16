import { Request, Response } from "express"
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { container } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

class ImportCategoryController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    if(!file){
      throw new AppError('r')
    }
    
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    
    await importCategoryUseCase.execute(file)

    return response.status(201).send()
  }
}

export { ImportCategoryController }