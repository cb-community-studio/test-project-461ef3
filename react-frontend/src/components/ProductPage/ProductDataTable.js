
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';


const ProductDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const imageTemplate0 = (rowData, { rowIndex }) => <Image src={rowData.image}  alt="Image" height="60px" />
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.name}</p>
    const inputTemplate2 = (rowData, { rowIndex }) => <InputText value={rowData.quantity}  />
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.price}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.amount}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="image" header="Image" body={imageTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="name" header="Name" body={pTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="quantity" header="Quantity" body={inputTemplate2} sortable style={{ minWidth: "8rem" }} />
            <Column field="price" header="Price" body={pTemplate3} sortable style={{ minWidth: "8rem" }} />
            <Column field="amount" header="Amount" body={pTemplate4} sortable style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default ProductDataTable;