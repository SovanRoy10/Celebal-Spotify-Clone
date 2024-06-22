import React, { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { Link } from "react-router-dom";

export default function Search() {
  const [{ searched_albums }] = useStateProvider();
  const [albums, setAlbums] = useState(searched_albums);

  useEffect(() => {
    console.log("searched_albums in Search:", searched_albums); // Debugging step
    setAlbums(searched_albums);
  }, [searched_albums]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {albums && albums.items ? (
        albums.items.map((item) => (
          <Link to={`/category/${item.id}`} key={item.id}>
            <div className="cursor-pointer">
              <img
                src={item.images[0].url}
                alt={item.name}
                className="w-[274px] h-[274px]"
              />
              <span className="text-white">{item.name}</span>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-white">No albums found</div>
      )}
    </div>
  );
}
