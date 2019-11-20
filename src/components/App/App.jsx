import React from "react";
import { hot } from "react-hot-loader/root";
import { styled } from "linaria/react";
import { Columns } from "container";

const AppComponent = () => {
  return (
    <Wrapper>
      <Columns />
    </Wrapper>
  );
};

export const App = hot(AppComponent);

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;
