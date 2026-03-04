import axios from "axios";
import React, { useEffect } from "react";

const Test1 = () => {
    useEffect(() => {
        axios
            .get("https://generateapi.techsnack.online/api/test1")
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>

        </div>
    );
};

export default Test1;
