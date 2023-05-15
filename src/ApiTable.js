import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiTable = () => {
    const [data, setData] = useState([]);
    const [searchdata, setSearchdata] = useState("");
    const [filterdata, setFilterdata] = useState([]);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                setData(response.data);
                setFilterdata(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const Filter = data.filter(i => i.title.toLowerCase().includes(searchdata.toLowerCase()));
        setFilterdata(Filter);
    }, [searchdata, data]);

    const onChangeSearch = (e) => {
        setSearchdata(e.target.value);
    };

    const onClickHandler = () => {
        const sorting = [...filterdata].sort((a, b) => a.title.localeCompare(b.title));
        setFilterdata(sorting);
    };

    return (
        <div>
            <div className='d-flex justify-content-center'>
                <input type="text" placeholder="Search by title or description" value={searchdata} onChange={onChangeSearch} className="form-control w-25" />
                <button onClick={onClickHandler} className="btn btn-success ms-2">Search</button>
            </div>

            {filterdata.map(i => (
                <div key={i.id} className="text-start w-75 mx-auto mt-4">
                    <h3 className='text-warning d-flex'>Title:- <p className=' ms-2' style={{ color: "#0dcaf0" }}>{i.title}</p></h3>
                    <p><b style={{ color: "#d63384" }}>Description:- </b> {i.body}</p><hr />
                </div>
            ))}
        </div>
    );
};

export default ApiTable;
