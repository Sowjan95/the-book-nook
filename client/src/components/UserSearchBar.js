import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserSearchBar = ( {props, onRecommend, onAddFriend, addFriend, addRec} ) => {

    const [searchInput, setSearchInput] = useState("");
    const [searchedUser, setSearchedUser] = useState();

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };


    useEffect(() => {
        // This code will run whenever searchedUser changes
        console.log("searchedUser:", searchedUser);
    }, [searchedUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(searchInput);
        try {
            if (onRecommend) {
                const userResponse = await fetch(`/api/friend/username/${searchInput}`);
                const userData = await userResponse.json();
                setSearchedUser(userData);
            }
            else {
                // fetch books by titile and author
                const userResponse = await fetch(`/api/friend/find/${searchInput}`);
                const userData = await userResponse.json();
                setSearchedUser(userData);
            }

        } catch (error) {
            console.error("Server error while getting searched user", error);
        }
        e.target.reset(); // empty form field
    }

    return (
    <div className="col-md-8 col-lg-7 mx-auto">
        <h4>Search for other users:</h4>
        <form onSubmit={handleSubmit}>
        <div className="input-group">
            <input
                type="search"
                placeholder="Enter a username"
                onChange={handleChange}
                value={searchInput}
                className="form-control"
                style={{ height: "38px" }}
                autoFocus
            />
            <button className="btn btn-primary" type="submit">Search</button>
            </div>
        </form>
        
        {searchedUser &&
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="foundUser">{searchedUser.username}</td>
                        {addFriend &&
                            <td className="d-flex justify-content-end">
                                <button className="btn btn-primary addFriend" onSubmit={onAddFriend}>
                                    Add Friend
                                </button>
                            </td>
                        }
                        {addRec &&
                            <td className="d-flex justify-content-end">
                                <button className="btn btn-primary addRec" onSubmit={onRecommend}>
                                    Select Friend
                                </button>
                        </td>
                        }
                    </tr>
                </tbody>
            </table>
        }
    </div>
    )

};

export default UserSearchBar;