import React from "react";
import "./customers.css";


function CustomerList ({customersData , handleClickCard , selectedCardId}){

    return (
        <div className="customerList" >
            {
                customersData?.map((customer , index) => (
                    <div key={customer.id}
                      className={customer.id == selectedCardId ? "customerCard selected" : "customerCard"}
                      onClick={() => handleClickCard(customer)
                    }>
                        <h3>{customer.name}</h3>
                        <p>{customer.title}</p>
                    </div>
                ))
            }
        </div>
    )
};

export default CustomerList;