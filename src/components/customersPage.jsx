import React ,{useEffect, useState} from "react";
import { getCustomerDetails as getCustomerDetailsApi } from "./api";
import "./customers.css";
import CustomerList from "./customersList";
import CustomerDetails from "./customerDetails";

function CustomersPage(){
    const [customersData , setCustomersData] = useState([]);
    const [customerDetailsData , setCustomerDetailsData] = useState({});
    const [selectedCardId , setSelectedCardId] = useState('')
    const [pageNumber , setPageNumber] = useState(1);

    const handleClickCard = (customer) => {
        setCustomerDetailsData(customer);
        setSelectedCardId(customer.id);
    }

    const getRandomImages = () => {
        console.log(pageNumber,'fun');
        fetch(`https://api.unsplash.com/search/photos?page=${pageNumber}&query=nature&client_id=ooK3doJJXronnEAtmh-e2kby3nO2N67egoMsqN6JG9w`)
            .then(response => response.json())
            .then(imageData => {
              const photosData = imageData.results.slice(1).map((photo) => photo.urls.regular);
              setCustomerDetailsData(prevCustomer => ({ ...prevCustomer, photos: photosData }));
            })
            .catch(error => {
              console.log(error);
            });
    }
    useEffect(()=>{
        getCustomerDetailsApi().then((data)=>{
            setCustomersData(data);
            setCustomerDetailsData(data[0]);
            setSelectedCardId(data[0].id);
        })
    },[]);

    useEffect(() => {
        getRandomImages();
        setPageNumber(prevPageNumber => (prevPageNumber+1)%1000);
    },[selectedCardId]);

    useEffect((pageNumber) => {
        const intervalId = setInterval(() => {
            console.log(pageNumber,'p');
            fetch(`https://api.unsplash.com/search/photos?page=${parseInt(Math.random()*1000)}&query=nature&client_id=ooK3doJJXronnEAtmh-e2kby3nO2N67egoMsqN6JG9w`)
            .then(response => response.json())
            .then(imageData => {
                console.log(imageData,'id');
                const photosData = imageData?.results?.slice(1).map((photo) => photo.urls.regular);
                setCustomerDetailsData(prevCustomer => ({ ...prevCustomer, photos: photosData }));
            })
            .catch(error => {
                console.log(error);
            });
        }, 10000);
    
        return () => clearInterval(intervalId);
      }, [selectedCardId]);

    return (
        <div className="container">
            <CustomerList 
            customersData={customersData} 
            handleClickCard={handleClickCard} 
            selectedCardId={selectedCardId}
            />
            <CustomerDetails customerDetailsData={customerDetailsData} />
        </div>
    )
};

export default CustomersPage;