import React, { useState } from "react";
import { IonPage, IonContent, IonHeader } from "@ionic/react"

const Table: React.FC<{ tableHeader?: string[]; tableRows?: Record<string, any>[] }> = ({ tableHeader = [], tableRows = [] }) => {

    const renderTableHeader = () => ( tableHeader.map((col, i) => 
        ( <th key={i} style={{ textAlign: "left", borderBottom: "2px solid #333", padding: "6px 10px" }}> {col} </th> ))
    );

    const renderRow = (row: Record<string, any>) => ( tableHeader.map((col, i) => 
        ( <td key={i} style={{ borderBottom: "1px solid #ccc", padding: "6px 10px" }}> {row[col]} </td> ))
    );

    const renderTableRows = () => (
        tableRows.map((row, i) => ( <tr key={i}> {renderRow(row)} </tr> ))
    );

    return (
        <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "sans-serif" }}>
            <thead> <tr> {renderTableHeader()} </tr> </thead>
            <tbody> {renderTableRows()} </tbody>
        </table>
    );
};

const Admin: React.FC = () => {
    const [tableName, setTableName] = useState("")
    const [tableHeader, setTableHeader] = useState(['id', 'message'])
    const [tableRows, setTableRows] = useState([{'id':3, 'message':'hola'}, {'id':5, 'message':'chao'}])

    async function onChangeTableName(e:React.ChangeEvent<HTMLSelectElement>) {
        const newTableHeader = []
        const newTableRows = []
        // Retrieve from Supabase an array of attributes of table with name e.target.value and store them in newTableHeader
        // Retrieve from Supabase an array of rows of table with name e.target.value and store them in newTableRows (each row is dictionary)
        setTableName(e.target.value)
        //setTableHeader(newTableHeader)
        //setTableRows(newTableRows)
    }

    return (
        <IonPage>
            <IonHeader><h1 style={{ textAlign: "center" }}>{tableName ? (tableName + " table") : "Select a table"}</h1></IonHeader>
            <IonContent>
                <select value={tableName} onChange={onChangeTableName}>
                    <option value="" disabled hidden></option>
                    <option value="user">user</option>
                    <option value="workout">workout</option>
                </select>
                <Table tableHeader={tableHeader} tableRows={tableRows} />
            </IonContent>
        </IonPage> 
    );
};

export default Admin;