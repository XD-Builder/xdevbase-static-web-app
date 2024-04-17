export const generateUserImagePath = ({
  userId,
  imageFileName,
}: {
  userId: string;
  imageFileName: string;
}) => `${userId}/images/${imageFileName}`;