import { getCurrentDateAndTime } from "@/utils/timeUtils";

export const generateUserImagePath = ({
  userId,
  imageFileName,
}: {
  userId: string;
  imageFileName: string;
}) => `${userId}/images/${imageFileName}`;

export const generatePropertiesImagePath = ({
  userId,
  propertyId,
  imageFileName,
}: {
  userId: string;
  propertyId: string;
  imageFileName: string;
}) => `${userId}/properties/${propertyId}/${imageFileName}`;
