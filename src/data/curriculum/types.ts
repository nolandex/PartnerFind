export interface VideoLesson {
  title: string;
  videoId: string;
  thumbnail: string;
}

export interface ModuleSection {
  moduleTitle: string;
  thumbnail: string;
  videos: VideoLesson[];
}

export interface ClassCurriculum {
  classTitle: string;
  modules: ModuleSection[];
}

export interface RawModule {
  moduleTitle: string;
  videoTitles: string[];
}

export interface RawClass {
  classTitle: string;
  modules: RawModule[];
}

export const YOUTUBE_IDS = [
  "8mAITcNt710",
  "W6NZfCO5SIk",
  "h33Srr5J9nY",
  "qz0aGYrrlhU",
  "salY_Sm6mv4",
  "1Rs2ND1ryYc",
  "fYq5PXgSsbE",
  "V_Kr9OSfDeU",
  "cRHQNNkYi1A",
  "SqcY0GlETPk",
  "RGKi6LSPDLU",
  "4UZrsTqkcW4",
  "FTFaQWZBqQ8",
  "Cx2dkpBxst8",
  "TyaGpGDFczw",
  "iBkXf6u8htI",
  "ruanT5_HaKY",
  "Ovj4hFxko7c",
  "qZWDJqY27bw",
  "rfscVS0vtbw",
  "vmEHCJofslg",
  "a9UrKTVEeZA",
];
