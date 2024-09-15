// components/DataDisplay.js

import { useData } from '@/hooks/headerData';
import React from 'react';


const DataDisplay = ({ initialData }) => {
    const { data, error } = useData(initialData);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Data from API</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DataDisplay;
