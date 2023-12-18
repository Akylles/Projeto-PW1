import multer from "multer";
import path from "path";


const armazenamento = multer.diskStorage({
    destination: (req, file, callback) => {
        const caminho = path.join(path.resolve(), "uploads")

        callback(null, caminho)
    },
    filename: (req, file, callback) => {
        const tempo = new Date().getTime()
        const nomeArquivo = `${tempo}-${file.originalname}`

        callback(null, nomeArquivo)
    },
})

export default armazenamento