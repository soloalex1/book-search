import React, { useCallback, useEffect } from "react";

import { settings } from "@/components/carousel/constants";
import Carousel from "@/components/carousel";

import { getSubjects } from "@/api";
import { VolumeData } from "@/types";
import useStore from "@/store";

import * as S from "./styles";

const CATEGORIES = ["action", "adventure", "fiction"];

type ShelfKey = "action" | "adventure" | "fiction";

const Shelves: React.FC = () => {
  const { shelves, setShelf } = useStore((state) => state);

  const handleSearch = useCallback(async () => {
    return await getSubjects(CATEGORIES);
  }, []);

  useEffect(() => {
    handleSearch().then((data) => {
      data.forEach(({ subject, items }) => {
        setShelf(subject as ShelfKey, items);
      });
    });
  }, []);

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
                    src={volumeInfo?.imageLinks?.thumbnail}
                    alt={volumeInfo.title}
                  />
                </S.ContentItem>
              ))}
            </Carousel>
          </S.Content>
        </S.ContentList>
      </S.Shelf>
    );
  };

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
