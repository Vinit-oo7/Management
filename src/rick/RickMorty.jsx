
import axios from "axios";
import React, { useEffect, useState } from "react";

const RickMorty = () => {
    const [list, setList] = useState({});
    const { characters, locations, episodes } = list;

    useEffect(() => {
        axios
            .get("https://rickandmortyapi.com/api/")
            .then((res) => {
                setList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {characters} <br />
            {locations} <br />
            {episodes}

            {/* <table>
                <tr>
                    <td>
                        {
                            axios.get('https://rickandmortyapi.com/api/character').then((rev) => {
                                console.log(rev.data.results[1].name)
                            }).catch((error) => {
                                console.log(error);

                            })
                        }
                    </td>
                </tr>
            </table> */}
        </div >
    );
};

export default RickMorty;
