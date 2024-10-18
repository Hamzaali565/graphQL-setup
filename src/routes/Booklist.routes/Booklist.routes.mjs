import Router from "express";
import {
  bookListCreation,
  getfilteredBooks,
  getDataById,
  updateDocumnet,
  DeleteADoc,
  limitedData,
} from "../../Controllers/Booklist.Controller/Booklist.Controller.mjs";

const router = Router();

router.route("/bookListCreation").post(bookListCreation);
router.route("/bookListFiltered").get(getfilteredBooks);
router.route("/bookListId").get(getDataById);
router.route("/bookListUpdate").put(updateDocumnet);
router.route("/bookListDelete").delete(DeleteADoc);
router.route("/bookListLimited").get(limitedData);

export default router;
