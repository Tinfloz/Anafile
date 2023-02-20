import Files from "../models/file.model.js";
import shortid from "shortid";
import excelToJson from "convert-excel-to-json";
import { nextChar } from "../helpers/next.char.js";
import Users from "../models/users.model.js";
import { sendEmail } from "../helpers/send.email.js";
import Clusters from "../models/cluster.model.js";

const createFile = async (req, res) => {
    try {
        const user = await Users.findById(req.user._id);
        const file = req.file;
        const { keys, values, emails } = req.body;
        const { cluster } = req.query;
        const keyColumns = () => {
            let startChar = "A";
            let columns = [];
            let columnToKey = {};
            while (columns.length !== keys.length) {
                columns.push(startChar);
                if (columns.length === keys.length) {
                    break
                };
                startChar = nextChar(startChar)
            };
            for (let i = 0; i < columns.length; i++) {
                columnToKey[columns[i]] = keys[i]
            };
            return columnToKey
        };
        const result = excelToJson({
            sourceFile: file.path,
            header: {
                rows: 1
            },
            columnToKey: keyColumns()
        });
        const idx = values.reduce((a, e, i) => (e === "number") ? a.concat(i) : a, []);
        const invalid = [];
        for (let i of result.Sheet1) {
            for (let k of idx) {
                if (/\d/.test(i[Object.keys(i)[k]])) {
                    continue
                };
                invalid.push(i);
            };
        };
        if (invalid.length === 0) {
            const name = file.originalname;
            const base64xls = new Buffer.from(JSON.stringify(result.Sheet1)).toString("base64");
            const accessCode = shortid.generate();
            // let decoded = Buffer.from(base64xls, "base64");
            // console.log(JSON.parse(decoded), "decoded");
            const access = [req.user._id];
            for (let i of emails) {
                const fileHandlers = await Users.findOne({
                    email: i
                });
                access.push(user._id);
            };
            const file = await Files.create({
                fileString: base64xls,
                fileName: file.originalname,
                cluster,
                access,
                accessCode
            });
            if (!file) {
                throw "file could not be created"
            };
            try {
                let subject = `Access code for file titled ${file.originalname}`;
                let emailToSend = `The access code to file ${file.originalname} is: ${accessCode}.`
                let receivers = [...emails, user.email];
                for (let i of receivers) {
                    await sendEmail({ email: i, subject, emailToSend });
                }
            } catch (error) {
                console.error(error);
            }
            return res.status(200).json({
                success: true
            });
        };
        throw "file could not be validated as some of the fields have data other than the specified datatype"
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const accessAFile = async (req, res) => {
    try {
        const user = await Users.findById(req.user._id);
        const fileId = req.query;
        const { code } = req.body;
        if (!code) {
            throw "enter an access code"
        }
        const file = await Files.findById(fileId);
        if (!file) {
            throw "file not found"
        };
        if (!file.access.includes(user._id)) {
            throw "not authorised to access file"
        };
        if (!await file.compareAccessCode(code)) {
            throw "code incorrect"
        };
        const bufferArrayFile = Buffer.from(file.fileString, "base64");
        const decodedFile = JSON.parse(bufferArrayFile);
        return res.status(200).json({
            success: false,
            decodedFile
        });
    } catch (error) {
        if (error === "file not found") {
            return res.status(404).json({
                success: false,
                error: error.errors?.[0]?.message || error
            });
        } else if (error === "not authorised to access file") {
            return res.status(403).json({
                success: false,
                error: error.errors?.[0]?.message || error
            });
        } else if (error === "code incorrect") {
            return res.status(400).json({
                success: false,
                error: error.errors?.[0]?.message || error
            });
        };
        return res.status(500).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

export {
    createFile, accessAFile
}