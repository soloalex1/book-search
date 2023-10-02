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

  const getVolumeAuthor = (volume: VolumeInfo) => {
    if (volume.authors && volume.authors.length) {
      return volume.authors[0];
    }

    return "Autor desconhecido";
  };

  return (
    <S.SearchContainer>
      <InfiniteScroll
        dataLength={volumes.totalItems}
        loader={<S.EmptyState>Nenhum resultado encontrado.</S.EmptyState>}
        next={getMoreVolumes}
        hasMore={hasMoreElements}
        scrollThreshold={0.6}
      >
        {
          <S.ResultsContainer>
            {getFilteredVolumes(filterHelper).map(({ volumeInfo }, index) => (
              <S.VolumeWrapper key={index}>
                <S.VolumeImage
                  src={getVolumeImage(volumeInfo)}
                  alt={volumeInfo?.title}
                  loading="lazy"
                />
                <S.VolumeTitle>{volumeInfo?.title}</S.VolumeTitle>
                <S.VolumeAuthor>{getVolumeAuthor(volumeInfo)}</S.VolumeAuthor>
              </S.VolumeWrapper>
            ))}
          </S.ResultsContainer>
        }
      </InfiniteScroll>
      <Filters />
    </S.SearchContainer>
  );
};

export default Search;
