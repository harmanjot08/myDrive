import React, { useEffect, useState } from "react";
import axios from "axios";

interface Log {
    _id: string;
    action: string;
    fileName: string;
    timestamp: string;
}

const ActivityPage = () => {
    const [logs, setLogs] = useState<Log[]>([]);

    useEffect(() => {
        axios
            .get("/activity-service/logs")
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [];
                setLogs(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
                Activity Logs
            </h2>
            {logs.length === 0 ? (
                <p>No activity yet.</p>
            ) : (
                logs.map((log) => (
                    <div
                        key={log._id}
                        style={{
                            padding: "12px",
                            marginBottom: "8px",
                            background: "#f5f5f5",
                            borderRadius: "8px",
                        }}
                    >
                        <strong>{log.action.toUpperCase()}</strong> — {log.fileName}{" "}
                        <span style={{ color: "#999", fontSize: "12px" }}>
                            {new Date(log.timestamp).toLocaleString()}
                        </span>
                    </div>
                ))
            )}
        </div>
    );
};

export default ActivityPage;