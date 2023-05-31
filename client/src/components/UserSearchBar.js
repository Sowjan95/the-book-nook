import React, { useState, useEffect } from "react";
import ErrorAlert from "./ErrorAlert";

const UserSearchBar = ( {props, addFriend, addRec, myFriends } ) => {

    const [searchInput, setSearchInput] = useState("");
    const [searchedUser, setSearchedUser] = useState();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        // This code will run whenever searchedUser changes
        console.log("searchedUser:", searchedUser);
    }, [searchedUser]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        try {
            // if adding a recommendation, find specific friend from search function
            if (addRec) {
                const friendsResponse = await fetch(
                    "/api/friend"
                  );
                  const friendsData = await friendsResponse.json();
                  const friend = friendsData.find((friend) => friend.username === searchInput);
                  setSearchedUser(friend);
                  console.log(friendsData);
            }
            // find any user by their username
            else {
                // fetch users by username
                const userResponse = await fetch(`/api/friend/find/${searchInput}`);
                const userData = await userResponse.json();
                if (!userData.message) setSearchedUser(userData);
                console.log("userData", userData);
            }

        } catch (error) {
            console.error("Server error while getting searched user", error);
        }
        e.target.reset(); // empty form field
    }

    const handleRecommendSubmit = async() => {
        try {
          let response = await fetch("/api/recs", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              friendId: searchedUser.id,
              bookId: props.id,
            }),
          });
          if (response.ok) {
            setSuccess(true);
            console.log("Success!");
          }
  
        } catch (error) {
          console.error("Server error while creating a new micro post", error);
        }
      };

    const handleAddFriendSubmit = async() => {
        for (let i = 0; i < myFriends.length; i++) {
            console.log("searching", myFriends[i].username );
            if (myFriends[i].username === searchedUser.username) {
              setError("This user is already your friend!");
              return;
            }
          }
        try {
            let response = await fetch("/api/friend", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                friendId: searchedUser.id,
            }),
            });
            if (response.ok) {
                setSuccess(true);
                console.log("Success!");
                window.location.reload();
            }

        } catch (error) {
            console.error("Server error while creating a new micro post", error);
        }
    };


    return (
    <div className="col-md-8 col-lg-7 mx-auto">
        {error && <ErrorAlert details={error} />}
        {addFriend && <h4>Find new friends:</h4>}
        {addRec && <h4>Search for friend:</h4>}
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
                                {!success &&
                                <button className="btn btn-chosen addRec" onClick={handleAddFriendSubmit}>
                                    Add Friend
                                </button>
                                }
                                {success &&
                                <button className="btn btn-notchosen">
                                    Friend Added!
                                </button>
                                }
                            </td>
                        }
                        {addRec &&
                            <td className="d-flex justify-content-end">
                                {!success &&
                                <button className="btn btn-primary addRec" onClick={handleRecommendSubmit}>
                                    Select Friend
                                </button>
                                }
                                {success &&
                                <button className="btn btn-secondary">
                                    Rec Sent!
                                </button>
                                }
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