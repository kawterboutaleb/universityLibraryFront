import { Author } from "./author.model";
import { Collection } from "./collection.model";
import { DocCategory } from "./docCategory.model";
import { DocFormat } from "./docFormat.model";
import { DocStatus } from "./docStatus.model";
import { Editor } from "./editor.model";
import { SubCollection } from "./subCollection.model";

export class Book{
    doc_id!: number;
    bk_isbn!: string;
    doc_title!: String;
    bk_edition!: number ;
    doc_complementaryTitle!: String;
    doc_parallelTitle!: String;
    doc_setTitle!: String;
    doc_partNumber!: number;
    doc_year!: number;
    doc_nbr_copies!: number;
    doc_keywords!: String;
    doc_illustration!: String;
    doc_nbr_pages!: number;
    doc_material!: String;
    doc_length!: number;
    doc_abstract!: string;
    doc_notes!: string;
    subCollectionTitle!: string;
    //subCollection!: string;
    //subCollection = new SubCollection();
    //subCollection!: SubCollection;
    //collection!: Collection;
    //documentFormat!: DocFormat;
    //documentCategory!: DocCategory;
    //language!: string;
    //country!: string;
    //editors!: Editor;
    


}