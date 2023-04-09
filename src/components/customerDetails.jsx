import React from "react";
import "./customers.css";

function CustomerDetails ({customerDetailsData}) {
    console.log(customerDetailsData.photos,'cd');
    return (
        <div className="customerDetails">
            {
            customerDetailsData && 
            <>
                <h1 className="customerDetailsHeader">{customerDetailsData.name} details here</h1>
                <div className="customerDetailsText">
                    <div>Name : {customerDetailsData.name}</div>
                    <div>Title : {customerDetailsData.title}</div>
                    <div>Address : {customerDetailsData.address}</div>
                </div>
                <div className="photosGrid">
                    {
                        customerDetailsData.photos?.map((photourl) => (
                            <img key={photourl} src={photourl} />
                        ))
                    }
                </div>
            </>
            }
        </div>
    )
};

export default CustomerDetails;