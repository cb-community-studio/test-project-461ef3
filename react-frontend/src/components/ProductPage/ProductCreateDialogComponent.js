
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';


 
const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ProductCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        set_entity({})
    },[props.show])
    const onSave = async () => {
        let _data = {
            image: _entity.image,
            name: _entity.name,
            quantity: _entity.quantity,
            price: _entity.price,
            amount: _entity.amount

        };

        setLoading(true);
        try {
            const result = await client.service("product").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="product-create-dialog-component">
                <div>
                    <p className="m-0" >Image:</p>
                    <InputText className="w-full mb-3" value={_entity?.image} onChange={(e) => setValByKey("image", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Name:</p>
                    <InputText className="w-full mb-3" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Quantity:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.quantity} onChange={(e) => setValByKey("quantity", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Price:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.price} onChange={(e) => setValByKey("price", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Amount:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.amount} onChange={(e) => setValByKey("amount", e.target.value)}  />
                </div>


                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    //
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(ProductCreateDialogComponent);
// createDialog_code.template
