import styled from "styled-components";

export const FilterTabs = ({ heartsFilter, onChange }) => {
  return (
    <>
      <Tabs>
        Filter by:
        <TabButton
          type="button"
          onClick={() => onChange("all")}
          $active={heartsFilter === "all"}
          aria-label="Show all posts"
        >
          All
        </TabButton>
        <TabButton
          type="button"
          onClick={() => onChange("with")}
          $active={heartsFilter === "with"}
          aria-label="Show posts with hearts"
        >
          With ❤️
        </TabButton>
        <TabButton
          type="button"
          onClick={() => onChange("without")}
          $active={heartsFilter === "without"}
          aria-label="Show posts without hearts"
        >
          Without ❤️
        </TabButton>
      </Tabs>
    </>  
  )
}

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 5px 0;
  gap: 8px;
`

const TabButton = styled.button`
  background: ${(props) => (props.$active ? props.theme.colors.primary : props.theme.colors.background)};
  color: ${(props) => (props.$active ? props.theme.colors.background : props.theme.colors.text)};
  border: ${(props) => (props.$active ? `1px solid ${props.theme.colors.primary}` : `1px solid ${props.theme.colors.border}`)};
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.background};
  }
`