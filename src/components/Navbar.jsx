import React, { useState } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { reducerCases } from "../utils/Constants";

export default function Navbar({ navBackground }) {
  const location = useLocation();
  const [{ token, userInfo }, dispatch] = useStateProvider();
  const [query, setQuery] = useState("");

  const updateQuery = (query) => query.replace(/ /g, "%20");

  const handleSearch = async (e) => {
    e.preventDefault();
    const formattedQuery = updateQuery(query);
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${formattedQuery}&type=album`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setQuery("");
      const albums = response.data.albums;
      console.log("Fetched albums:", albums); // Debugging step
      dispatch({ type: reducerCases.SET_SEARCHED_ALBUMS, searched_albums: albums });
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  return (
    <Container navBackground={navBackground}>
      {location.pathname === "/search" && (
        <div className="search__bar">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-1 justify-between bg-white px-4 py-1 rounded-2xl"
          >
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Artists, songs, or podcasts"
              className="mr-1 w-fit border-none outline-none"
              value={query}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
      )}
      <div className="avatar flex ml-auto">
        <a href={userInfo?.userUrl}>
          <CgProfile />
          <span>{userInfo?.name}</span>
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};
  
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
