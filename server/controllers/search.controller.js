import Users from "../models/users.model.js";
import Clusters from "../models/cluster.model.js"

// search user
const searchUser = async (req, res) => {
    try {
        const { query } = req.query;
        const users = await Users.find({
            name: {
                $regex: query,
                $options: "i"
            }
        });
        return res.status(200).json({
            users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

// search user in cluster
const searchClusterUser = async (req, res) => {
    try {
        const { query } = req.query;
        const { clusterId } = req.params;
        const cluster = await Clusters.findById(clusterId).populate("members");
        const regExp = new RegExp(query.charAt(0).toUpperCase() + query.slice(1), "g");
        const members = cluster.members.filter(el => el.name.match(regExp));
        return res.status(200).json({
            members
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

export { searchUser, searchClusterUser }