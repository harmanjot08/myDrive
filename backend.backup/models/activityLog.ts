import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        enum: ["upload", "delete", "create_folder", "share", "download"],
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;