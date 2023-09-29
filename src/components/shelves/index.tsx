import React, { useCallback, useEffect } from "react";

import VolumeImageFallback from "@/assets/capa-fallback.svg";

import { settings } from "@/components/carousel/constants";
import Carousel from "@/components/carousel";

import { getSubjects } from "@/api";
import { VolumeData, VolumeInfo } from "@/types";
import useStore from "@/store";

import * as S from "./styles";

const CATEGORIES = ["action", "adventure", "fiction"];

type ShelfKey = "action" | "adventure" | "fiction";

const Shelves: React.FC = () => {
  const { shelves, setShelf } = useStore((state) => state);

  const handleSearch = useCallback(async () => {
    return await getSubjects(CATEGORIES);
  }, []);

  const renderVolumeImage = (volume: VolumeInfo) => {
    if (!volume.imageLinks) return VolumeImageFallback;

    if (volume?.imageLinks.thumbnail) return volume?.imageLinks.thumbnail;

    if (volume?.imageLinks.smallThumbnail)
      return volume?.imageLinks.smallThumbnail;

    return VolumeImageFallback;
  };

  const renderShelf = (shelfName: string, shelf: VolumeData[]) => {
    return (
      <S.Shelf>
        <S.ContentList>
          <S.TitleCategory>{shelfName}</S.TitleCategory>
          <S.Content>
            <Carousel settings={settings} spaceBetweenItems="16px">
              {shelf.map(({ id, volumeInfo }) => (
                <S.ContentItem key={id}>
                  <img
                    aria-label={volumeInfo.title}
                    src={renderVolumeImage(volumeInfo)}
                    alt={volumeInfo.title}
                    loading="lazy"
                    title={volumeInfo.title}
                  />
                </S.ContentItem>
              ))}
            </Carousel>
          </S.Content>
        </S.ContentList>
      </S.Shelf>
    );
  };

  useEffect(() => {
    handleSearch().then((data) => {
      data.forEach(({ subject, items }) => {
        setShelf(subject as ShelfKey, items);
      });
    });
  }, []);

  // todo adicionar destaque. como? mistério....
  return (
    <S.Container>
      {renderShelf("Destaque", shelves.action)}
      {renderShelf("Ação", shelves.action)}
      {renderShelf("Aventura", shelves.adventure)}
      {renderShelf("Ficção", shelves.fiction)}
    </S.Container>
  );
};

export default Shelves;
