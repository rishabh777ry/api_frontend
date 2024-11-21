import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";

const App = () => {
    const [jsonInput, setJsonInput] = useState("");
    const [response, setResponse] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const options = [
        { value: "alphabets", label: "Alphabets" },
        { value: "numbers", label: "Numbers" },
        { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" },
    ];

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const { data } = await axios.post("https://api-check-git-main-rishabh777rys-projects.vercel.app/", parsedInput);
            setResponse(data);
        } catch (err) {
            alert("Invalid JSON or error in API call");
        }
    };

    const renderResponse = () => {
        if (!response) return null;

        const filteredResponse = {};
        selectedFilters.forEach((filter) => {
            if (response[filter.value]) {
                filteredResponse[filter.value] = response[filter.value];
            }
        });

        return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
    };

    return (
        <div>
            <h1>BFHL Challenge</h1>
            <textarea
                rows="6"
                placeholder='Enter JSON e.g., { "data": ["A","1","b"] }'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            {response && (
                <>
                    <Select
                        isMulti
                        options={options}
                        onChange={setSelectedFilters}
                    />
                    {renderResponse()}
                </>
            )}
        </div>
    );
};

export default App;
