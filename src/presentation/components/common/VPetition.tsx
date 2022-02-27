import { StLine } from '@components/common';
import { getDate } from '@utils/getTime';
import styled from 'styled-components';

const PetitionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PetitionTitle = styled.div`
  white-space: pre-line;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
  font-size: 28px;
  line-height: 1.5em;
  margin-bottom: 1em;
`;

const PetitionDescription = styled.div`
  white-space: pre-line;
  width: 100%;
  min-height: 50vh;
  padding-left: 1em;
  padding-right: 1em;
  margin-bottom: 1.5em;
  color: ${(props) => props.theme.colors.text};
  font-weight: 300;
  font-size: 16px;
  line-height: 1.5em;
`;

const PetitionDate = styled.div`
  white-space: pre-line;
  width: 100%;
  padding-right: 1em;
  text-align: end;
  color: ${(props) => props.theme.colors.text};
  font-weight: 200;
  font-size: 12px;
  line-height: 1.5em;
`;

const MLine = styled(StLine)`
  margin-bottom: 2em;
`;

interface IPeition {
  petition: Petition | undefined;
}

const VPetition = ({ petition }: IPeition): JSX.Element => {
  return (
    <>
      <PetitionWrapper>
        <PetitionTitle>{petition?.title}</PetitionTitle>
        <PetitionDescription>{petition?.description}</PetitionDescription>
        <PetitionDate>최초 작성 {getDate(petition?.createdAt || 0)}</PetitionDate>
        <PetitionDate>마지막 수정 {getDate(petition?.updatedAt || 0)}</PetitionDate>
      </PetitionWrapper>
      <MLine />
    </>
  );
};

export default VPetition;