import React, { useState } from "react";
import { IonPage, IonContent, IonHeader } from "@ionic/react"

const Table: React.FC<{ tableHeader?: string[]; tableRows?: Record<string, any>[] }> = ({ tableHeader = [], tableRows = [] }) => {
    const renderTableHeader = () => ( tableHeader.map((col, i) => 
        (<th key={i} style={{ textAlign: "left", borderBottom: "2px solid #333", padding: "6px 10px" }}>{col}</th>)));
    
    const renderRow = (row: Record<string, any>) => ( tableHeader.map((col, i) => 
        (<td key={i} style={{ borderBottom: "1px solid #ccc", padding: "6px 10px" }}>{row[col]}</td>)));
    
    const renderTableRows = () => (
        tableRows.map((row, i) => (<tr key={i}>{renderRow(row)}</tr>)));
    
    return (
        <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "sans-serif" }}>
            <thead><tr>{renderTableHeader()}</tr></thead>
            <tbody>{renderTableRows()}</tbody>
        </table>
    );
};

const Admin: React.FC = () => {
    const [tableName, setTableName] = useState("")
    const [tableHeader, setTableHeader] = useState(['id', 'message'])
    const [tableRows, setTableRows] = useState([{'id':3, 'message':'hola'}, {'id':5, 'message':'chao'}])

    async function onChangeTableName(e:React.ChangeEvent<HTMLSelectElement>) {
        const newTableName = e.target.value
        setTableName(newTableName)
        try {
            const res = await fetch("http://localhost:8000/api/query/admin_get_table", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({'table_name': newTableName})
            })
            const newTableRows = (await res.json()).data;
            const newTableHeader = Object.keys(newTableRows[0]);
            setTableHeader(newTableHeader)
            setTableRows(newTableRows)
        }
        catch { 
            console.log("Not connected to API");
        }
    }

    return (
        <IonPage>
            <IonHeader><h1 style={{ textAlign: "center" }}>{tableName ? (tableName + " table") : "Select a table"}</h1></IonHeader>
            <IonContent>
                <select value={tableName} onChange={onChangeTableName}>
                    <option value="" disabled hidden>Select a table</option>
                    <option value="users">users</option>
                    <option value="exercises">exercises</option>
                    <option value="sets">sets</option>
                </select>
                {tableName ? (<Table tableHeader={tableHeader} tableRows={tableRows} />) : ""}
            </IonContent>
        </IonPage> 
    );
};

export default Admin;