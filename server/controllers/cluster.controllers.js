import Clusters from "../models/cluster.model.js";
import Users from "../models/users.model.js";
import shortid from "shortid";
import { sendEmail } from "../helpers/send.email.js";

// create cluster
const createCluster = async (req, res) => {
    try {
        const user = await Users.findById(req.user._id);
        const { name, members } = req.body;
        if (!name || !members) {
            throw "missing inputs"
        };
        const clusterCode = shortid.generate();
        const admin = [user._id];
        const cluster = await Clusters.create({
            name,
            members,
            admin,
            clusterCode
        });
        if (!cluster) {
            throw "cluster could not be created"
        };
        const usersSendEmail = [...admin, ...members];
        for (let i of usersSendEmail) {
            const userSend = await Users.findById(i);
            const options = {
                email: userSend.email,
                subject: `Access key to cluster ${cluster.name}`,
                emailToSend: `The access key to cluster: ${cluster.name} is: ${clusterCode}`,
            };
            try {
                await sendEmail(options)
            } catch (error) {
                console.error(error);
                throw new Error("email could not be sent", { cause: error });
            };
        };
        return res.status(200).json({
            succes: true
        })
    } catch (error) {
        console.log(error, "error")
        if (error === "missing inputs") {
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

// my clusters
const myClusters = async (req, res) => {
    try {
        const user = await Users.findById(req.user._id);
        const clusters = await Clusters.find({
            members: {
                $in: [user._id]
            }
        });
        return res.status(200).json({
            success: true,
            clusters
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

// access cluster
const accessCluster = async (req, res) => {
    try {
        const { name } = req.query;
        const { password } = req.body;
        if (!password) {
            throw "provide a password"
        };
        const cluster = await Clusters.findOne({
            name
        });
        if (!cluster) {
            throw "cluster not found"
        };
        if (!await cluster.comparePassword(password)) {
            throw "access codes don't match"
        };
        return res.status(200).json({
            success: true,
            cluster
        });
    } catch (error) {
        if (error === "cluster not found") {
            return res.status(404).json({
                success: false,
                error: error.errors?.[0]?.message || error
            });
        } else if (error === "provide a password" || error === "access codes don't match") {
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

const makeClusterAdmin = async (req, res) => {
    try {
        const { id } = req.query;
        const { userId } = req.params;
        const user = await Users.findById(req.user._id);
        const cluster = await Clusters.findById(id);
        if (!cluster.admin.includes(user._id)) {
            throw "not authorised"
        };
        if (!cluster.members.includes(userId)) {
            throw "user not in cluster"
        };
        cluster.admin.push(userId);
        await cluster.save();
        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        if (error === "not authorised") {
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

// add members to cluster
const addClusterMember = async (req, res) => {
    try {
        const user = await Users.findById(req.user._id);
        const { clusterId } = req.query;
        const { members } = req.body;
        const cluster = await Clusters.findById(clusterId);
        if (!cluster.admin.includes(user._id)) {
            throw "not authorised to add members"
        };
        cluster.members = [...cluster.members, ...members];
        await cluster.save();
        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        if (error === "not authorised") {
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
    createCluster, myClusters, accessCluster, makeClusterAdmin, addClusterMember
}