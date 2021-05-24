const onImgErr = (e: any, originalURL: any) => {
  e.target.onerror = null;
  e.target.src = originalURL;
};

export default onImgErr;
