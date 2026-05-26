import express from "express";
import ActivityLog from "../models/activityLog";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/activity-service/logs", auth, async (req: any, res) => {
    try {
        const logs = await ActivityLog.find({ userId: req.user._id })
            .sort({ timestamp: -1 })
            .limit(50);
        res.send(logs);
    } catch (e) {
        res.status(500).send();
    }
});

export default router;