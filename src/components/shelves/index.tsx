import React, { useCallback, useEffect } from "react";
import {
  Container,
  Content,
  ContentItem,
  ContentList,
  Shelf,
  TitleCategory,
} from "./styles";
import { settings } from "../carousel/constants";
import Carousel from "../carousel";
import { books } from "./constants";

import { getSubjects } from "../../api";

const CATEGORIES = ["action", "adventure", "fiction"];

const Shelves: React.FC = () => {
  const handleSearch = useCallback(async () => {
    return await getSubjects(CATEGORIES);
  }, []);

  useEffect(() => {
    handleSearch().then((data) => {
      // console.log("data", data);
    });
  }, []);

  return (
    <Container>
      <Shelf>
        {books.map((shelf) => {
          return (
            <ContentList>
              <TitleCategory key={shelf.id}>
                {shelf.shelfCategory}
              </TitleCategory>
              <Content>
                <Carousel settings={settings} spaceBetweenItems="16px">
                  {shelf.booksShelf.map((book) => (
                    <ContentItem key={book.title}>
                      <img src={book.urlImage} alt={book.slug} />
                    </ContentItem>
                  ))}
                </Carousel>
              </Content>
            </ContentList>
          );
        })}
      </Shelf>
    </Container>
  );
};

export default Shelves;
