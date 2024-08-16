import { Router } from "express";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/listCategoriesController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

import multer from "multer";



const categoriesRoutes = Router();

// multer é p/ upload de arquivos e que definimos que os arquivos serão salvos na pasta tmp
const upload = multer({
  dest: "./tmp"
})

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoriesController();

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle)
categoriesRoutes.get("/", listCategoryController.handle)
categoriesRoutes.post("/import", upload.single("file"),  ensureAuthenticated, ensureAdmin, importCategoryController.handle)

export { categoriesRoutes }