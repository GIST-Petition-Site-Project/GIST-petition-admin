import { Content, Description, StSelect, Title, TitleWrapper } from '@components/common';
import { getDate } from '@utils/timeFormat';

interface vAnswerRevisionProps {
  answerRevisions: Array<AnswerRevision>;
  answerVersion: number;
  answerSelect: React.ChangeEventHandler<HTMLSelectElement>;
}

const VAnswerRevision = ({ answerRevisions, answerVersion, answerSelect }: vAnswerRevisionProps): JSX.Element => {
  return (
    <>
      <TitleWrapper>
        <Title>답변 기록</Title>
        <StSelect value={answerVersion} onChange={answerSelect}>
          <optgroup label="Answer">
            {Array(answerRevisions.length)
              .fill(0)
              .map((_v, idx) => (
                <option key={'answer' + idx} value={idx}>
                  {`${idx + 1}번째 답변`}
                </option>
              ))}
          </optgroup>
        </StSelect>
      </TitleWrapper>
      <Description>작성자 {answerRevisions[answerVersion]?.workedBy}</Description>
      <Description>업데이트 {getDate(answerRevisions[answerVersion]?.revisionTime || 0)}</Description>
      <Content>{answerRevisions[answerVersion]?.answerDescription}</Content>
    </>
  );
};

export default VAnswerRevision;
