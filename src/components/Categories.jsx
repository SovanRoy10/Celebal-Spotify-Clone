import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const getPlaylists = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/browse/categories`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      setCategories(response.data.categories);
    };
    getPlaylists();
  }, [token, categories]);

  //   console.log(categories)
  return (
    <div className="grid grid-cols-4 gap-4">
      {categories &&
        categories.items.map((category, index) => {
          return (
            <Link to={`/category/${category.id}`} key={category.id}>
              <div className="cursor-pointer">
                <img
                  src={category.icons[0].url}
                  alt={category.name}
                  className="w-[274px] h-[274px]"
                />
                <span className="text-white">{category.name}</span>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
