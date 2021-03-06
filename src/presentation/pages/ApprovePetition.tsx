import {
  deletePetitionRejection,
  postPetitionRejection,
  postPetitionRelease,
  putPetitionRejection,
} from '@api/petitionCommandAPI';
import { getTempPetition } from '@api/petitionQueryAPI';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@hooks/useToast';
import { BottomPadder, StButton, Title, TitleWrapper, ButtonWrapper, Wrapper, Writer } from '@components/common';
import ModifyPetition from '@components/ModifyPetition';
import VPetition from '@components/common/VPetition';
import { useAppDispatch, useAppSelect } from '@hooks/useStore';
import { onModifying } from '@stores/modifySlice';

const ApprovePetition = (): JSX.Element => {
  const { petitionId } = useParams();
  const [petition, setPetition] = useState<Petition | undefined>();

  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectDescription, setRejectDescription] = useState('');

  const isModifying = useAppSelect((select) => select.modify.isModifying);
  const dispatch = useAppDispatch();
  const fetchPetition = async () => {
    const response = await getTempPetition(petitionId);
    setPetition(response?.data);
    setRejectDescription(response?.data?.rejection?.description);
  };

  useEffect(() => {
    fetchPetition();
  }, [isModifying]);

  const navigate = useNavigate();
  const toast = useToast();

  const handleApprove = async () => {
    await postPetitionRelease(petition?.id);
    navigate('/');
    toast({ message: '청원이 게시되었습니다.', type: 'success' });
  };

  const handleReject = async () => {
    if (!isRejecting) {
      setIsRejecting(true);
      return;
    }

    const response =
      petition?.status === 'REJECTED'
        ? await putPetitionRejection(petition?.id, rejectDescription)
        : await postPetitionRejection(petition?.id, rejectDescription);
    if (response.status === 201 || response.status === 200) {
      toast({
        message: `${petition?.status === 'REJECTED' ? '반려 사유가 수정' : '청원이 반려'}되었습니다.`,
        type: 'warning',
      });
      navigate('/');
    } else {
      toast({ message: response.data?.message, type: 'warning' });
    }
  };

  const handleCancel = () => {
    setIsRejecting(false);
  };

  const cancelReject = async () => {
    await deletePetitionRejection(petition?.id);
    navigate('/');
  };

  const handleChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRejectDescription(event?.target.value);
  };

  const handleModify = () => {
    dispatch(onModifying());
    window.scrollTo(0, 0);
  };

  const VModifyPetitionProps = {
    petition,
  };

  return (
    <>
      {isModifying ? <ModifyPetition {...VModifyPetitionProps} /> : null}
      <Wrapper>
        {isModifying ? null : (
          <>
            <Title>청원 승인</Title>
            <VPetition petition={petition} />
            {isRejecting ? (
              <>
                <TitleWrapper>
                  <Title>청원 반려</Title>
                  <ButtonWrapper>
                    <StButton onClick={handleCancel}>취소</StButton>
                    {petition?.status === 'REJECTED' ? <StButton onClick={cancelReject}>반려 취소</StButton> : null}
                    <StButton onClick={handleReject}>
                      {petition?.status === 'REJECTED' ? '반려 수정' : '청원 반려'}
                    </StButton>
                  </ButtonWrapper>
                </TitleWrapper>
                <Writer value={rejectDescription} onChange={handleChange} />
              </>
            ) : (
              <ButtonWrapper>
                <StButton onClick={handleModify}>청원 수정</StButton>
                <StButton onClick={handleReject}>
                  {petition?.status === 'REJECTED' ? '반려 수정' : '청원 반려'}
                </StButton>
                {petition?.status === 'REJECTED' ? null : <StButton onClick={handleApprove}>청원 승인</StButton>}
              </ButtonWrapper>
            )}
          </>
        )}
        <BottomPadder />
      </Wrapper>
    </>
  );
};

export default ApprovePetition;
