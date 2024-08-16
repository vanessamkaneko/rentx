import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../../ormconfig";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

/*DTO = Data Transfer Object -> conceito de criar um obj. responsável por transferir dados entre uma camada/classe e outra -> 
no caso recebendo infos da rota p/ aplicar no repositório. 
- normalmente aplicado no controller (modo de filtrar o que quero receber no backend das infos enviadas no req.body)
- DTOs are particularly useful for encapsulating data and ensuring that it is transferred in a structured and secure manner*/

class CategoriesRepository implements ICategoriesRepository {

  private repository: Repository<Category>

  constructor() {
    this.repository = AppDataSource.getRepository(Category)
  }

  // singleton pattern - para conseguirmos utilizar sempre a mesma instância da classe e não criar várias instâncias

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description, name
    });

    await this.repository.save(category)

  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category | null> {
    // select * (all) from categories where name = "name"
    const category = await this.repository.findOne({ where: { name } })

    return category
  }

}

export { CategoriesRepository }