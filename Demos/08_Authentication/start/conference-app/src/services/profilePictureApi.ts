export const getProfileImageUrl = (userId: number) => {
  let imageId = userId;
  if (userId > 70) imageId = userId / 3;

  return `https://i.pravatar.cc/400?img=${imageId}`;
};
