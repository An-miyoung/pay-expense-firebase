import React from "react";
import styled from "styled-components";

export const OverlayWrapper = ({ children, minHeight, padding }) => {
  return (
    <StyledContainer minHeight={minHeight} padding={padding}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  min-height: ${(props) => props.minHeight || "0px"};
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
  border-radius: 15px;

  padding: ${(props) => props.padding || "5vw"};
`;
