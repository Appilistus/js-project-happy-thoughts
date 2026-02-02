import styled from "styled-components"

export const SortTabs = ({ sortMode, onChange }) => {
  return (
    <>
      <Tabs>
        Sort by:
        <TabButton
          type="button"
          onClick={() => onChange("new")}
          $active={sortMode === "new"}
          aria-label="Sort by newest"
        >
          Newest
        </TabButton>
        <TabButton
          type="button"
          onClick={() => onChange("popular")}
          $active={sortMode === "popular"}
          aria-label="Sort by most liked"
        >
          Most Liked
        </TabButton>
      </Tabs>

    </>
  )
}

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 25px 0 5px;

`
const TabButton = styled.button`
  padding: 8px 16px;
  border: ${(props) => (props.$active ? `1px solid ${props.theme.colors.primary}` : `1px solid ${props.theme.colors.border}`)};
  background-color: ${(props) => (props.$active ? props.theme.colors.primary : props.theme.colors.background)};
  color: ${({ theme }) => theme.colors.buttonText };
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary };  }
`