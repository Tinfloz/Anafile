import Files from "../models/file.model.js";
import shortid from "shortid";
import excelToJson from "convert-excel-to-json";
import { nextChar } from "../helpers/next.char.js";
import Users from "../models/users.model.js";
import { sendEmail } from "../helpers/send.email.js";
import Clusters from "../models/cluster.model.js";
import { validateTypes } from "../helpers/validate.type.js";

// create file 
const createFile = async (req, res) => {
    try {
        const { types, id, clusterId } = req.body;
        const file = req.file;
        const cluster = await Clusters.findById(clusterId);
        if (!cluster.members.includes(req.user._id)) {
            throw "not authorised"
        };
        const parsedId = JSON.parse(id);
        const parsedTypes = JSON.parse(types)
        const typeArray = parsedTypes.map(el => el.dataType);
        console.log(typeArray, "type array")
        const fieldArray = parsedTypes.map(el => el.name);
        console.log(fieldArray, "fiel array")
        const columnToKeyGen = () => {
            let columnToKey = {};
            let startChar = "A";
            let startIdx = 0;
            while (fieldArray.length) {
                columnToKey = { ...columnToKey, [startChar]: fieldArray[startIdx] };
                if (Object.keys(columnToKey).length === fieldArray.length) {
                    break
                };
                startChar = nextChar(startChar);
                startIdx += 1;
            };
            return columnToKey;
        };
        const result = excelToJson({
            sourceFile: file.path,
            header: {
                rows: 1
            },
            columnToKey: columnToKeyGen()
        });
        const dataValidationArray = [];
        for (let i of result.Sheet1) {
            let validationObject = {}
            let iValues = Object.values(i);
            for (let i = 0; i < iValues.length; i++) {
                validationObject[iValues[i]] = typeArray[i]
            };
            dataValidationArray.push(validationObject)
        };
        const invalid = [];
        for (let i of dataValidationArray) {
            if (!validateTypes(i)) {
                continue
            };
            invalid.push(i);
        };
        if (invalid.length === 0) {
            const access = [...parsedId, req.user._id];
            const fileString = Buffer.from(JSON.stringify(result.Sheet1)).toString("base64");
            const fileName = file.originalname;
            const accessCode = shortid.generate();
            const fileDb = await Files.create({
                cluster: clusterId,
                fileName,
                fileString,
                access,
                accessCode
            });
            if (!fileDb) {
                throw "file could not be created"
            };
            try {
                const emailOptions = access.map(async el => {
                    const user = await Users.findById(el).lean().select("email");
                    return sendEmail({
                        to: user.email,
                        subject: `Access code for file titled ${file.originalname}`,
                        emailToSend: `The access code to file ${file.originalname} is: ${accessCode}.`
                    });
                });
                await Promise.allSettled(emailOptions);
            } catch (error) {
                console.log(error)
            }
            return res.status(200).json({
                success: true
            });
        };
        return res.status(400).json({
            success: false,
            invalid
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

// access a file
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

// add access member
const addAccessMember = async (req, res) => {
    try {
        const { fileId, clusterId } = req.query;
        const user = await Users.findById(fileId);
        const { memberToAdd } = req.body;
        const member = await Users.findOne({
            email: memberToAdd
        });
        if (!member) {
            throw "user not found"
        }
        const cluster = await Clusters.findById(clusterId);
        if (!cluster.members.includes(user._id)) {
            throw "not authorised to access cluster"
        };
        const file = await Files.findById(fileId);
        if (!file.access.includes(user._id)) {
            throw "not authorised to access file"
        };
        if (!cluster.members.includes(member._id)) {
            throw "add participant to cluster first"
        };
        file.access.push(member._id);
        await file.save();
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        if (error === "user not found") {
            return res.status(404).json({
                success: false,
                error: error.errors?.[0]?.message || error
            });
        } else if (error === "not authorised to access cluster" ||
            error === "not authorised to access file") {
            return res.status(403).json({
                success: false,
                error: error.errors?.[0]?.message || error
            });
        } else if (error === "add participant to cluster first") {
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

// my files 
const getMyFiles = async (req, res) => {
    try {
        const user = await Users.findById(req.user._id);
        const { clusterId } = req.query;
        const cluster = await Clusters.findById(clusterId);
        if (!cluster.members.includes(user._id)) {
            throw "not authorised to access cluster"
        };
        const files = await Files.find({
            cluster: clusterId, access: {
                $in: [user._id]
            }
        });
        return res.status(200).json({
            success: true,
            files
        });
    } catch (error) {
        if (error === "not authorised to access cluster") {
            return res.status(403).json({
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
    createFile, accessAFile, addAccessMember, getMyFiles
}
