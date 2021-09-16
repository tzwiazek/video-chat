export interface userInfoInterface {
  socket: string;
  userName: string;
  video: boolean;
  audio: boolean;
}

export interface userVideoAudioInterface {
  localUser: {
    video: boolean;
    audio: boolean;
  };
}
