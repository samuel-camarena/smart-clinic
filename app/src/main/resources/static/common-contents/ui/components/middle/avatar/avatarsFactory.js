
export function createEl({ portraitProps, photoProps }, avatarType) {
  const portrait = document.createElement("div");
  const photo = document.createElement("img");

  portrait.className = portraitProps.className
  photo.className = photoProps.className;
  photo.src = photoProps.src;
  photo.alt = photoProps.alt;
  portrait.appendChild(photo);

  return portrait;
}

export function mapResourceToAvatarProps(avatarProps, avatarPhotoName) {
  return {
    ...avatarProps,
    photoProps: {
      ...avatarProps.photoProps,
      src: `${avatarProps.photoProps.src}${avatarPhotoName}`,
    },
  };
}