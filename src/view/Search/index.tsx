import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Filters from "@/components/filters";
import Spinner from "@/components/spinner";

import useStore from "@/store";

import { VolumeInfo } from "@/types";
import * as S from "./styles";

const Search: React.FC = () => {
  const { volumes, setSuggestions, setLoading } = useStore((state) => state);

  useEffect(() => {
    setSuggestions([]);
    setLoading(true);
  }, []);

  const getVolumeImage = (volumeInfo: VolumeInfo) => {
    if (!volumeInfo) return;

    return (
      volumeInfo?.imageLinks?.thumbnail ||
      volumeInfo?.imageLinks?.smallThumbnail
    );
  };

  const hasMoreElements = true;

  return (
    <>
      <S.Container>
        <S.Content>
          <Filters />
          <InfiniteScroll
            dataLength={volumes.length}
            loader={<Spinner />}
            next={() => console.log("call next page!")}
            hasMore={hasMoreElements}
          >
            {
              <S.ContentResults>
                {volumes.map(({ id, volumeInfo }) => (
                  <S.ContentResultsWrapper key={id}>
                    <S.ContentResultsCover>
                      <img
                        src={getVolumeImage(volumeInfo)}
                        alt={volumeInfo?.title}
                        loading="lazy"
                      />
                    </S.ContentResultsCover>
                    <S.ContentResultsTitle>
                      <label>{volumeInfo?.title} </label>
                    </S.ContentResultsTitle>
                    <S.ContentResultsCategory>
                      <span>{volumeInfo?.authors?.join(", ")}</span>
                    </S.ContentResultsCategory>
                  </S.ContentResultsWrapper>
                ))}
              </S.ContentResults>
            }
          </InfiniteScroll>
        </S.Content>
      </S.Container>
    </>
  );
};

export default Search;
