import { getProfileImageUrl } from '../../services/profilePictureApi';
import { TalkAttendee, TalkCard, TalkCardAbstract, TalkCardAbstractWrapper, TalkCardAttendeesWrapper, TalkCardContent, TalkCardDivider, TalkCardImage, TalkCardTitle, TalkCardTitleWrapper, TimeSlot, TimeSlotTag } from '../../styled/Talk.styled';
import moment from 'moment';
import { ISessionGraphModel } from '../../graphql/models/session';

export const Talk: React.FC<ISessionGraphModel> = (session) => {
  const getTimeSlot = () => {
    const startTime = moment(new Date(session.startTime)).format('HH:mm');
    const endTime = moment(new Date(session.endTime)).format('HH:mm');

    return `${startTime} - ${endTime}`;
  };

  return (
    <>
      <TalkCard>
        <TimeSlotTag>
          <TimeSlot variant={"caption"}>{getTimeSlot()}</TimeSlot>
        </TimeSlotTag>
        <TalkCardImage image={'https://image.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg'} />
        <TalkCardContent>
          <TalkCardTitleWrapper>
            <TalkCardTitle variant={'h6'} gutterBottom>
              {session.title}
            </TalkCardTitle>
          </TalkCardTitleWrapper>
          <TalkCardAbstractWrapper>
            <TalkCardAbstract variant={'caption'}>{session.abstract}</TalkCardAbstract>
          </TalkCardAbstractWrapper>
          <TalkCardAttendeesWrapper>
            <TalkCardDivider light />
            {session.speakers.map((speaker) => (
              <TalkAttendee key={speaker.id} src={getProfileImageUrl(speaker.id)} />
            ))}
          </TalkCardAttendeesWrapper>
        </TalkCardContent>
      </TalkCard>
    </>
  );
};

export default Talk;
