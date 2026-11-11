
export const doctorAvatarProps =
  {
    portraitProps: {
      className: "avatar-portrait",
    },
    photoProps: {
      className: "avatar-photo",
      src:  "/assets/images/user-profiles/avatar-photos/doctors-avatar-photos/",
      alt: "Doctor's avatar photo"
    }
  };

export const patientAvatarProps =
  {
    portraitProps: {
      className: "avatar-portrait",
    },
    photoProps: {
      className: "avatar-photo",
      src:  "/assets/images/user-profiles/avatar-photos/patients-avatar-photos/",
      alt: "Patient's avatar photo"
    }
  };

/*
export function mapAvatarAndResourceToAvatarProps(avatarProps, avatarPhotoName) {
  return {
    ...avatarProps,
    photoProps: {
      ...avatarProps.photoProps,
      src: `${avatarProps.photoProps.src}${avatarPhotoName}`,
    },
  };
}

 */