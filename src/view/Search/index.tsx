import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Filters from "@/components/filters";
import Spinner from "@/components/spinner";

import { getVolumes } from "@/api";
import useStore from "@/store";

import { VolumeInfo } from "@/types";
import * as S from "./styles";

const Search: React.FC = () => {
  const {
    query,
    volumes,
    setVolumes,
    setSuggestions,
    setLoading,
    pagination: { currentPage, itemsPerPage },
    setCurrentPage,
  } = useStore((state) => state);

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

  const hasMoreElements = volumes?.items.length < volumes.totalItems;

  const getMoreVolumes = async () => {
    setCurrentPage(currentPage + 1);
    const data = await getVolumes(
      query,
      currentPage * itemsPerPage,
      itemsPerPage
    );

    if (data) {
      setVolumes({
        ...data,
        items: [...volumes.items, ...data.items],
      });
    }
  };

  return (
    <>
      <S.Container>
        <S.Content>
          <Filters />
          <InfiniteScroll
            dataLength={volumes.totalItems}
            loader={<Spinner />}
            next={getMoreVolumes}
            hasMore={hasMoreElements}
          >
            {
              <S.ContentResults>
                {volumes.items.map(({ id, volumeInfo }) => (
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
                      <span>{volumeInfo?.authors?.splice(0, -1)}</span>
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
