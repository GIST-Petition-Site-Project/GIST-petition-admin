import { getDayTime } from '@utils/getTime';
import styled from 'styled-components';

interface vPetitionListProps {
  petitions: Array<Petition>;
}

const StUl = styled.ul`
  line-height: 1em;
`;

const PetitionItem = styled.div`
  display: grid;
  /* line-height: 50px; */
  grid-template-columns: 1fr 6fr 100px;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    background-color: #222;
  }
`;
const PetitionDescription = styled.div`
  /* line-height: 1em; */
  text-align: center;
`;
const PetitionTitle = styled.a`
  padding-left: 1em;
  line-height: 1.5em;
  padding: 0.5em;
  text-decoration: none;
  text-align: left;
  :link {
    color: ${(props) => props.theme.colors.text};
  }
  :visited {
    color: ${(props) => props.theme.colors.text};
  }
  &:hover {
    text-decoration: underline;
  }
`;

const StLine = styled.hr`
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  border-color: white;
  background-color: white;
  opacity: 0.1;
`;

const VPetitionList = ({ petitions }: vPetitionListProps): JSX.Element => {
  return (
    <StUl>
      <StLine />
      {petitions.map((petition) => {
        ('');
        const { id, categoryName, title, createdAt } = petition;
        return (
          <div key={'petition_item_' + id}>
            <PetitionItem>
              <PetitionDescription>{categoryName}</PetitionDescription>
              <PetitionTitle href={`${location.pathname}/${id}`}>{title}</PetitionTitle>
              <PetitionDescription>{getDayTime(createdAt)}</PetitionDescription>
            </PetitionItem>
            <StLine />
          </div>
        );
      })}
    </StUl>
  );
};

export default VPetitionList;
