import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import VolumeImageFallback from "@/assets/capa-fallback.svg";

import Filters from "@/components/filters";
import Spinner from "@/components/spinner";

import { inPrice, isAvailable, isForSale } from "@/utils";
import { getVolumes } from "@/api";
import useStore from "@/store";

import { VolumeData, VolumeInfo } from "@/types";
import * as S from "./styles";

const Search: React.FC = () => {
  const {
    query,
    volumes,
    setVolumes,
    filters,
    getFilteredVolumes,
    setSuggestions,
    setLoading,
    hasPriceFilter,
    hasFormatFilter,
    pagination: { currentPage, itemsPerPage },
    setCurrentPage,
  } = useStore((state) => state);

  const getVolumeImage = (volume: VolumeInfo) => {
    if (!volume.imageLinks) return VolumeImageFallback;

    if (volume?.imageLinks.thumbnail) return volume?.imageLinks.thumbnail;

    if (volume?.imageLinks.smallThumbnail)
      return volume?.imageLinks.smallThumbnail;

    return VolumeImageFallback;
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

  useEffect(() => {
    setSuggestions([]);
    setLoading(true);
  }, []);

  const filterHelper = (item: VolumeData) => {
    const { saleInfo, accessInfo } = item;
    const { price, availableFormats, availableItems } = filters;

    let renderElement = true;

    if (hasPriceFilter()) {
      renderElement = inPrice(
        saleInfo.retailPrice?.amount,
        price.min!,
        price.max!
      );
    }

    if (hasFormatFilter()) {
      renderElement = isAvailable(accessInfo, availableFormats);
    }

    if (availableItems) {
      renderElement = isForSale(saleInfo, availableItems);
    }

    return renderElement;
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
                {getFilteredVolumes(filterHelper).map(({ id, volumeInfo }) => (
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
