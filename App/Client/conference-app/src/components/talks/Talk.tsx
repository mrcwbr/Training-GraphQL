import { TalkAttendee, TalkCard, TalkCardAbstract, TalkCardContent, TalkCardDivider, TalkCardImage, TalkCardTitle } from '../../styled/TalkCard.styled';

const faces = ['http://i.pravatar.cc/300?img=1', 'http://i.pravatar.cc/300?img=2', 'http://i.pravatar.cc/300?img=3', 'http://i.pravatar.cc/300?img=4'];

export const Talk = () => {
  return (
    <TalkCard>
      <TalkCardImage image={'https://image.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg'} />
      <TalkCardContent>
        <TalkCardTitle variant={'h6'} gutterBottom>
          Nature Around Us
        </TalkCardTitle>
        <TalkCardAbstract variant={'caption'}>We are going to learn different kinds of species in nature that live together to form amazing environment.</TalkCardAbstract>
        <TalkCardDivider light />
        {faces.map((face) => (
          <TalkAttendee key={face} src={face} />
        ))}
      </TalkCardContent>
    </TalkCard>
  );
};

export default Talk;
