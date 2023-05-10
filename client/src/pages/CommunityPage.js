import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserSearchBar from "../components/UserSearchBar";


function Community(props) {
  const[myFriends, setMyFriends] = useState([]);
  const[myRecs, setMyRecs] = useState([]);

  //fetch data
  useEffect(() => {

    // fetch user's currently reading my_books
    // sort books in ascending order by date_started
    async function getMyFriends() {
      try {
        const friendsResponse = await fetch(
          "/api/friend"
        );
        const friendsData = await friendsResponse.json();
        friendsData.sort((a, b) =>
            (a.username > b.username ? 1 : -1)
        );
        setMyFriends(friendsData);
      } catch (error) {
        console.error("Error fetching friends", error);
      }
    }

    // fetch user's currently reading my_books
    // sort books in ascending order by date_started
    async function getMyRecs() {
        try {
          const recsResponse = await fetch(
            "/api/recs"
          );
          const recsData = await recsResponse.json();
          recsData.sort((a, b) =>
            a.createdAt > b.createdAt ? 1 : -1
          );
          const bookData = await Promise.all(
            recsData.map(async (book) => {
                const [newBookResponse, friendResponse] = await Promise.all([
                    fetch(`/api/books/${book.BookId}`),
                    fetch(`/api/friend/${book.FriendId}`)
                  ]);
                  const newBookData = await newBookResponse.json();
                  const friendData = await friendResponse.json();
                  return { ...book, title: newBookData.title, author: newBookData.author, friend: friendData.username };
            })
          );
          setMyRecs(bookData);
        } catch (error) {
          console.error("Error fetching recommendations", error);
        }
      }

    getMyFriends();
    getMyRecs();
  }, []);

    return (
    <div>
        <h1>Community</h1>
        <div className="container-fluid text-center">
            <div className="row justify-content-center">
                <div className='App'>
                {myFriends.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Friends</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myFriends.map((friend) => (
                            <tr key={friend.id}>
                                <td>{friend.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
                 {myRecs.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Reccommendation</th>
                            <th>Sent By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myRecs.map((rec) => (
                            <tr key={rec.id}>
                                <Link to={"/book/" + rec.BookId}><td className="bookLink">{rec.title}</td></Link>
                                <td>{rec.friend}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
                </div>
                <div className='App'>
                  <UserSearchBar />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Community;