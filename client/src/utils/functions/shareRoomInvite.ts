import { Room } from '../types';

export async function shareRoomInvite(room: Room) {
  const invitationLink = `${window.location.origin}/join?roomId=${room._id}`;
  const shareData = {
    title: `Join me in '${room.name}' room`,
    text: `Click on the link to join the '${room.name}' room: ${invitationLink}`,
    url: invitationLink,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      console.log('Shared successfully');
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  } else {
    // Fallback for browsers that do not support the Web Share API
    navigator.clipboard.writeText(invitationLink).then(
      () => {
        console.log('Invitation link copied to clipboard');
      },
      (err) => {
        console.error('Failed to copy invitation link:', err);
      }
    );
  }
}
