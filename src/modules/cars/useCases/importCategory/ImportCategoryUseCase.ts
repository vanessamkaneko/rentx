import fs from "fs"
import { parse } from 'csv-parse';
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {

      // stream p/ leitura do arquivo
      const stream = fs.createReadStream(file.path);

      const categories: IImportCategory[] = []

      // transforma o arquivo csv em array ou obj.
      const parseFile = parse()

      /* - o pipe é responsável por pegar cada pedaço do arquivo e realizar alguma ação com ele... no caso, cada chunk (pedaço) do arquivo é encaminhado p/ ser 
      tratado pelo parse */
      stream.pipe(parseFile)

      // neste caso, o on está responsável pela leitura de cada pedaço (cada linha) do arquivo 
      parseFile.on("data", async (line) => {
        const [name, description] = line; // conteúdo de cada linha vem como array, onde o conteúdo das posições são separados por "," -> aqui a primeira posição seria de name e a segunda de description
        categories.push({
          name, description
        })
      })
        .on("end", () => {
          fs.promises.unlink(file.path) // remoção do arquivo da aplicação depois de utilizado
          resolve(categories)
        })
        .on("error", (err) => {
          reject(err)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)
    
    categories.map(async category => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if(!existCategory) {
        await this.categoriesRepository.create({
          name, description
        })
      }
    })
  }
}

export { ImportCategoryUseCase }